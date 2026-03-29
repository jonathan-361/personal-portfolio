import { Button } from "@/components/ui/button";
import { Wrench, ArrowLeft, Home } from "lucide-react";

export const Error501 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl space-y-6">
          {/* Encabezado con icono */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-orange-600/20 p-4 rounded-full mb-4">
              <Wrench className="w-12 h-12 text-orange-400" />
            </div>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 mb-2">
              501
            </h1>
            <p className="text-sm text-slate-400 font-medium">NO IMPLEMENTADO</p>
          </div>

          {/* Descripción del error */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-slate-100">
              Funcionalidad no disponible
            </h2>
            <p className="text-slate-300 leading-relaxed">
              El servidor no soporta la funcionabilidad requerida para completar tu solicitud. 
              Esta característica podría estar en desarrollo o no estar implementada.
            </p>
          </div>

          {/* Consejos */}
          <div className="bg-slate-900/50 rounded-lg p-4 mb-8 border border-slate-700">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-slate-100">💡 Sugerencia: </span>
              Prueba con una alternativa o espera a que se implemente esta funcionalidad.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
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
              Para más información, contacta con soporte
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
