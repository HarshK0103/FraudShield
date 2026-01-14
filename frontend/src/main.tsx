import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Index from "./pages/Index";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
    }

    createRoot(rootElement).render(
    <StrictMode>
        <Index />
    </StrictMode>
);