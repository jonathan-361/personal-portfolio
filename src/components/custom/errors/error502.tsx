import errorImg from "@/assets/svg/Error502.svg?react";
import { ErrorLayout } from "@/components/custom/ErrorLayout";

interface ErrorProps {
  onBack?: () => void;
}

const Error502 = ({ onBack }: ErrorProps) => {
  return (
    <ErrorLayout
      image={errorImg}
      title="Solicitud Incorrecta"
      message="Ups… hubo un problema al cargar esta página. Intenta de nuevo en unos segundos."
      onBack={onBack}
    />
  );
};

export default Error502;