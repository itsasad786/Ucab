import { useNavigate } from 'react-router-dom';
import { MapPin, UserPlus } from 'lucide-react';

export default function CTA() {
    const navigate = useNavigate();
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-card">
                    {/* BG decorations */}
                    <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(245,158,11,0.06)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: -80, left: -40, width: 240, height: 240, borderRadius: '50%', background: 'rgba(59,130,246,0.05)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div className="section-badge" style={{ margin: '0 auto 20px' }}>Get Started Today</div>
                        <h2 className="cta-title">Ready to Travel<br />with <span style={{ color: 'var(--primary)' }}>UCab</span>?</h2>
                        <p className="cta-desc">Join thousands of satisfied riders. Safe, fast, and affordable rides are just one tap away.</p>
                        <div className="cta-actions">
                            <button className="btn btn-primary btn-lg" onClick={() => navigate('/login/rider')}>
                                <MapPin size={18} />
                                Book a Ride
                            </button>
                            <button className="btn btn-outline btn-lg" onClick={() => navigate('/register/rider')}>
                                <UserPlus size={18} />
                                Register Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
