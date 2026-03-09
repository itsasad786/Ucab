import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';
import { Save } from 'lucide-react';

export default function DriverProfile() {
    const { user, updateProfile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateProfile(form);
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="driver" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">My Profile</h1>
                    <p className="page-subtitle">Your driver account details</p>
                </div>
                <div style={{ maxWidth: 600 }}>
                    <div className="card mb-6" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div className="profile-avatar" style={{ background: 'linear-gradient(135deg,var(--success),#059669)' }}>
                            {user?.name?.charAt(0) || 'D'}
                        </div>
                        <div>
                            <div className="profile-name">{user?.name}</div>
                            <div className="profile-email">{user?.email}</div>
                            <span className="badge badge-success" style={{ marginTop: 8 }}>Driver</span>
                        </div>
                    </div>

                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                            <h2 className="card-title">Personal Information</h2>
                            {!editing && <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>✏️ Edit</button>}
                        </div>
                        {saved && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--success)', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>✓ Profile updated!</div>}
                        {[['Full Name', 'name', 'text'], ['Phone', 'phone', 'tel'], ['Email (readonly)', 'email', 'email']].map(([label, field, type]) => (
                            <div className="form-group" key={field}>
                                <label className="form-label">{label}</label>
                                {editing && field !== 'email' ? (
                                    <input className="form-control" type={type} value={form[field] || ''} onChange={e => setForm({ ...form, [field]: e.target.value })} />
                                ) : (
                                    <div style={{ padding: '12px 16px', background: 'var(--darker)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 15, color: field === 'email' ? 'var(--text-muted)' : 'var(--text)' }}>
                                        {user?.[field] || 'Not set'}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="form-group">
                            <label className="form-label">Member Since</label>
                            <div style={{ padding: '12px 16px', background: 'var(--darker)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 15, color: 'var(--text-muted)' }}>{user?.joined}</div>
                        </div>
                        {editing && (
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className="btn btn-success" onClick={handleSave}><Save size={15} /> Save</button>
                                <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
