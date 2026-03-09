import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { MapPin, Clock, CheckCircle, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RiderDashboard() {
    const { user } = useAuth();
    const { bookings } = useData();
    const navigate = useNavigate();

    const myBookings = bookings.filter(b => String(b.riderId) === String(user?.id));
    const total = myBookings.length;
    const upcoming = myBookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
    const completed = myBookings.filter(b => b.status === 'completed').length;
    const recent = myBookings.slice(0, 3);

    const statusBadge = (s) => {
        const map = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'danger' };
        return <span className={`badge badge-${map[s] || 'muted'}`}>{s}</span>;
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="rider" />
            <main className="main-content">
                {/* Header */}
                <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h1 className="page-title">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
                        <p className="page-subtitle">Here's an overview of your rides</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/rider/book')}>
                        <MapPin size={16} /> Book a Ride
                    </button>
                </div>

                {/* Stats */}
                <div className="grid-3 mb-6">
                    <div className="stat-card">
                        <div className="stat-icon gold"><TrendingUp size={24} /></div>
                        <div>
                            <div className="stat-value">{total}</div>
                            <div className="stat-label">Total Rides</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon blue"><Clock size={24} /></div>
                        <div>
                            <div className="stat-value">{upcoming}</div>
                            <div className="stat-label">Upcoming Rides</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon green"><CheckCircle size={24} /></div>
                        <div>
                            <div className="stat-value">{completed}</div>
                            <div className="stat-label">Completed Rides</div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h2 className="card-title">Recent Bookings</h2>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/rider/history')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            View All <ArrowRight size={14} />
                        </button>
                    </div>

                    {recent.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🚗</div>
                            <div className="empty-state-title">No bookings yet</div>
                            <div className="empty-state-desc">Book your first ride to get started!</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {recent.map(b => (
                                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: 'var(--darker)', borderRadius: 12, border: '1px solid var(--border)' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                                        🚗
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{b.cabModel}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                                            {b.pickup} → {b.drop}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        {statusBadge(b.status)}
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Rs. {b.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Book CTA */}
                <div style={{ marginTop: 24, background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Ready for your next ride?</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Book a cab in under 30 seconds</div>
                    </div>
                    <button className="btn btn-primary" onClick={() => navigate('/rider/book')}>
                        Book Now <ArrowRight size={16} />
                    </button>
                </div>
            </main>
        </div>
    );
}
