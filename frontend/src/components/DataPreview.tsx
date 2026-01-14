import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";

interface DataPreviewProps {
    data: Record<string, string | number>[];
    columns: string[];
    }

    const DataPreview = ({ data, columns }: DataPreviewProps) => {
    if (!data || data.length === 0) return null;

    const displayColumns = columns.slice(0, 8);
    const displayData = data.slice(0, 5);

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass rounded-2xl p-6"
        >
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Data Preview</h3>
            <span className="text-sm text-muted-foreground font-mono">
            Showing first 5 of {data.length} rows
            </span>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
            <Table>
            <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                {displayColumns.map((col) => (
                    <TableHead key={col} className="text-muted-foreground font-mono text-xs">
                    {col}
                    </TableHead>
                ))}
                {columns.length > 8 && (
                    <TableHead className="text-muted-foreground font-mono text-xs">
                    +{columns.length - 8} more
                    </TableHead>
                )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayData.map((row, idx) => (
                <TableRow key={idx} className="border-border hover:bg-secondary/30">
                    {displayColumns.map((col) => (
                    <TableCell key={col} className="font-mono text-sm">
                        {typeof row[col] === "number"
                        ? (row[col] as number).toFixed(4)
                        : String(row[col] || "-")}
                    </TableCell>
                    ))}
                    {columns.length > 8 && (
                    <TableCell className="text-muted-foreground">...</TableCell>
                    )}
                </TableRow>
                ))}
            </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        </motion.div>
    );
};

export default DataPreview;