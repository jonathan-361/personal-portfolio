import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface ChangePasswordCardProps {
  children: React.ReactNode;
  viewKey: string;
  onBack?: () => void;
  isLoading?: boolean;
}

export function ChangePasswordCard({
  children,
  viewKey,
  onBack,
  isLoading = false,
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
          <Card className="relative border-none bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
            {onBack && (
              <div className="pt-4 pl-4">
                <button
                  onClick={onBack}
                  disabled={isLoading}
                  type="button"
                  className={`flex items-center text-sm font-medium transition-colors group ${
                    isLoading
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <ChevronLeft
                    className={`h-4 w-4 mr-1 transition-transform ${!isLoading && "group-hover:-translate-x-0.5"}`}
                  />
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
