import ErrorSVG from "@/assets/svg/Error502.svg";

import { Button } from "@/components/ui/button";

export const Error502 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2DEDF] px-8">
      <div className="flex flex-col items-center justify-center gap-8 max-w-md">
        <img src={ErrorSVG} alt="Error 502" className="w-96 h-96 drop-white-lg" />
        
            Ups… hubo un problema al cargar esta página. Intenta de nuevo en unos segundos.
      
        <Button>
          Volver Atrás
        </Button>
      </div>
    </div>
  );
};
