// Ruta: src/pages/LandingPage.tsx
import Header from '../components/common/Header';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Footer from '../components/common/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black font-sans">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  );
}