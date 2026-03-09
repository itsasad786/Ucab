import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';
import { Save, User } from 'lucide-react';

export default function RiderProfile() {
    const { user, updateProfile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '' });
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateProfile(form);
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar role="rider" />
            <main className="main-content">
                <div className="page-header">
                    <h1 className="page-title">My Profile</h1>
                    <p className="page-subtitle">View and edit your account information</p>
                </div>

                <div style={{ maxWidth: 600 }}>
                    {/* Avatar & Name */}
                    <div className="card mb-6" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div className="profile-avatar">{user?.name?.charAt(0) || 'R'}</div>
                        <div>
                            <div className="profile-name">{user?.name}</div>
                            <div className="profile-email">{user?.email}</div>
                            <span className="badge badge-warning" style={{ marginTop: 8 }}>Rider</span>
                        </div>
                    </div>

                    {/* Info form */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                            <h2 className="card-title">Personal Information</h2>
                            {!editing && (
                                <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}>
                                    ✏️ Edit Profile
                                </button>
                            )}
                        </div>

                        {saved && <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--success)', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>✓ Profile updated successfully!</div>}

                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            {editing ? (
                                <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'var(--darker)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 15 }}>{user?.name}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ padding: '12px 16px', background: 'var(--darker)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 15, color: 'var(--text-muted)' }}>{user?.email}</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            {editing ? (
                                <input className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="03XX-XXXXXXX" />
                            ) : (
                                <div style={{ padding: '12px 16px', background: 'var(--darker)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 15 }}>{user?.phone || 'Not set'}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Member Since</label>
                            <div style={{ padding: '12px 16px', background: 'var(--darker)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 15, color: 'var(--text-muted)' }}>{user?.joined}</div>
                        </div>

                        {editing && (
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className="btn btn-primary" onClick={handleSave}><Save size={15} /> Save Changes</button>
                                <button className="btn btn-outline" onClick={() => setEditing(false)}>Cancel</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
