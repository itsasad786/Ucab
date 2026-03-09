import { Users } from 'lucide-react';

const cabs = [
    {
        emoji: '🚗',
        name: 'Mini',
        type: 'Economy',
        seats: 4,
        desc: 'Perfect for quick solo trips or small groups. Budget-friendly with great comfort.',
        price: 'Rs. 25',
        bg: 'linear-gradient(135deg, #1e3a5f 0%, #0d2137 100%)',
    },
    {
        emoji: '🚕',
        name: 'Sedan',
        type: 'Standard',
        seats: 4,
        desc: 'Comfortable sedans for everyday travel. Premium experience at affordable rates.',
        price: 'Rs. 40',
        bg: 'linear-gradient(135deg, #2d1b4e 0%, #1a0d30 100%)',
    },
    {
        emoji: '🚙',
        name: 'SUV',
        type: 'Premium',
        seats: 6,
        desc: 'Spacious and luxurious SUVs for families or groups. Maximum comfort guaranteed.',
        price: 'Rs. 60',
        bg: 'linear-gradient(135deg, #1a3a2a 0%, #0d2019 100%)',
    },
];

export default function CabTypes() {
    return (
        <section className="section" id="cabs">
            <div className="container">
                <div className="section-header">
                    <div className="section-badge">Our Fleet</div>
                    <h2 className="section-title">Pick Your <span>Perfect Ride</span></h2>
                    <p className="section-desc">From budget-friendly minis to premium SUVs, we have the right cab for every journey.</p>
                </div>

                <div className="grid-3">
                    {cabs.map((cab, i) => (
                        <div key={i} className="cab-card">
                            <div className="cab-card-img" style={{ background: cab.bg }}>
                                <span style={{ fontSize: 72 }}>{cab.emoji}</span>
                                <div style={{
                                    position: 'absolute', top: 12, right: 12,
                                    background: 'rgba(245,158,11,0.15)',
                                    border: '1px solid rgba(245,158,11,0.3)',
                                    color: 'var(--primary)',
                                    padding: '4px 12px',
                                    borderRadius: 20,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: 0.5
                                }}>
                                    {cab.type}
                                </div>
                            </div>
                            <div className="cab-card-body">
                                <h3 className="cab-card-name">{cab.name}</h3>
                                <div className="cab-card-seats">
                                    <Users size={14} />
                                    {cab.seats} Seats
                                </div>
                                <p className="cab-card-desc">{cab.desc}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div className="cab-card-price">
                                            {cab.price} <span>/ km</span>
                                        </div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Starting price</div>
                                    </div>
                                    <div style={{ fontSize: 13, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: 8 }}>
                                        ★ 4.7+
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
