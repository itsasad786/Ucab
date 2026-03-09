import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import CabTypes from '../components/landing/CabTypes';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <HowItWorks />
            <Features />
            <CabTypes />
            <CTA />
            <Footer />
        </>
    );
}
