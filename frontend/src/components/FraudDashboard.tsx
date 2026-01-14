import axios from "axios";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import DataPreview from "./DataPreview";
import FileUpload from "./FileUpload";
import FraudCharts from "./FraudCharts";
import ResultsMetrics from "./ResultsMetrics";
import ResultsTable, { TransactionResult } from "./ResultsTable";

const FraudDashboard = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [rawData, setRawData] = useState<Record<string, string | number>[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<TransactionResult[] | null>(null);
    const [summary, setSummary] = useState<{
        totalTransactions: number;
        fraudulentCount: number;
        fraudPercentage: number;
        avgRiskScore: number;
        } | null>(null);


    const parseCSV = (
        text: string
    ): { data: Record<string, string | number>[]; columns: string[] } => {
        const lines = text.trim().split("\n");
        if (lines.length < 2) {
        throw new Error("CSV file is empty or has no data rows");
        }

        const headers = lines[0]
        .split(",")
        .map((h) => h.trim().replace(/"/g, ""));

        const data = lines.slice(1).map((line) => {
        const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
        const row: Record<string, string | number> = {};
        headers.forEach((header, i) => {
            const numVal = parseFloat(values[i]);
            row[header] = isNaN(numVal) ? values[i] : numVal;
        });
        return row;
        });

        return { data, columns: headers };
    };


    const handleFileSelect = useCallback(async (file: File) => {
        setError(null);
        setResults(null);

        if (!file.name.endsWith(".csv")) {
        setError("Please upload a valid CSV file");
        return;
        }

        try {
        const text = await file.text();
        const { data, columns: cols } = parseCSV(text);

        if (data.length === 0) {
            setError("The CSV file contains no data rows");
            return;
        }

        setSelectedFile(file);
        setRawData(data);
        setColumns(cols);
        } catch {
        setError("Failed to parse CSV file. Please check the format.");
        }
    }, []);


    const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        }
        );

        const backendResults = response.data;

        const predictions = backendResults.predictions;

        const mappedResults: TransactionResult[] = predictions.map(
        (row: any, idx: number) => ({
            id: idx + 1,
            fraudProbability: row["Fraud Probability (%)"],
            anomalyScore: row["Anomaly Score (%)"],
            hybridRiskScore: row["Hybrid Risk Score (%)"],
            prediction: row["Prediction"] === 1 ? "Fraud" : "Non-Fraud",
            amount: row["Amount"],
            time: row["Time"],
        })
        );

        const avgRisk =
        mappedResults.reduce((sum, r) => sum + r.hybridRiskScore, 0) /
        mappedResults.length;

        setResults(mappedResults);

        setSummary({
        totalTransactions: backendResults.summary.total_transactions,
        fraudulentCount: backendResults.summary.predicted_frauds,
        fraudPercentage: backendResults.summary.fraud_percentage,
        avgRiskScore: avgRisk,
        });


        } catch (err) {
            console.error(err);
            setError(
            "Fraud analysis failed. Please ensure the backend is running and the CSV format is correct."
            );
        } finally {
            setIsLoading(false);
        }
        };



    const handleDownload = () => {
        if (!results) return;

        const headers = [
        "ID",
        "Amount",
        "Fraud Probability (%)",
        "Anomaly Score (%)",
        "Hybrid Risk Score (%)",
        "Prediction",
        ];

        const csvContent = [
        headers.join(","),
        ...results.map((r) =>
            [
            r.id,
            r.amount?.toFixed(2),
            r.fraudProbability.toFixed(2),
            r.anomalyScore.toFixed(2),
            r.hybridRiskScore.toFixed(2),
            r.prediction,
            ].join(",")
        ),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "fraudshield_results.csv";
        a.click();
        URL.revokeObjectURL(url);
    };


    const totalTransactions = results?.length || 0;
    const fraudulentCount =
        results?.filter((r) => r.prediction === "Fraud").length || 0;
    const fraudPercentage =
        totalTransactions > 0
        ? (fraudulentCount / totalTransactions) * 100
        : 0;
    const avgRiskScore =
        results?.reduce((sum, r) => sum + r.hybridRiskScore, 0) /
        (totalTransactions || 1) || 0;


    return (
        <section id="dashboard" className="py-24 relative">
        <div className="container mx-auto px-6">
            {/* Section Header */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
            >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fraud Analysis <span className="text-gradient">Dashboard</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Upload your transaction data and get instant fraud risk assessment
            </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
            {/* File Upload */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass rounded-2xl p-6 md:p-8"
            >
                <FileUpload
                onFileSelect={handleFileSelect}
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                selectedFile={selectedFile}
                rowCount={rawData.length || null}
                error={error}
                />
            </motion.div>

            {/* Data Preview */}
            {rawData.length > 0 && !results && (
                <DataPreview data={rawData} columns={columns} />
            )}

            {/* Results */}
            {results && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
                >
                <ResultsMetrics
                    totalTransactions={totalTransactions}
                    fraudulentCount={fraudulentCount}
                    fraudPercentage={fraudPercentage}
                    avgRiskScore={avgRiskScore}
                />

                <FraudCharts results={results} />

                <ResultsTable results={results} onDownload={handleDownload} />
                </motion.div>
            )}
            </div>
        </div>
        </section>
    );
};

export default FraudDashboard;