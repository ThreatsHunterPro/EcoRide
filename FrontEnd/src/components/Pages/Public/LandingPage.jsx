import Header from "../../Layouts/Header";
import HeroSection from "../../Sections/HeroSection";
import FeaturesSection from "../../Sections/FeaturesSection";
import Footer from "../../Layouts/Footer";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
        <Header/>
        <main className="flex-grow">
          <HeroSection/>
          <FeaturesSection/>
        </main>
        <Footer/>
    </div>
  );
}
