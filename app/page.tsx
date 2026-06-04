import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import SocialProof from '@/components/SocialProof';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <SocialProof />
      <WaitlistForm />
      <Footer />
    </>
  );
}
