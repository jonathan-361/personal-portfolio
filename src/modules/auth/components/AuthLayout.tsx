import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTH_THEME } from "@/modules/core/data/theme.modules";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  imageUrl?: string;
  contentPosition?: "left" | "right";
  variant: "login" | "register"; // Nueva prop para el tema
}

export const AuthLayout = ({
  title,
  children,
  imageUrl,
  contentPosition = "left",
  variant,
}: AuthLayoutProps) => {
  const isContentLeft = contentPosition === "left";
  const theme = AUTH_THEME[variant]; // Obtenemos el borde y brillo

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0a]">
      <Card
        className={`w-full max-w-4xl overflow-hidden bg-black/50 border-gray-800 backdrop-blur-sm transition-all duration-500 ${theme.border} ${theme.glow}`}
      >
        <div className="grid md:grid-cols-2 min-h-[550px] items-stretch">
          <div
            className={`${isContentLeft ? "order-1" : "order-2"} p-10 flex flex-col justify-center`}
          >
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-3xl font-extrabold text-center text-white tracking-tight">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">{children}</CardContent>
          </div>

          <div
            className={`${isContentLeft ? "order-2" : "order-1"} hidden md:flex relative overflow-hidden`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
