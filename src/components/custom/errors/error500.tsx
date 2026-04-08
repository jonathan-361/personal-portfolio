import ErrorSVG from "@/assets/svg/Error500.svg";

import { Button } from "@/components/ui/button";

export const Error500 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2DEDF] px-8">
      <div className="flex flex-col items-center justify-center gap-8 max-w-md">
        <img src={ErrorSVG} alt="Error 500" className="w-96 h-96 drop-white-lg" />
        
            Ha ocurrido un error interno en el servidor. 
            Por favor, inténtalo de nuevo más tarde.
      
        <Button>
          Volver Atrás
        </Button>
      </div>
    </div>
  );
};
