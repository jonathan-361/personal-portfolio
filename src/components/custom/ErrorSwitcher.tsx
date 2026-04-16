import { useErrorStore } from "@/modules/core/store/error.store";
import Error400 from "@/components/custom/errors/error400";
import Error403 from "@/components/custom/errors/error403";
import Error404 from "@/components/custom/errors/error404";
import Error500 from "@/components/custom/errors/error500";

export const ErrorSwitcher = () => {
  const { statusCode, clearError } = useErrorStore();

  if (!statusCode) return null;
  const handleBack = () => {
    clearError();
  };

  switch (statusCode) {
    case 400:
      return <Error400 onBack={handleBack} />;
    case 403:
      return <Error403 onBack={handleBack} />;
    case 404:
      return <Error404 onBack={handleBack} />;
    case 500:
      return <Error500 onBack={handleBack} />;
    default:
      return <Error500 onBack={handleBack} />;
  }
};
