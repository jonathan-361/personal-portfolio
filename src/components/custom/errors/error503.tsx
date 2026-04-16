import errorImg from "@/assets/svg/Error503.svg?react";
import { ErrorLayout } from "@/components/custom/ErrorLayout";

interface ErrorProps {
  onBack?: () => void;
}

const Error503 = ({ onBack }: ErrorProps) => {
  return (
    <ErrorLayout
      image={errorImg}
      title="Solicitud Incorrecta"
      message="El servicio no está disponible en este momento. Por favor, inténtalo de nuevo más tarde."
      onBack={onBack}
    />
  );
};

export default Error503;