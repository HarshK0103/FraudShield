import Footer from "@/components/Footer";
import FraudDashboard from "@/components/FraudDashboard";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ModelExplanation from "@/components/ModelExplanation";
import { useRef } from "react";

const Index = () => {
    const dashboardRef = useRef<HTMLDivElement>(null);

    const scrollToDashboard = () => {
        dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="min-h-screen bg-background">
        <HeroSection onRunAnalysis={scrollToDashboard} />
        <HowItWorks />
        <div ref={dashboardRef}>
            <FraudDashboard />
        </div>
        <ModelExplanation />
        <Footer />
        </main>
    );
};

export default Index;