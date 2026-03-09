import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { Users, Car, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { users, cabs, bookings } = useData();
    const navigate = useNavigate();

    const totalRiders = users.filter(u => u.role === 'rider').length;
    const totalDrivers = users.filter(u => u.role === 'driver').length;
    const totalBookings = bookings.length;
    const totalCabs = cabs.length;

    const statusBadge = (s) => {
        const map = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'danger' };
        return <span className={`badge badge-${map[s] || 'muted'}`}>{s}</span>;
    };

    const stats = [
        { icon: <Users size={24} />, label: 'Total Riders', value: totalRiders, color: 'gold', path: '/admin/users' },
        { icon: <Car size={24} />, label: 'Total Drivers', value: totalDrivers, color: 'blue', path: '/admin/users' },
        { icon: <BookOpen size={24} />, label: 'Total Bookings', value: totalBookings, color: 'green', path: '/admin/bookings' },
        { icon: <Car size={24} />, label: 'Total Cabs', value: totalCabs, color: 'red', path: '/admin/cabs' },
    ];

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Admin Dashboard 🛡️</h1>
                    <p className="page-subtitle">Platform overview and management</p>
                </div>

                {/* Stats */}
                <div className="grid-4 mb-6">
                    {stats.map((s, i) => (
                        <div key={i} className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate(s.path)}>
                            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
                            <div>
                                <div className="stat-value">{s.value}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent bookings */}
                <div className="card mb-6">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h2 className="card-title">Recent Bookings</h2>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/bookings')}>
                            View All <ArrowRight size={14} />
                        </button>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rider</th>
                                    <th>Driver</th>
                                    <th>Pickup</th>
                                    <th>Drop</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.slice(0, 5).map(b => (
                                    <tr key={b.id}>
                                        <td style={{ fontWeight: 600 }}>{b.riderName}</td>
                                        <td>{b.driverName}</td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.pickup}</td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.drop}</td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.date}</td>
                                        <td>{statusBadge(b.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick actions */}
                <div className="grid-3">
                    {[
                        { label: 'Manage Users', desc: 'View and edit all registered users', path: '/admin/users', icon: '👥' },
                        { label: 'Manage Bookings', desc: 'Monitor all booking activity', path: '/admin/bookings', icon: '📋' },
                        { label: 'Add New Cab', desc: 'Register a new cab to the fleet', path: '/admin/cabs/add', icon: '🚗' },
                    ].map(a => (
                        <div key={a.path} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate(a.path)}>
                            <div style={{ fontSize: 32, marginBottom: 12 }}>{a.icon}</div>
                            <div style={{ fontWeight: 700, marginBottom: 4 }}>{a.label}</div>
                            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.desc}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
