import { Clock, Building2, Calendar, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/modules/experiences/models/experience.model";
import { formatDate } from "@/lib/formatters"; // Asumiendo que existe o usa new Date().toLocaleDateString()

interface ViewExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  exp: Experience | null;
}

export function ViewExperienceModal({
  isOpen,
  onClose,
  exp,
}: ViewExperienceModalProps) {
  if (!exp) return null;

  const isCurrent = !exp.end_date;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150 bg-black border-gray-800 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] focus:outline-none overflow-hidden">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between pr-8">
            <Badge
              variant="outline"
              className={`uppercase tracking-widest text-[10px] px-3 py-1 border-opacity-50 ${
                isCurrent
                  ? "border-blue-500 text-blue-400 bg-blue-500/10"
                  : "border-gray-500 text-gray-400 bg-gray-500/10"
              }`}
            >
              {isCurrent ? "Actualidad" : "Finalizado"}
            </Badge>

            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {formatDate(exp.start_date)} —{" "}
                {exp.end_date ? formatDate(exp.end_date) : "Presente"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-2xl font-bold leading-tight pr-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-blue-500" />
              {exp.position}
            </DialogTitle>
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              <Building2 className="w-4 h-4" />
              <span>{exp.company}</span>
            </div>
          </div>

          <DialogDescription className="sr-only">
            Detalles de la experiencia profesional
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 border-t border-gray-900 pt-6">
          <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-4">
              Descripción y Logros
            </h4>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words text-base">
              {exp.description ||
                "No se proporcionó una descripción para esta experiencia."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
