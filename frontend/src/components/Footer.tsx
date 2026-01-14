import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Shield } from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-12 border-t border-border relative">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
            >
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                <p className="font-bold text-lg">FraudShield</p>
                <p className="text-sm text-muted-foreground">By Harsh Karekar</p>
                </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-muted-foreground text-center font-medium italic"
            >
                "Detecting Fraud Before It Costs You."
            </motion.p>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4"
            >
                <a
                href="https://github.com/HarshK0103"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-300"
                aria-label="GitHub"
                >
                <Github className="w-5 h-5" />
                </a>
                <a
                href="https://www.linkedin.com/in/harsh-karekar-01h6910a04/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-300"
                aria-label="LinkedIn"
                >
                <Linkedin className="w-5 h-5" />
                </a>
                <a
                href="mailto:hkarekar0103@gmail.com"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-300"
                aria-label="Email"
                >
                <Mail className="w-5 h-5" />
                </a>
            </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground"
            >
            <p>© {new Date().getFullYear()} FraudShield. Machine Learning Project.</p>
            </motion.div>
        </div>
        </footer>
    );
};

export default Footer;