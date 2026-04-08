import ErrorSVG from "@/assets/svg/Error503.svg";

import { Button } from "@/components/ui/button";

export const Error503 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2DEDF] px-8">
      <div className="flex flex-col items-center justify-center gap-8 max-w-md">
        <img src={ErrorSVG} alt="Error 503" className="w-96 h-96 drop-white-lg" />
        
            El servicio no está disponible en este momento. 
            Por favor, inténtalo de nuevo más tarde.
      
        <Button>
          Volver Atrás
        </Button>
      </div>
    </div>
  );
};
