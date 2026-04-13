import errorImg from "@/assets/svg/Error501.svg?react";
import { ErrorLayout } from "@/components/custom/ErrorLayout";

interface ErrorProps {
  onBack?: () => void;
}

const Error501 = ({ onBack }: ErrorProps) => {
  return (
    <ErrorLayout
      image={errorImg}
      title="Solicitud Incorrecta"
      message="El servidor no puede procesar la solicitud en este momento. Por favor, inténtalo de nuevo más tarde."
      onBack={onBack}
    />
  );
};

export default Error501;
