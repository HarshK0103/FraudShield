import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState } from "react";

export interface TransactionResult {
    id: number;
    fraudProbability: number;
    anomalyScore: number;
    hybridRiskScore: number;
    prediction: "Fraud" | "Non-Fraud";
    amount?: number;
    time?: number;
}

    interface ResultsTableProps {
    results: TransactionResult[];
    onDownload: () => void;
}

const ROWS_PER_PAGE = 10;

const ResultsTable = ({ results, onDownload }: ResultsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(results.length / ROWS_PER_PAGE);
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const displayedResults = results.slice(startIndex, startIndex + ROWS_PER_PAGE);

    const getScoreColor = (score: number) => {
        if (score >= 70) return "text-fraud";
        if (score >= 40) return "text-warning";
        return "text-safe";
    };

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-2xl overflow-hidden"
        >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
            <h3 className="text-lg font-semibold">Analysis Results</h3>
            <p className="text-sm text-muted-foreground">
                {results.length.toLocaleString()} transactions analyzed
            </p>
            </div>
            <Button
            onClick={onDownload}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
            <Download className="w-4 h-4 mr-2" />
            Download CSV
            </Button>
        </div>

        {/* Table */}
        <ScrollArea className="w-full">
            <Table>
            <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold">ID</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Amount</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">
                    Fraud Prob.
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">
                    Anomaly Score
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">
                    Hybrid Risk
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">
                    Prediction
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayedResults.map((result) => (
                <TableRow
                    key={result.id}
                    className={`border-border transition-colors ${
                    result.prediction === "Fraud"
                        ? "bg-fraud/5 hover:bg-fraud/10"
                        : "hover:bg-secondary/30"
                    }`}
                >
                    <TableCell className="font-mono text-sm">#{result.id}</TableCell>
                    <TableCell className="font-mono text-sm">
                    ${result.amount?.toFixed(2) || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                    <span className={`font-mono font-semibold ${getScoreColor(result.fraudProbability)}`}>
                        {result.fraudProbability.toFixed(1)}%
                    </span>
                    </TableCell>
                    <TableCell className="text-center">
                    <span className={`font-mono font-semibold ${getScoreColor(result.anomalyScore)}`}>
                        {result.anomalyScore.toFixed(1)}%
                    </span>
                    </TableCell>
                    <TableCell className="text-center">
                    <span className={`font-mono font-semibold ${getScoreColor(result.hybridRiskScore)}`}>
                        {result.hybridRiskScore.toFixed(1)}%
                    </span>
                    </TableCell>
                    <TableCell className="text-center">
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        result.prediction === "Fraud"
                            ? "bg-fraud/20 text-fraud"
                            : "bg-safe/20 text-safe"
                        }`}
                    >
                        {result.prediction === "Fraud" ? (
                        <AlertTriangle className="w-3 h-3" />
                        ) : (
                        <CheckCircle2 className="w-3 h-3" />
                        )}
                        {result.prediction}
                    </span>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + ROWS_PER_PAGE, results.length)} of{" "}
            {results.length}
            </p>
            <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-border"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-2">
                {currentPage} / {totalPages}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-border"
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
            </div>
        </div>
        </motion.div>
    );
};

export default ResultsTable;