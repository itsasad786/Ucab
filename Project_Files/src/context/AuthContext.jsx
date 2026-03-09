import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// In-memory demo users (also mirrored into localStorage for admin views)
// Demo credentials:
// Rider:  rider@ucab.com  / rider123
// Driver: driver@ucab.com / driver123
// Admin:  admin@ucab.com  / admin123
const MOCK_USERS = [
    {
        id: 'r1',
        name: 'Arjun Sharma',
        email: 'rider@ucab.com',
        password: 'rider123',
        role: 'rider',
        phone: '+91-9876543210',
        joined: '2024-01-15',
    },
    {
        id: 'd1',
        name: 'Ravi Kumar',
        email: 'driver@ucab.com',
        password: 'driver123',
        role: 'driver',
        phone: '+91-9123456789',
        joined: '2023-11-02',
    },
    {
        id: 'a1',
        name: 'Admin UCab',
        email: 'admin@ucab.com',
        password: 'admin123',
        role: 'admin',
        phone: '+91-9000000001',
        joined: '2023-01-01',
    },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('ucab_user');
        return stored ? JSON.parse(stored) : null;
    });

    const getAllUsers = () => {
        try {
            const raw = localStorage.getItem('ucab_users');
            if (raw) {
                return JSON.parse(raw);
            }
        } catch {
            // ignore
        }
        // First run: seed storage with demo users for admin panel
        if (typeof window !== 'undefined') {
            localStorage.setItem('ucab_users', JSON.stringify(MOCK_USERS));
            window.dispatchEvent(new Event('ucab_users_updated'));
        }
        return [...MOCK_USERS];
    };

    const saveAllUsers = (users) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('ucab_users', JSON.stringify(users));
            window.dispatchEvent(new Event('ucab_users_updated'));
        }
    };

    const login = async (email, password, role) => {
        const allUsers = getAllUsers();
        const found = allUsers.find(
            (u) => u.email === email && u.password === password && u.role === role,
        );
        if (!found) {
            return { success: false, error: 'Invalid credentials. Please try again.' };
        }
        const { password: _pw, ...safeUser } = found;
        setUser(safeUser);
        localStorage.setItem('ucab_user', JSON.stringify(safeUser));
        return { success: true, user: safeUser };
    };

    const register = async (data, role) => {
        if (!['rider', 'driver'].includes(role)) {
            return { success: false, error: 'Only rider or driver can register.' };
        }
        const allUsers = getAllUsers();
        const exists = allUsers.find((u) => u.email === data.email);
        if (exists) {
            return { success: false, error: 'Email already registered.' };
        }
        const newUser = {
            id: `${role[0]}${Date.now()}`,
            name: data.name,
            email: data.email,
            password: data.password,
            role,
            phone: data.phone || '',
            joined: new Date().toISOString().split('T')[0],
        };
        const updatedUsers = [...allUsers, newUser];
        saveAllUsers(updatedUsers);
        const { password: _pw, ...safeUser } = newUser;
        setUser(safeUser);
        localStorage.setItem('ucab_user', JSON.stringify(safeUser));
        return { success: true, user: safeUser };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ucab_user');
    };

    const updateProfile = (updates) => {
        if (!user) return;
        const updated = { ...user, ...updates };
        setUser(updated);
        localStorage.setItem('ucab_user', JSON.stringify(updated));
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
