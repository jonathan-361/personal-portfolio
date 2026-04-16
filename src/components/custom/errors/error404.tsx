import errorImg from "@/assets/svg/Error404.svg?react";
import { ErrorLayout } from "@/components/custom/ErrorLayout";

interface ErrorProps {
  onBack?: () => void;
}

const Error404 = ({ onBack }: ErrorProps) => {
  return (
    <ErrorLayout
      image={errorImg}
      title="Solicitud Incorrecta"
      message="¡Oh! La página que buscas no existe o ha sido movida."
      onBack={onBack}
    />
  );
};

export default Error404;
