import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

interface ErrorLayoutProps {
  image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title?: string;
  message: string;
  altText?: string;
  onBack?: () => void;
  resetPath?: string;
}

export const ErrorLayout = ({
  image: ErrorImage,
  title,
  message,
  onBack,
  resetPath,
}: ErrorLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    if (resetPath) {
      navigate(resetPath, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E2DEDF] px-8">
      <div className="flex flex-col items-center justify-center gap-6 max-w-md text-center">
        <ErrorImage className="drop-shadow-xl" aria-label="Error Icon" />
        <div className="space-y-2">
          {title && (
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          )}
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
        <Button
          onClick={handleBack}
          className="bg-gray-800 hover:bg-gray-700 text-white px-8"
        >
          Volver Atrás
        </Button>
      </div>
    </div>
  );
};
