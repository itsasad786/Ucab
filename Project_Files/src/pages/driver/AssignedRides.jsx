import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { CheckCircle, X } from 'lucide-react';

export default function AssignedRides() {
    const { user } = useAuth();
    const { bookings, updateBookingStatus } = useData();

    const myRides = bookings.filter(b => String(b.driverId) === String(user?.id));

    const statusBadge = (s) => {
        const map = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'danger' };
        return <span className={`badge badge-${map[s] || 'muted'}`}>{s}</span>;
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="driver" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Assigned Rides</h1>
                    <p className="page-subtitle">Manage rides assigned to you</p>
                </div>

                {myRides.length === 0 ? (
                    <div className="card">
                        <div className="empty-state">
                            <div className="empty-state-icon">🚗</div>
                            <div className="empty-state-title">No rides assigned</div>
                            <div className="empty-state-desc">New ride requests will appear here.</div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {myRides.map(b => (
                            <div key={b.id} className="card" style={{ borderColor: b.status === 'pending' ? 'rgba(245,158,11,0.3)' : undefined }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                        <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                                            👤
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 16 }}>{b.riderName}</div>
                                            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                                                <span style={{ color: 'var(--primary)' }}>●</span> {b.pickup}
                                            </div>
                                            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                                                <span style={{ color: 'var(--success)' }}>●</span> {b.drop}
                                            </div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>📅 {b.date} · Rs. {b.price}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                                        {statusBadge(b.status)}
                                        {b.status === 'pending' && (
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => updateBookingStatus(b.id, 'confirmed')}
                                                >
                                                    <CheckCircle size={14} /> Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => updateBookingStatus(b.id, 'cancelled')}
                                                >
                                                    <X size={14} /> Decline
                                                </button>
                                            </div>
                                        )}
                                        {b.status === 'confirmed' && (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => updateBookingStatus(b.id, 'completed')}
                                            >
                                                <CheckCircle size={14} /> Mark Completed
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
