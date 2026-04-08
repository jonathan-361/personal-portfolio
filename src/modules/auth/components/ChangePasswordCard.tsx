import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface ChangePasswordCardProps {
  children: React.ReactNode;
  viewKey: string;
  onBack?: () => void; // Prop opcional para manejar el retroceso
}

export function ChangePasswordCard({
  children,
  viewKey,
  onBack,
}: ChangePasswordCardProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f4f7fb] p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={viewKey}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="border-none bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
            {/* Botón dinámico */}
            {onBack && (
              <div className="pt-4 pl-4">
                <button
                  onClick={onBack}
                  type="button"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors font-medium group"
                >
                  <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                  Volver
                </button>
              </div>
            )}
            {children}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
