import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MarqueeStrip from '@/components/MarqueeStrip';
import MetricsBar from '@/components/MetricsBar';
import AIChatSection from '@/components/AIChatSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import LeadershipSection from '@/components/LeadershipSection';
import AcademicsSection from '@/components/AcademicsSection';
import TerminalContact from '@/components/TerminalContact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-auralis-canvas text-auralis-primary dark:text-white selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <MarqueeStrip />
        <MetricsBar />
        <AIChatSection />
        <ExperienceSection />
        <ProjectsSection />
        <LeadershipSection />
        <AcademicsSection />
        <TerminalContact />
      </main>
      <Footer />
    </div>
  );
}
