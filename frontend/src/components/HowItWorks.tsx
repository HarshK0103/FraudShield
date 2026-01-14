import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Brain, Upload } from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload Transactions",
        description: "Upload your credit card transaction CSV with transaction details for analysis.",
        color: "primary" as const,
    },
    {
        icon: Brain,
        title: "Hybrid Analysis",
        description: "XGBoost classifies known patterns while Autoencoders detect anomalies.",
        color: "warning" as const,
    },
    {
        icon: BarChart3,
        title: "Risk Scoring",
        description: "Get comprehensive fraud probability, anomaly scores, and risk assessments.",
        color: "safe" as const,
    },
];

const HowItWorks = () => {
    return (
        <section className="py-24 relative">
        <div className="container mx-auto px-6">
            {/* Section Header */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How <span className="text-gradient">FraudShield</span> Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A seamless three-step process from upload to actionable insights
            </p>
            </motion.div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-warning to-safe opacity-30" />

            {steps.map((step, index) => (
                <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
                >
                <div className="glass rounded-2xl p-8 h-full hover:shadow-glow transition-all duration-300 group">
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center font-mono text-sm font-semibold text-muted-foreground">
                    {index + 1}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                    step.color === 'primary' ? 'gradient-primary shadow-glow' :
                    step.color === 'warning' ? 'bg-warning shadow-md' :
                    'gradient-success shadow-safe'
                    }`}>
                    <step.icon className={`w-7 h-7 ${
                        step.color === 'warning' ? 'text-warning-foreground' : 'text-foreground'
                    }`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                    {/* Arrow for non-last items */}
                    {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                    )}
                </div>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default HowItWorks;