import { motion } from "framer-motion";
import { ArrowRight, Combine, Layers, TreeDeciduous } from "lucide-react";

const models = [
    {
        icon: TreeDeciduous,
        title: "XGBoost Classifier",
        description: "Gradient boosting algorithm trained on historical fraud patterns. Excels at detecting known fraud signatures and transaction anomalies with high precision.",
        features: ["Supervised learning", "Pattern recognition", "High precision", "Fast inference"],
        color: "primary" as const,
    },
    {
        icon: Layers,
        title: "Autoencoder Network",
        description: "Deep neural network trained to reconstruct normal transactions. High reconstruction error indicates anomalous, potentially fraudulent behavior.",
        features: ["Unsupervised learning", "Anomaly detection", "Novel fraud discovery", "Reconstruction error"],
        color: "warning" as const,
    },
    {
        icon: Combine,
        title: "Hybrid Risk Score",
        description: "Intelligent combination of both models weighted by confidence. Provides robust detection by leveraging complementary strengths.",
        features: ["Ensemble method", "Weighted scoring", "Robust detection", "Balanced approach"],
        color: "safe" as const,
    },
];

const ModelExplanation = () => {
    return (
        <section className="py-24 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="container mx-auto px-6 relative">
            {/* Section Header */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The <span className="text-gradient">Hybrid</span> Advantage
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Combining the best of supervised and unsupervised machine learning for comprehensive fraud detection
            </p>
            </motion.div>

            {/* Model Cards */}
            <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Flow Arrows */}
            <div className="hidden lg:flex absolute top-1/2 left-[33%] -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
            </div>
            <div className="hidden lg:flex absolute top-1/2 left-[66%] -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
            </div>

            {models.map((model, index) => (
                <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full"
                >
                <div className="glass rounded-2xl p-8 h-full flex flex-col hover:shadow-glow transition-all duration-300 group">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                    model.color === 'primary' ? 'gradient-primary shadow-glow' :
                    model.color === 'warning' ? 'bg-warning' :
                    'gradient-success shadow-safe'
                    }`}>
                    <model.icon className={`w-7 h-7 ${
                        model.color === 'warning' ? 'text-warning-foreground' : 'text-foreground'
                    }`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{model.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {model.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                    {model.features.map((feature) => (
                        <span
                        key={feature}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-muted-foreground"
                        >
                        {feature}
                        </span>
                    ))}
                    </div>
                </div>
                </motion.div>
            ))}
            </div>

            {/* Formula Section */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 max-w-3xl mx-auto"
            >
            <div className="glass rounded-2xl p-8 text-center">
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
                Hybrid Risk Score Formula
                </p>
                <p className="font-mono text-lg md:text-xl text-foreground">
                <span className="text-primary">Risk</span> = α ×{" "}
                <span className="text-warning">P(fraud | XGBoost)</span> + (1-α) ×{" "}
                <span className="text-safe">AnomalyScore</span>
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                Where α is dynamically adjusted based on model confidence levels
                </p>
            </div>
            </motion.div>
        </div>
        </section>
    );
};

export default ModelExplanation;