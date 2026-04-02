import { Button } from "@/components/ui/button";
import { CloudOff, ArrowLeft, Home } from "lucide-react";

export const Error503 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl space-y-6">
          {/* Encabezado con icono */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-cyan-600/20 p-4 rounded-full mb-4">
              <CloudOff className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
              503
            </h1>
            <p className="text-sm text-slate-400 font-medium">SERVICIO NO DISPONIBLE</p>
          </div>

          {/* Descripción del error */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-slate-100">
              Servidor temporalmente fuera de servicio
            </h2>
            <p className="text-slate-300 leading-relaxed">
              El servidor está temporalmente no disponible, posiblemente debido a mantenimiento o sobrecarga. 
              Por favor intenta más tarde cuando el servicio se haya restablecido.
            </p>
          </div>

          {/* Consejos */}
          <div className="bg-slate-900/50 rounded-lg p-4 mb-8 border border-slate-700">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-slate-100">💡 Sugerencia: </span>
              Recarga la página en unos minutos. Estamos mejorando el servicio.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver atrás
            </Button>
            <Button className="w-full bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Ir al inicio
            </Button>
          </div>

          {/* Pie de página */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-xs text-slate-500">
              Gracias por tu paciencia mientras mejoramos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
