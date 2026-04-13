import errorImg from "@/assets/svg/Error401.svg?react";
import { ErrorLayout } from "@/components/custom/ErrorLayout";

interface ErrorProps {
  onBack?: () => void;
}

const Error401 = ({ onBack }: ErrorProps) => {
  return (
    <ErrorLayout
      image={errorImg}
      title="Solicitud Incorrecta"
      message="No tienes permiso para acceder a este recurso. Verifica que hayas iniciado sesión con las credenciales correctas."
      onBack={onBack}
    />
  );
};

export default Error401;
