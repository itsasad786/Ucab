import { MapPin, Car, CheckCircle } from 'lucide-react';

const steps = [
    { num: 1, icon: <MapPin size={28} />, title: 'Enter Locations', desc: 'Enter your pickup and drop-off location to get started with your journey.' },
    { num: 2, icon: <Car size={28} />, title: 'Choose a Cab', desc: 'Browse available cabs nearby and pick the one that fits your budget.' },
    { num: 3, icon: <CheckCircle size={28} />, title: 'Ride & Enjoy', desc: 'Confirm your booking and enjoy a safe, comfortable ride to your destination.' },
];

export default function HowItWorks() {
    return (
        <section className="section" id="how-it-works">
            <div className="container">
                <div className="section-header">
                    <div className="section-badge">Simple Process</div>
                    <h2 className="section-title">How UCab <span>Works</span></h2>
                    <p className="section-desc">Get on the road in three simple steps — fast, easy, and reliable every single time.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
                    {/* Connector */}
                    <div style={{
                        position: 'absolute', top: 52, left: '16%', right: '16%', height: 1,
                        background: 'linear-gradient(90deg, var(--primary), transparent 40%, transparent 60%, var(--primary))',
                        zIndex: 0
                    }} />

                    {steps.map((step) => (
                        <div key={step.num} className="step-card" style={{ zIndex: 1 }}>
                            <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 52, fontWeight: 900, color: 'rgba(245,158,11,0.05)', lineHeight: 1 }}>
                                {step.num}
                            </div>
                            <div className="step-number">{step.num}</div>
                            <div style={{ color: 'var(--primary)', marginBottom: 12 }}>{step.icon}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
