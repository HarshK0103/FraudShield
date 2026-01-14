import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, Shield, Zap } from "lucide-react";

interface HeroSectionProps {
    onRunAnalysis: () => void;
}

const HeroSection = ({ onRunAnalysis }: HeroSectionProps) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Animated Glow Orbs */}
        <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, hsl(210 100% 52% / 0.4) 0%, transparent 70%)" }}
            animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, hsl(0 85% 55% / 0.3) 0%, transparent 70%)" }}
            animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center">
            {/* Logo/Icon */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
            >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary shadow-glow">
                <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            </motion.div>

            {/* Title */}
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            >
            <span className="text-gradient">Fraud</span>
            <span className="text-foreground">Shield</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium mb-6 max-w-3xl mx-auto"
            >
            Hybrid Credit Card Fraud Detection using{" "}
            <span className="text-primary">XGBoost</span> &{" "}
            <span className="text-primary">Autoencoders</span>
            </motion.p>

            {/* Description */}
            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
            Combining supervised classification with unsupervised anomaly detection 
            to identify both known fraud patterns and novel attack vectors in real-time.
            </motion.p>

            {/* CTA Button */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            >
            <Button
                onClick={onRunAnalysis}
                size="lg"
                className="gradient-primary text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-glow hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
                <Zap className="w-5 h-5 mr-2" />
                Run Fraud Analysis
            </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground"
            >
            <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-safe" />
                <span className="text-sm">Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm">Real-Time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-warning" />
                <span className="text-sm">99.2% Accuracy</span>
            </div>
            </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            </div>
        </motion.div>
        </section>
    );
};

export default HeroSection;