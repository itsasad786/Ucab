import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';

export default function RideHistory() {
    const { user } = useAuth();
    const { bookings } = useData();
    const myBookings = bookings.filter(b => String(b.riderId) === String(user?.id));

    const statusBadge = (s) => {
        const map = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'danger' };
        return <span className={`badge badge-${map[s] || 'muted'}`}>{s}</span>;
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="rider" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Ride History</h1>
                    <p className="page-subtitle">All your past and upcoming rides</p>
                </div>

                <div className="card">
                    {myBookings.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🚗</div>
                            <div className="empty-state-title">No rides yet</div>
                            <div className="empty-state-desc">Book your first ride to see it here.</div>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Cab</th>
                                        <th>Driver</th>
                                        <th>Pickup</th>
                                        <th>Drop</th>
                                        <th>Date</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myBookings.map(b => (
                                        <tr key={b.id}>
                                            <td style={{ fontWeight: 600 }}>{b.cabModel}</td>
                                            <td>{b.driverName}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.pickup}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.drop}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.date}</td>
                                            <td style={{ color: 'var(--primary)', fontWeight: 700 }}>Rs. {b.price}</td>
                                            <td>{statusBadge(b.status)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
