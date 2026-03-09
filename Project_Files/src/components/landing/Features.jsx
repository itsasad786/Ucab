import { Shield, Zap, Navigation, CreditCard } from 'lucide-react';

const features = [
    { icon: <Zap size={24} />, title: 'Easy Ride Booking', desc: 'Book your ride in seconds with our intuitive interface. Enter pickup, drop, and go.' },
    { icon: <Shield size={24} />, title: 'Trusted Drivers', desc: 'All drivers are verified and background-checked for your safety and peace of mind.' },
    { icon: <Navigation size={24} />, title: 'Live Ride Tracking', desc: 'Track your ride in real-time on an interactive map so you always know where your cab is.' },
    { icon: <CreditCard size={24} />, title: 'Secure Payments', desc: 'Pay safely and conveniently with cash or digital payments. No hidden charges, ever.' },
];

export default function Features() {
    return (
        <section className="section" id="services" style={{ background: 'rgba(255,255,255,0.01)' }}>
            <div className="container">
                <div className="section-header">
                    <div className="section-badge">Why Choose Us</div>
                    <h2 className="section-title">Everything You Need for a <span>Perfect Ride</span></h2>
                    <p className="section-desc">UCab is built with your comfort and safety as our top priority at every step.</p>
                </div>

                <div className="grid-4">
                    {features.map((f, i) => (
                        <div key={i} className="feature-card">
                            <div className="feature-icon">{f.icon}</div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
