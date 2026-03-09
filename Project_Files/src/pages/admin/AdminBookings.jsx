import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';

export default function AdminBookings() {
    const { bookings } = useData();

    const statusBadge = (s) => {
        const map = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'danger' };
        return <span className={`badge badge-${map[s] || 'muted'}`}>{s}</span>;
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Booking Management</h1>
                    <p className="page-subtitle">All bookings across the platform</p>
                </div>

                <div className="card">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rider</th>
                                    <th>Driver</th>
                                    <th>Cab</th>
                                    <th>Pickup</th>
                                    <th>Drop</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(b => (
                                    <tr key={b.id}>
                                        <td style={{ fontWeight: 600 }}>{b.riderName}</td>
                                        <td>{b.driverName}</td>
                                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.cabModel}</td>
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
                </div>
            </main>
        </div>
    );
}
