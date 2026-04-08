import ErrorSVG from "@/assets/svg/Error401.svg";

import { Button } from "@/components/ui/button";

export const Error401 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2DEDF] px-8">
      <div className="flex flex-col items-center justify-center gap-8 max-w-md">
        <img src={ErrorSVG} alt="Error 401" className="w-96 h-96 drop-white-lg" />
        
            No tienes permiso para acceder a este recurso. 
            Verifica que hayas iniciado sesión con las credenciales correctas.
      
        <Button>
          Volver Atrás
        </Button>
      </div>
    </div>
  );
};