import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

export default function Earnings() {
    const { user } = useAuth();
    const { bookings } = useData();
    const myRides = bookings.filter(b => String(b.driverId) === String(user?.id) && b.status === 'completed');
    const totalEarnings = myRides.reduce((acc, b) => acc + (b.price || 0), 0);

    return (
        <div className="dashboard-layout">
            <Sidebar role="driver" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Earnings</h1>
                    <p className="page-subtitle">Track your income and completed rides</p>
                </div>

                {/* Top stats */}
                <div className="grid-3 mb-6">
                    <div className="stat-card">
                        <div className="stat-icon green"><DollarSign size={24} /></div>
                        <div>
                            <div className="stat-value">Rs. {totalEarnings.toLocaleString()}</div>
                            <div className="stat-label">Total Earnings</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon blue"><CheckCircle size={24} /></div>
                        <div>
                            <div className="stat-value">{myRides.length}</div>
                            <div className="stat-label">Completed Rides</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon gold"><TrendingUp size={24} /></div>
                        <div>
                            <div className="stat-value">Rs. {myRides.length > 0 ? Math.round(totalEarnings / myRides.length) : 0}</div>
                            <div className="stat-label">Avg. Per Ride</div>
                        </div>
                    </div>
                </div>

                {/* Earnings detail table */}
                <div className="card">
                    <h2 className="card-title" style={{ marginBottom: 20 }}>Earnings Per Ride</h2>
                    {myRides.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">💰</div>
                            <div className="empty-state-title">No earnings yet</div>
                            <div className="empty-state-desc">Complete rides to see your earnings here.</div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRides.map(b => (
                                        <tr key={b.id}>
                                            <td style={{ fontWeight: 600 }}>{b.riderName}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.pickup}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.drop}</td>
                                            <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.date}</td>
                                            <td style={{ color: 'var(--success)', fontWeight: 700 }}>+ Rs. {b.price}</td>
                                        </tr>
                                    ))}
                                    <tr style={{ background: 'rgba(16,185,129,0.04)' }}>
                                        <td colSpan={4} style={{ fontWeight: 700, color: 'var(--text)' }}>Total</td>
                                        <td style={{ color: 'var(--success)', fontWeight: 800, fontSize: 16 }}>Rs. {totalEarnings.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
