import ErrorSVG from "@/assets/svg/error400.svg";

import { Button } from "@/components/ui/button";

export const Error400 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2DEDF] px-8">
      <div className="flex flex-col items-center justify-center gap-8 max-w-md">
        <img src={ErrorSVG} alt="Error 400" className="w-96 h-96 drop-white-lg" />
        
            La solicitud que enviaste contiene datos inválidos o incorrectos. 
            Verifica que todos los campos estén completos y con el formato correcto.
      
        <Button>
          Volver Atrás
        </Button>
      </div>
    </div>
  );
};
