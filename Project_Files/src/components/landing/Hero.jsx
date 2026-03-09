import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Shield, ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
    const navigate = useNavigate();

    const dots = [
        { top: '20%', left: '15%', delay: '0s' },
        { top: '40%', left: '30%', delay: '0.4s' },
        { top: '60%', left: '55%', delay: '0.8s' },
        { top: '30%', left: '70%', delay: '1.2s' },
        { top: '70%', left: '80%', delay: '0.6s' },
        { top: '50%', left: '10%', delay: '1s' },
    ];

    return (
        <section className="hero" id="home">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

                    {/* Left Column */}
                    <div className="hero-content animate-slide-up">
                        <div className="hero-badge">
                            <Zap size={14} />
                            India's Fastest Growing Cab Platform
                        </div>

                        <h1 className="hero-title">
                            Book Your Ride<br />
                            <span>Anytime,</span><br />
                            Anywhere
                        </h1>

                        <p className="hero-desc">
                            UCab connects you with trusted drivers in seconds. Safe, affordable, and reliable rides across major cities of India.
                        </p>

                        <div className="hero-actions">
                            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register/rider')}>
                                <MapPin size={18} />
                                Book a Ride
                            </button>
                            <button className="btn btn-outline btn-lg" onClick={() => navigate('/register/driver')}>
                                Become a Driver
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div>
                                <div className="hero-stat-value">50K+</div>
                                <div className="hero-stat-label">Happy Riders</div>
                            </div>
                            <div>
                                <div className="hero-stat-value">3K+</div>
                                <div className="hero-stat-label">Active Drivers</div>
                            </div>
                            <div>
                                <div className="hero-stat-value">4.9</div>
                                <div className="hero-stat-label flex" style={{ gap: 4 }}>
                                    <Star size={13} fill="currentColor" style={{ color: 'var(--primary)', marginTop: 2 }} />
                                    Rating
                                </div>
                            </div>
                            <div>
                                <div className="hero-stat-value">12</div>
                                <div className="hero-stat-label">Cities</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column – Visual card */}
                    <div className="animate-float" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="hero-card" style={{ width: '100%', maxWidth: 400 }}>
                            {/* Map placeholder */}
                            <div className="hero-map-placeholder">
                                <div className="map-dots">
                                    {dots.map((d, i) => (
                                        <div
                                            key={i}
                                            className="map-dot"
                                            style={{ top: d.top, left: d.left, animationDelay: d.delay }}
                                        />
                                    ))}
                                </div>
                                {/* Route line */}
                                <svg width="200" height="100" viewBox="0 0 200 100" style={{ position: 'absolute', opacity: 0.3 }}>
                                    <path d="M 30 80 Q 100 20 170 60" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                                    <circle cx="30" cy="80" r="5" fill="#f59e0b" />
                                    <circle cx="170" cy="60" r="5" fill="#10b981" />
                                </svg>
                                <div style={{ textAlign: 'center', zIndex: 1 }}>
                                    <div style={{ fontSize: 42 }}>🗺️</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>Live Ride Tracking</div>
                                </div>
                            </div>

                            {/* Ride info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(245,158,11,0.08)', borderRadius: 10, border: '1px solid rgba(245,158,11,0.15)' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pickup</div>
                                        <div style={{ fontSize: 14, fontWeight: 600 }}>Bandra West, Mumbai</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(16,185,129,0.06)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.15)' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Drop</div>
                                        <div style={{ fontSize: 14, fontWeight: 600 }}>Andheri West, Mumbai</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#fb923c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🧑</div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 600 }}>Ravi Kumar</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>★ 4.9 · Toyota Corolla</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>Rs. 320</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est. fare</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 6 }}>
                                        <Shield size={12} />
                                        Verified Driver
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: 6 }}>
                                        ⏱ ~12 min
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
