import { useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/modules/core/services/user-services/user.services";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import Loading from "@/components/custom/Loading";

export function DeleteAccountDialog() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await userService.deleteAccount();
      toast.success("Cuenta eliminada permanentemente");

      setTimeout(() => {
        authService.logout();
      }, 1500);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Error al eliminar la cuenta";
      toast.error(msg);
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isDeleting &&
        createPortal(
          <Loading isFullPage={true} className="z-[10000]" />,
          document.body,
        )}

      <AlertDialog>
        {/* CORRECCIÓN 1: Usar render para evitar <button> dentro de <button> */}
        <AlertDialogTrigger
          render={
            <Button
              type="button"
              variant="destructive"
              className="w-full md:w-auto bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 transition-all gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar mi cuenta
            </Button>
          }
        />

        <AlertDialogContent className="bg-[#050505] border border-red-500/30 border-t-4 border-t-red-600 shadow-[0_0_50px_-12px_rgba(220,38,38,0.25)] p-6 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/[0.05] to-transparent pointer-events-none" />

          <AlertDialogHeader className="relative z-10 border-none">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <AlertDialogTitle className="text-white text-xl">
                ¿Estás absolutamente seguro?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-400">
              Esta acción no se puede deshacer. Se borrarán tus notas, tareas y
              toda tu información personal de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="relative z-10 mt-8 bg-transparent border-none p-0 flex flex-col sm:flex-row gap-3">
            {/* CORRECCIÓN 2: También en el botón de Cancelar */}
            <AlertDialogCancel
              disabled={isDeleting}
              render={
                <Button
                  variant="ghost"
                  className="m-0 sm:flex-1 bg-white/5 border-gray-800 text-gray-400 hover:bg-gray-900 hover:text-white transition-all rounded-xl h-10"
                />
              }
            >
              Cancelar
            </AlertDialogCancel>

            {/* CORRECCIÓN 3: En el botón de Acción (Eliminar) */}
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              render={
                <Button className="m-0 sm:flex-1 bg-red-600 hover:bg-red-700 text-white border-none transition-all shadow-lg shadow-red-600/20 rounded-xl h-10" />
              }
            >
              Sí, eliminar cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
