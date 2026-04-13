import errorImg from "@/assets/svg/Error500.svg?react";
import { ErrorLayout } from "@/components/custom/ErrorLayout";

interface ErrorProps {
  onBack?: () => void;
}

const Error500 = ({ onBack }: ErrorProps) => {
  return (
    <ErrorLayout
      image={errorImg}
      title="Solicitud Incorrecta"
      message="Ha ocurrido un error interno en el servidor. Por favor, inténtalo de nuevo más tarde."
      onBack={onBack}
    />
  );
};

export default Error500;
