import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';

export default function DriverHistory() {
    const { user } = useAuth();
    const { bookings } = useData();
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
                    <h1 className="page-title">Ride History</h1>
                    <p className="page-subtitle">All your past rides</p>
                </div>
                <div className="card">
                    {myRides.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🚗</div>
                            <div className="empty-state-title">No ride history yet</div>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Rider</th>
                                        <th>Pickup</th>
                                        <th>Drop</th>
                                        <th>Date</th>
                                        <th>Earnings</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRides.map(b => (
                                        <tr key={b.id}>
                                            <td style={{ fontWeight: 600 }}>{b.riderName}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.pickup}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.drop}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.date}</td>
                                            <td style={{ color: 'var(--success)', fontWeight: 600 }}>Rs. {b.price}</td>
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
