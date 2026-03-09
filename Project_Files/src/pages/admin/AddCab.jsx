import { useState } from 'react';
import { useData } from '../../context/DataContext';
import Sidebar from '../../components/common/Sidebar';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddCab() {
    const { addCab, users } = useData();
    const navigate = useNavigate();
    const drivers = users.filter(u => u.role === 'driver');

    const [form, setForm] = useState({ model: '', plate: '', seats: 4, type: 'Sedan', driver: '', driverId: '', pricePerKm: 40 });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await addCab(form);
        if (result) {
            setSuccess(true);
            setTimeout(() => navigate('/admin/cabs'), 1500);
        } else {
            setError('Failed to add cab. Please try again.');
        }
    };

    if (success) {
        return (
            <div className="dashboard-layout">
                <Sidebar role="admin" />
                <main className="main-content flex-center">
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 64 }}>🚗</div>
                        <h2 style={{ marginTop: 16, fontWeight: 800 }}>Cab Added Successfully!</h2>
                        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Redirecting to Cab Management...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <Sidebar role="admin" />
            <main className="main-content">
                <div className="page-header">
                    <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/cabs')} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <ArrowLeft size={14} /> Back to Cabs
                    </button>
                    <h1 className="page-title">Add New Cab</h1>
                    <p className="page-subtitle">Register a new vehicle to the fleet</p>
                </div>

                    <div style={{ maxWidth: 560 }}>
                    {error && (
                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--danger)', padding: 12, borderRadius: 10, marginBottom: 16 }}>⚠️ {error}</div>
                    )}
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Cab Model *</label>
                                <input className="form-control" placeholder="e.g. Toyota Corolla" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} required />
                            </div>

                            <div className="grid-2" style={{ gap: 16 }}>
                                <div className="form-group">
                                    <label className="form-label">Cab Type</label>
                                    <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                        <option>Mini</option>
                                        <option>Sedan</option>
                                        <option>SUV</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Number of Seats</label>
                                    <input type="number" className="form-control" min={2} max={12} value={form.seats} onChange={e => setForm({ ...form, seats: +e.target.value })} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Plate Number *</label>
                                <input className="form-control" placeholder="e.g. MH-12-AB-1234" value={form.plate} onChange={e => setForm({ ...form, plate: e.target.value })} required />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Price Per Km (Rs.)</label>
                                <input type="number" className="form-control" min={10} value={form.pricePerKm} onChange={e => setForm({ ...form, pricePerKm: +e.target.value })} required />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Assign Driver</label>
                                <select
                                    className="form-control"
                                    value={form.driverId}
                                    onChange={e => {
                                        const d = drivers.find(d => d.id === e.target.value);
                                        setForm({ ...form, driverId: e.target.value, driver: d?.name || '' });
                                    }}
                                >
                                    <option value="">Select a driver</option>
                                    {drivers.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                <button type="submit" className="btn btn-primary">
                                    <PlusCircle size={16} /> Add Cab
                                </button>
                                <button type="button" className="btn btn-outline" onClick={() => navigate('/admin/cabs')}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
