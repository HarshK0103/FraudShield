import { motion } from "framer-motion";
import { AlertTriangle, FileBarChart, Percent, TrendingUp } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    variant: "default" | "fraud" | "safe" | "warning";
    delay?: number;
}

const MetricCard = ({ title, value, subtitle, icon, variant, delay = 0 }: MetricCardProps) => {
    const variants = {
        default: "bg-card border-border",
        fraud: "bg-fraud/10 border-fraud/30",
        safe: "bg-safe/10 border-safe/30",
        warning: "bg-warning/10 border-warning/30",
    };

    const iconVariants = {
        default: "text-primary",
        fraud: "text-fraud",
        safe: "text-safe",
        warning: "text-warning",
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className={`rounded-2xl border p-6 ${variants[variant]}`}
        >
        <div className="flex items-start justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            <div className={iconVariants[variant]}>{icon}</div>
        </div>
        <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        </motion.div>
    );
};

interface ResultsMetricsProps {
    totalTransactions: number;
    fraudulentCount: number;
    fraudPercentage: number;
    avgRiskScore: number;
}

const ResultsMetrics = ({
    totalTransactions,
    fraudulentCount,
    fraudPercentage,
    avgRiskScore,
    }: ResultsMetricsProps) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
            title="Total Transactions"
            value={totalTransactions.toLocaleString()}
            subtitle="Analyzed records"
            icon={<FileBarChart className="w-5 h-5" />}
            variant="default"
            delay={0}
        />
        <MetricCard
            title="Fraud Detected"
            value={fraudulentCount.toLocaleString()}
            subtitle="High-risk transactions"
            icon={<AlertTriangle className="w-5 h-5" />}
            variant="fraud"
            delay={0.1}
        />
        <MetricCard
            title="Fraud Rate"
            value={`${fraudPercentage.toFixed(2)}%`}
            subtitle="Of total transactions"
            icon={<Percent className="w-5 h-5" />}
            variant={fraudPercentage > 5 ? "fraud" : fraudPercentage > 1 ? "warning" : "safe"}
            delay={0.2}
        />
        <MetricCard
            title="Avg Risk Score"
            value={`${avgRiskScore.toFixed(1)}%`}
            subtitle="Hybrid risk metric"
            icon={<TrendingUp className="w-5 h-5" />}
            variant={avgRiskScore > 50 ? "fraud" : avgRiskScore > 25 ? "warning" : "safe"}
            delay={0.3}
        />
        </div>
    );
};

export default ResultsMetrics;