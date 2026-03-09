import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function AuthPage({ role, mode }) {
    const { login, register } = useAuth();
    const navigate = useNavigate();
    const isLogin = mode === 'login';

    const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const roleLabels = { rider: 'Rider', driver: 'Driver', admin: 'Admin' };
    const roleEmojis = { rider: '🧑‍💼', driver: '🚗', admin: '🛡️' };
    const roleColors = { rider: '#f59e0b', driver: '#10b981', admin: '#3b82f6' };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 600)); // simulate loading

        if (isLogin) {
            const res = await login(form.email, form.password, role);
            if (res.success) {
                navigate(`/${role}/dashboard`);
            } else {
                setError(res.error);
            }
        } else {
            if (!form.name || !form.email || !form.password) {
                setError('Please fill in all required fields.');
                setLoading(false);
                return;
            }
            const res = await register(form, role);
            if (res.success) {
                navigate(`/${role}/dashboard`);
            } else {
                setError(res.error);
            }
        }
        setLoading(false);
    };

    const dashDescriptions = {
        rider: 'Book rides, track your trips, and travel comfortably across the city.',
        driver: 'Accept rides, manage your schedule, and grow your earnings.',
        admin: 'Oversee the entire UCab platform from one powerful dashboard.',
    };

    return (
        <div className="auth-wrapper">
            {/* Left panel */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <Link to="/" style={{ fontSize: 28, fontWeight: 900, color: 'var(--primary)', display: 'inline-block', marginBottom: 32 }}>
                        UCab
                    </Link>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>{roleEmojis[role]}</div>
                    <h2 className="auth-left-title">
                        {roleLabels[role]} <span>Portal</span>
                    </h2>
                    <p className="auth-left-desc">{dashDescriptions[role]}</p>

                    {/* Role indicators */}
                    <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {['Secure Login', 'Personalized Dashboard', 'Real-time Updates'].map((item) => (
                            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${roleColors[role]}22`, border: `1px solid ${roleColors[role]}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: roleColors[role] }} />
                                </div>
                                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel – form */}
            <div className="auth-right">
                <div className="auth-form-box">
                    <div style={{ marginBottom: 32 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 20, background: `${roleColors[role]}18`, border: `1px solid ${roleColors[role]}33`, color: roleColors[role], fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                            {roleEmojis[role]} {roleLabels[role]}
                        </div>
                        <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                        <p className="auth-subtitle">{isLogin ? `Sign in to your ${roleLabels[role]} account` : `Register as a ${roleLabels[role]} on UCab`}</p>
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--danger)', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14 }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <div className="input-wrapper">
                                    <User size={16} className="input-icon" />
                                    <input
                                        type="text"
                                        className="form-control input-with-icon"
                                        placeholder="Enter your full name"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={16} className="input-icon" />
                                <input
                                    type="email"
                                    className="form-control input-with-icon"
                                    placeholder={isLogin ? `${role}@ucab.com` : 'Enter your email'}
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <div className="input-wrapper">
                                    <span className="input-icon" style={{ fontSize: 15 }}>📞</span>
                                    <input
                                        type="tel"
                                        className="form-control input-with-icon"
                                        placeholder="+91-9XXXXXXXXX"
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-wrapper">
                                <Lock size={16} className="input-icon" />
                                <input
                                    type={showPw ? 'text' : 'password'}
                                    className="form-control input-with-icon"
                                    placeholder={isLogin ? `Try: ${role}123` : 'Create a password'}
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    required
                                    style={{ paddingRight: 44 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, fontSize: 14 }}>
                                <span style={{ color: 'var(--text-muted)' }}>Demo: {role}@ucab.com / {role}123</span>
                                <a href="#" className="auth-link">Forgot password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            style={{ justifyContent: 'center', padding: '14px', fontSize: 16, marginBottom: 16, backgroundColor: roleColors[role], borderColor: roleColors[role] }}
                            disabled={loading}
                        >
                            {loading ? '⏳ Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {role !== 'admin' && (
                        <>
                            <div className="auth-divider">
                                <div className="auth-divider-line" />
                                <span className="auth-divider-text">{isLogin ? 'New here?' : 'Already have an account?'}</span>
                                <div className="auth-divider-line" />
                            </div>
                            <div style={{ textAlign: 'center', fontSize: 14 }}>
                                {isLogin ? (
                                    <>Don't have an account?{' '}
                                        <Link to={`/register/${role}`} className="auth-link">Register as {roleLabels[role]}</Link>
                                    </>
                                ) : (
                                    <>Already have an account?{' '}
                                        <Link to={`/login/${role}`} className="auth-link">Sign in</Link>
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    {/* Role switcher */}
                    <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 10 }}>Sign in as different role</p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                            {['rider', 'driver', 'admin'].filter(r => r !== role).map(r => (
                                <Link
                                    key={r}
                                    to={`/${isLogin ? 'login' : 'register'}/${r}`}
                                    style={{ fontSize: 12, padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)', transition: 'all 0.2s', textTransform: 'capitalize' }}
                                >
                                    {r}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
