import { motion } from "framer-motion";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TransactionResult } from "./ResultsTable";

export interface FraudChartsProps {
    results: TransactionResult[];
}

const FraudCharts = ({ results }: FraudChartsProps) => {
  // Pie Chart Data
    const fraudCount = results.filter((r) => r.prediction === "Fraud").length;
    const nonFraudCount = results.length - fraudCount;

    const pieData = [
        { name: "Fraud", value: fraudCount, color: "hsl(0, 85%, 55%)" },
        { name: "Non-Fraud", value: nonFraudCount, color: "hsl(150, 70%, 42%)" },
    ];

    // Histogram Data - Risk Score Distribution
    const bins = [
        { range: "0-20%", count: 0 },
        { range: "20-40%", count: 0 },
        { range: "40-60%", count: 0 },
        { range: "60-80%", count: 0 },
        { range: "80-100%", count: 0 },
    ];

    results.forEach((r) => {
        const score = r.hybridRiskScore;
        if (score < 20) bins[0].count++;
        else if (score < 40) bins[1].count++;
        else if (score < 60) bins[2].count++;
        else if (score < 80) bins[3].count++;
        else bins[4].count++;
    });

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number; name: string }[] }) => {
        if (active && payload && payload.length) {
        return (
            <div className="glass rounded-lg px-3 py-2 text-sm">
            <p className="font-semibold">{payload[0].name || payload[0].value}</p>
            <p className="text-muted-foreground">{payload[0].value} transactions</p>
            </div>
        );
        }
        return null;
    };

    return (
        <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-2xl p-6"
        >
            <h3 className="text-lg font-semibold mb-6">Fraud Distribution</h3>
            <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                >
                    {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-fraud" />
                <span className="text-sm text-muted-foreground">
                Fraud ({fraudCount.toLocaleString()})
                </span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-safe" />
                <span className="text-sm text-muted-foreground">
                Non-Fraud ({nonFraudCount.toLocaleString()})
                </span>
            </div>
            </div>
        </motion.div>

        {/* Histogram */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass rounded-2xl p-6"
        >
            <h3 className="text-lg font-semibold mb-6">Risk Score Distribution</h3>
            <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bins} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis
                    dataKey="range"
                    tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(222, 20%, 18%)" }}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
                    axisLine={{ stroke: "hsl(222, 20%, 18%)" }}
                    tickLine={false}
                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "hsl(222, 20%, 18%)" }}
                />
                <Bar
                    dataKey="count"
                    fill="hsl(210, 100%, 52%)"
                    radius={[4, 4, 0, 0]}
                />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </motion.div>
        </div>
    );
};

export default FraudCharts;