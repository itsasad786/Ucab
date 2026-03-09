import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard, Car, Clock, User, LogOut,
    MapPin, DollarSign, Users, BookOpen, PlusCircle
} from 'lucide-react';

const navConfigs = {
    rider: [
        { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/rider/dashboard' },
        { icon: <MapPin size={18} />, label: 'Book Ride', path: '/rider/book' },
        { icon: <Clock size={18} />, label: 'Ride History', path: '/rider/history' },
        { icon: <User size={18} />, label: 'Profile', path: '/rider/profile' },
    ],
    driver: [
        { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/driver/dashboard' },
        { icon: <Car size={18} />, label: 'Assigned Rides', path: '/driver/rides' },
        { icon: <DollarSign size={18} />, label: 'Earnings', path: '/driver/earnings' },
        { icon: <Clock size={18} />, label: 'Ride History', path: '/driver/history' },
        { icon: <User size={18} />, label: 'Profile', path: '/driver/profile' },
    ],
    admin: [
        { icon: <LayoutDashboard size={18} />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Users size={18} />, label: 'Users', path: '/admin/users' },
        { icon: <BookOpen size={18} />, label: 'Bookings', path: '/admin/bookings' },
        { icon: <Car size={18} />, label: 'Cabs', path: '/admin/cabs' },
        { icon: <PlusCircle size={18} />, label: 'Add Cab', path: '/admin/cabs/add' },
    ],
};

const roleColors = { rider: 'var(--primary)', driver: 'var(--success)', admin: 'var(--info)' };
const roleEmojis = { rider: '🧑‍💼', driver: '🚗', admin: '🛡️' };

export default function Sidebar({ role }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const items = navConfigs[role] || [];
    const color = roleColors[role];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-text">UCab</div>
                <div className="sidebar-logo-sub" style={{ color }}>{roleEmojis[role]} {role.charAt(0).toUpperCase() + role.slice(1)} Portal</div>
            </div>

            {/* User info */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${color}, #fb923c)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: 'var(--dark)', flexShrink: 0 }}>
                        {user?.name?.charAt(0) || '?'}
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user?.name || 'User'}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user?.email}
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav items */}
            <nav className="sidebar-nav">
                <div className="nav-section-title">Menu</div>
                {items.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            className={`nav-item ${active ? 'active' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                            {active && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: color }} />}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="sidebar-footer">
                <button
                    className="nav-item"
                    onClick={handleLogout}
                    style={{ color: 'var(--danger)', width: '100%' }}
                >
                    <span className="nav-icon"><LogOut size={18} /></span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
