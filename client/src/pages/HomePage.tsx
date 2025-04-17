import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import TeamSection from "@/components/NewTeamSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import RegisterSection from "@/components/RegisterSection";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <TeamSection />
      <ProjectsSection />
      <ContactSection />
      <RegisterSection />
    </Layout>
  );
}
