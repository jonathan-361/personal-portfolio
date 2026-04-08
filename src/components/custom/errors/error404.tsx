import ErrorSVG from "@/assets/svg/Error404.svg";

import { Button } from "@/components/ui/button";

export const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2DEDF] px-8">
      <div className="flex flex-col items-center justify-center gap-8 max-w-md">
        <img src={ErrorSVG} alt="Error 404" className="w-96 h-96 drop-white-lg" />
        
            La página que buscas no existe o ha sido movida. 
            Verifica la URL o vuelve a la página principal.
      
        <Button>
          Volver Atrás
        </Button>
      </div>
    </div>
  );
};