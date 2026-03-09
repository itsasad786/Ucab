export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div className="footer-logo">UCab</div>
                        <p className="footer-desc">
                            India's trusted cab booking platform connecting riders with verified drivers across major cities. Safe, reliable & affordable.
                        </p>
                        <div className="footer-social">
                            {['📘', '🐦', '📸', '▶️'].map((icon, i) => (
                                <button key={i} className="footer-social-btn">{icon}</button>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="footer-heading">Company</h4>
                        <div className="footer-links">
                            {['About Us', 'Blog', 'Careers', 'Press'].map(l => (
                                <a key={l} href="#" className="footer-link">{l}</a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="footer-heading">Services</h4>
                        <div className="footer-links">
                            {['Ride Booking', 'Driver Partner', 'Corporate Rides', 'Safety'].map(l => (
                                <a key={l} href="#" className="footer-link">{l}</a>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="footer-heading">Contact</h4>
                        <div className="footer-links">
                            <span className="footer-link">📧 support@ucab.com</span>
                            <span className="footer-link">📞 0800-UCAB-00</span>
                            <span className="footer-link">📍 Mumbai, India</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span className="footer-copy">© {year} UCab. All rights reserved.</span>
                    <div style={{ display: 'flex', gap: 24 }}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                            <a key={l} href="#" className="footer-link" style={{ fontSize: 13 }}>{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
