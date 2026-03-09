import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { Car, DollarSign, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriverDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { bookings } = useData();

    // Driver d1 as default for demo
    const myRides = bookings.filter(b => String(b.driverId) === String(user?.id));
    const completed = myRides.filter(b => b.status === 'completed').length;
    const pending = myRides.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
    const earnings = myRides.filter(b => b.status === 'completed').reduce((acc, b) => acc + (b.price || 0), 0);

    const statusBadge = (s) => {
        const map = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'danger' };
        return <span className={`badge badge-${map[s] || 'muted'}`}>{s}</span>;
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="driver" />
            <main className="main-content">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="page-title">Driver Dashboard 🚗</h1>
                        <p className="page-subtitle">Welcome back, {user?.name?.split(' ')[0]}!</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/driver/rides')}>
                        View Rides <ArrowRight size={16} />
                    </button>
                </div>

                {/* Stats */}
                <div className="grid-3 mb-6">
                    <div className="stat-card">
                        <div className="stat-icon green"><CheckCircle size={24} /></div>
                        <div>
                            <div className="stat-value">{completed}</div>
                            <div className="stat-label">Completed Rides</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon gold"><Clock size={24} /></div>
                        <div>
                            <div className="stat-value">{pending}</div>
                            <div className="stat-label">Pending Rides</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon blue"><DollarSign size={24} /></div>
                        <div>
                            <div className="stat-value">Rs. {earnings.toLocaleString()}</div>
                            <div className="stat-label">Total Earnings</div>
                        </div>
                    </div>
                </div>

                {/* Recent rides */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h2 className="card-title">Recent Assigned Rides</h2>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/driver/rides')}>
                            View All <ArrowRight size={14} />
                        </button>
                    </div>
                    {myRides.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🚗</div>
                            <div className="empty-state-title">No rides assigned yet</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {myRides.slice(0, 3).map(b => (
                                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, background: 'var(--darker)', borderRadius: 12, border: '1px solid var(--border)' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👤</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{b.riderName}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{b.pickup} → {b.drop}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        {statusBadge(b.status)}
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Rs. {b.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tip card */}
                <div style={{ marginTop: 24, background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02))', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>💡 Pro Tip</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Complete rides promptly to maintain a high rating and receive more ride requests!</div>
                </div>
            </main>
        </div>
    );
}
