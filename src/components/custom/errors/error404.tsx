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
      message="La página que buscas no existe o ha sido movida. Verifica la URL o vuelve a la página principal."
      onBack={onBack}
    />
  );
};

export default Error404;
