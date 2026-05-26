import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <Footer />

      {/* FAB for quick access */}
      <Link href="/intake" className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-50">
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          add
        </span>
      </Link>
    </div>
  );
}
