import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.3)' : 'none' }}>
            <div className="navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    U<span>Cab</span>
                </Link>

                {/* Desktop Links */}
                <div className="navbar-links">
                    <button className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollTo('home')}>Home</button>
                    <button className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollTo('services')}>Services</button>
                    <button className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollTo('how-it-works')}>How It Works</button>
                    <button className="navbar-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => scrollTo('cabs')}>Cab Types</button>
                </div>

                {/* Actions */}
                <div className="navbar-actions">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                            className="btn btn-ghost"
                            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                            onClick={() => navigate('/login/rider')}
                        >
                            Login <ChevronDown size={14} />
                        </button>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/register/rider')}>
                        Register
                    </button>
                </div>
            </div>
        </nav>
    );
}
