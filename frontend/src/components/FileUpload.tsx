import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, FileText, Upload } from "lucide-react";
import { useCallback, useState } from "react";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    onAnalyze: () => void;
    isLoading: boolean;
    selectedFile: File | null;
    rowCount: number | null;
    error: string | null;
}

const FileUpload = ({ onFileSelect, onAnalyze, isLoading, selectedFile, rowCount, error }: FileUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
        setIsDragging(true);
        } else if (e.type === "dragleave") {
        setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
        const file = files[0];
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
            onFileSelect(file);
        }
        }
    }, [onFileSelect]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
        onFileSelect(files[0]);
        }
    };

    return (
        <div className="space-y-6">
        {/* Upload Zone */}
        <motion.div
            className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-300 ${
            isDragging
                ? "border-primary bg-primary/5"
                : selectedFile
                ? "border-safe bg-safe/5"
                : "border-border hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
            />

            <AnimatePresence mode="wait">
            {selectedFile ? (
                <motion.div
                key="selected"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
                >
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-success flex items-center justify-center shadow-safe">
                    <CheckCircle2 className="w-8 h-8 text-safe-foreground" />
                </div>
                <div>
                    <p className="text-lg font-semibold text-foreground">{selectedFile.name}</p>
                    <p className="text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                    {rowCount !== null && ` • ${rowCount.toLocaleString()} transactions`}
                    </p>
                </div>
                </motion.div>
            ) : (
                <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
                >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                    <p className="text-lg font-semibold text-foreground">Drop your CSV file here</p>
                    <p className="text-muted-foreground">or click to browse</p>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
            {error && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-fraud/10 border border-fraud/30"
            >
                <AlertCircle className="w-5 h-5 text-fraud flex-shrink-0" />
                <p className="text-fraud text-sm">{error}</p>
            </motion.div>
            )}
        </AnimatePresence>

        {/* Required Columns Info */}
        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
                <p className="font-medium text-foreground mb-1">Required CSV Columns:</p>
                <p className="text-muted-foreground font-mono text-xs">
                Time, V1-V28, Amount (standard credit card transaction format)
                </p>
            </div>
            </div>
        </div>

        {/* Analyze Button */}
        <Button
            onClick={onAnalyze}
            disabled={!selectedFile || isLoading}
            size="lg"
            className="w-full gradient-primary text-primary-foreground font-semibold py-6 text-lg rounded-xl shadow-glow hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? (
            <span className="flex items-center gap-2">
                <motion.div
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Running Fraud Detection...
            </span>
            ) : (
            "Analyze Transactions"
            )}
        </Button>
        </div>
    );
    };

export default FileUpload;