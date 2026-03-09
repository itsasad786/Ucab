import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

// Pure in-memory demo data (no backend / MongoDB)
const initialCabs = [
    {
        id: 'c1',
        model: 'Toyota Corolla',
        type: 'Sedan',
        plate: 'MH-12-AB-1234',
        seats: 4,
        driver: 'Ravi Kumar',
        driverId: 'd1',
        pricePerKm: 45,
        rating: 4.8,
        available: true,
    },
    {
        id: 'c2',
        model: 'Honda BRV',
        type: 'SUV',
        plate: 'MH-01-CD-5678',
        seats: 6,
        driver: 'Arjun Singh',
        driverId: 'd1',
        pricePerKm: 65,
        rating: 4.6,
        available: true,
    },
    {
        id: 'c3',
        model: 'Maruti Swift',
        type: 'Mini',
        plate: 'MH-02-EF-9012',
        seats: 4,
        driver: 'Ravi Kumar',
        driverId: 'd1',
        pricePerKm: 30,
        rating: 4.5,
        available: true,
    },
];

const initialBookings = [
    {
        id: 'b1',
        riderId: 'r1',
        riderName: 'Arjun Sharma',
        driverId: 'd1',
        driverName: 'Ravi Kumar',
        cabModel: 'Toyota Corolla',
        pickup: 'Bandra West, Mumbai',
        drop: 'Andheri West, Mumbai',
        date: '2025-03-01',
        status: 'completed',
        price: 320,
    },
    {
        id: 'b2',
        riderId: 'r1',
        riderName: 'Arjun Sharma',
        driverId: 'd1',
        driverName: 'Ravi Kumar',
        cabModel: 'Honda BRV',
        pickup: 'Powai, Mumbai',
        drop: 'Juhu, Mumbai',
        date: '2025-03-04',
        status: 'completed',
        price: 520,
    },
    {
        id: 'b3',
        riderId: 'r1',
        riderName: 'Arjun Sharma',
        driverId: 'd1',
        driverName: 'Ravi Kumar',
        cabModel: 'Maruti Swift',
        pickup: 'Santacruz East, Mumbai',
        drop: 'IIT Bombay',
        date: '2025-03-07',
        status: 'pending',
        price: 270,
    },
];

const initialUsers = [
    {
        id: 'r1',
        name: 'Arjun Sharma',
        email: 'rider@ucab.com',
        role: 'rider',
        joined: '2024-01-15',
        phone: '+91-9876543210',
    },
    {
        id: 'd1',
        name: 'Ravi Kumar',
        email: 'driver@ucab.com',
        role: 'driver',
        joined: '2023-11-02',
        phone: '+91-9123456789',
    },
    {
        id: 'a1',
        name: 'Admin UCab',
        email: 'admin@ucab.com',
        role: 'admin',
        joined: '2023-01-01',
        phone: '+91-9000000001',
    },
];

export function DataProvider({ children }) {
    const loadCabs = () => {
        if (typeof window === 'undefined') return initialCabs;
        try {
            const raw = localStorage.getItem('ucab_cabs');
            return raw ? JSON.parse(raw) : initialCabs;
        } catch {
            return initialCabs;
        }
    };

    const loadBookings = () => {
        if (typeof window === 'undefined') return initialBookings;
        try {
            const raw = localStorage.getItem('ucab_bookings');
            return raw ? JSON.parse(raw) : initialBookings;
        } catch {
            return initialBookings;
        }
    };

    const loadUsers = () => {
        if (typeof window === 'undefined') return initialUsers;
        try {
            const raw = localStorage.getItem('ucab_users');
            return raw ? JSON.parse(raw) : initialUsers;
        } catch {
            return initialUsers;
        }
    };

    const [cabs, setCabsState] = useState(loadCabs);
    const [bookings, setBookingsState] = useState(loadBookings);
    const [users, setUsersState] = useState(loadUsers);

    const setCabs = (updater) => {
        setCabsState((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            if (typeof window !== 'undefined') {
                localStorage.setItem('ucab_cabs', JSON.stringify(next));
            }
            return next;
        });
    };

    const setBookings = (updater) => {
        setBookingsState((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            if (typeof window !== 'undefined') {
                localStorage.setItem('ucab_bookings', JSON.stringify(next));
            }
            return next;
        });
    };

    const setUsers = (updater) => {
        setUsersState((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            if (typeof window !== 'undefined') {
                localStorage.setItem('ucab_users', JSON.stringify(next));
            }
            return next;
        });
    };

    // Listen for cross-context updates (e.g. AuthContext registering users)
    useEffect(() => {
        const handleUsersUpdated = () => {
            setUsersState(loadUsers());
        };
        const handleCabsUpdated = () => {
            setCabsState(loadCabs());
        };
        window.addEventListener('ucab_users_updated', handleUsersUpdated);
        window.addEventListener('ucab_cabs_updated', handleCabsUpdated);
        return () => {
            window.removeEventListener('ucab_users_updated', handleUsersUpdated);
            window.removeEventListener('ucab_cabs_updated', handleCabsUpdated);
        };
    }, []);

    const addBooking = async (booking) => {
        const newBooking = {
            id: `b${Date.now()}`,
            ...booking,
        };
        setBookings((prev) => [newBooking, ...prev]);
        return newBooking;
    };

    const updateBookingStatus = async (bookingId, status) => {
        let updated = null;
        setBookings((prev) =>
            prev.map((b) => {
                if (b.id === bookingId) {
                    updated = { ...b, status };
                    return updated;
                }
                return b;
            }),
        );
        return updated;
    };

    const addCab = async (cab) => {
        const newCab = {
            id: `c${Date.now()}`,
            rating: 0,
            available: true,
            ...cab,
        };
        setCabs((prev) => [...prev, newCab]);
        return newCab;
    };

    const updateCab = async (cabId, updates) => {
        let updated = null;
        setCabs((prev) =>
            prev.map((c) => {
                if (c.id === cabId) {
                    updated = { ...c, ...updates };
                    return updated;
                }
                return c;
            }),
        );
        return updated;
    };

    const deleteCab = async (cabId) => {
        setCabs((prev) => prev.filter((c) => c.id !== cabId));
        return true;
    };

    const updateUser = async (userId, updates) => {
        let updated = null;
        setUsers((prev) =>
            prev.map((u) => {
                if (u.id === userId) {
                    updated = { ...u, ...updates };
                    return updated;
                }
                return u;
            }),
        );
        return updated;
    };

    const deleteUser = async (userId) => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        return true;
    };

    return (
        <DataContext.Provider
            value={{
                cabs,
                bookings,
                users,
                addBooking,
                updateBookingStatus,
                addCab,
                updateCab,
                deleteCab,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error('useData must be used within DataProvider');
    return ctx;
};
