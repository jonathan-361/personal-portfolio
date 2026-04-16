import errorImg from "@/assets/svg/Error400.svg?react";
import { ErrorLayout } from "@/components/custom/ErrorLayout";

interface ErrorProps {
  onBack?: () => void;
}

const Error400 = ({ onBack }: ErrorProps) => {
  return (
    <ErrorLayout
      image={errorImg}
      title="Solicitud Incorrecta"
      message="La solicitud que enviaste contiene datos inválidos o incorrectos."
      onBack={onBack}
    />
  );
};

export default Error400;