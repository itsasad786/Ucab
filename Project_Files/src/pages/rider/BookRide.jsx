import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react';

export default function BookRide() {
    const { user } = useAuth();
    const { cabs, addBooking } = useData();

    const [form, setForm] = useState({ pickup: '', drop: '', date: '' });
    const [searched, setSearched] = useState(false);
    const [selected, setSelected] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);

    const availableCabs = cabs.filter(c => c.available);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!form.pickup || !form.drop || !form.date) return;
        setSearched(true);
        setSelected(null);
    };

    const handleBook = async () => {
        if (!selected) return;
        setLoading(true);
        const result = await addBooking({
            riderId: user?.id,
            riderName: user?.name,
            driverId: selected.driverId,
            driverName: selected.driver,
            cabId: selected.id,
            cabModel: selected.model,
            pickup: form.pickup,
            drop: form.drop,
            date: form.date,
            status: 'pending',
            price: Math.round(Math.random() * 300 + 200),
        });
        setLoading(false);
        setConfirmed(!!result);
    };

    if (confirmed) {
        return (
            <div className="dashboard-layout">
                <Sidebar role="rider" />
                <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', maxWidth: 480 }}>
                        <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
                        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Ride Booked!</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
                            Your ride in <strong>{selected?.model}</strong> with driver <strong>{selected?.driver}</strong> has been booked. The driver will confirm shortly.
                        </p>
                        <div className="card" style={{ textAlign: 'left', marginBottom: 24 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[['Pickup', form.pickup], ['Drop', form.drop], ['Date', form.date], ['Driver', selected?.driver], ['Cab', selected?.model]].map(([label, val]) => (
                                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{label}</span>
                                        <span style={{ fontWeight: 600, fontSize: 13 }}>{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                            <button className="btn btn-primary" onClick={() => { setConfirmed(false); setSearched(false); setForm({ pickup: '', drop: '', date: '' }); }}>
                                Book Another Ride
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <Sidebar role="rider" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">Book a Ride</h1>
                    <p className="page-subtitle">Find available cabs near you</p>
                </div>

                {/* Search Form */}
                <div className="booking-form mb-6">
                    <div className="booking-form-title">
                        <MapPin size={20} style={{ color: 'var(--primary)' }} />
                        Enter Ride Details
                    </div>
                    <form onSubmit={handleSearch}>
                        <div className="grid-3" style={{ gap: 16 }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Pickup Location</label>
                                <div className="input-wrapper">
                                    <span className="input-icon" style={{ color: 'var(--primary)' }}>●</span>
                                    <input className="form-control input-with-icon" placeholder="e.g. Bandra, Mumbai" value={form.pickup} onChange={e => setForm({ ...form, pickup: e.target.value })} required />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Drop Location</label>
                                <div className="input-wrapper">
                                    <span className="input-icon" style={{ color: 'var(--success)' }}>●</span>
                                    <input className="form-control input-with-icon" placeholder="e.g. Andheri, Mumbai" value={form.drop} onChange={e => setForm({ ...form, drop: e.target.value })} required />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Ride Date</label>
                                <div className="input-wrapper">
                                    <Calendar size={16} className="input-icon" />
                                    <input type="date" className="form-control input-with-icon" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required min={new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4" style={{ paddingLeft: 28, paddingRight: 28 }}>
                            <Search size={16} /> Search Cabs
                        </button>
                    </form>
                </div>

                {/* Search Results */}
                {searched && (
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
                            Available Cabs <span style={{ color: 'var(--text-muted)', fontSize: 14, fontWeight: 400 }}>({availableCabs.length} found)</span>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {availableCabs.map(cab => (
                                <div key={cab.id} className="cab-result-card" style={{ borderColor: selected?.id === cab.id ? 'rgba(245,158,11,0.5)' : undefined }}>
                                    <div className="cab-result-info">
                                        <div className="cab-result-icon">🚗</div>
                                        <div>
                                            <div className="cab-result-name">{cab.model} · {cab.type}</div>
                                            <div className="cab-result-meta">
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {cab.seats} seats</span>
                                                <span style={{ marginLeft: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}><Star size={12} fill="currentColor" style={{ color: 'var(--primary)' }} /> {cab.rating}</span>
                                                <span style={{ marginLeft: 12 }}>Driver: {cab.driver}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <div style={{ textAlign: 'right' }}>
                                            <div className="cab-result-price">Rs. {cab.pricePerKm}/km</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est. ~Rs. {cab.pricePerKm * 8}</div>
                                        </div>
                                        <button
                                            className={`btn btn-sm ${selected?.id === cab.id ? 'btn-success' : 'btn-primary'}`}
                                            onClick={() => setSelected(cab)}
                                        >
                                            {selected?.id === cab.id ? '✓ Selected' : 'Select'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selected && (
                            <div style={{ marginTop: 20, background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.03))', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 16, padding: 24 }}>
                                <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Booking Confirmation</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16, fontSize: 14 }}>
                                    {[['Pickup', form.pickup], ['Drop', form.drop], ['Date', form.date], ['Cab', selected.model], ['Driver', selected.driver], ['Seats', selected.seats]].map(([l, v]) => (
                                        <div key={l}>
                                            <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{l}</div>
                                            <div style={{ fontWeight: 600 }}>{v}</div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-primary" onClick={handleBook} disabled={loading}>
                                    {loading ? '⏳ Booking...' : '✓ Confirm Booking'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
