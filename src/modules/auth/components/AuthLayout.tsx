import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
  backgroundColor?: string;
  imageUrl?: string;
  contentPosition?: "left" | "right";
}

export const AuthLayout = ({
  title,
  children,
  backgroundColor = "bg-slate-900",
  imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  contentPosition = "left",
}: AuthLayoutProps) => {
  const isContentLeft = contentPosition === "left";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${backgroundColor}`}
    >
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
        {/* 🔥 CLAVE: altura mínima */}
        <div className="grid md:grid-cols-2 min-h-[500px] items-stretch">
          {/* CONTENIDO */}
          <div
            className={`${
              isContentLeft ? "order-1" : "order-2"
            } p-8 flex flex-col justify-center`}
          >
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold text-center">
                {title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-4">{children}</CardContent>
          </div>

          {/* IMAGEN */}
          <div
            className={`${
              isContentLeft ? "order-2" : "order-1"
            } hidden md:flex`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            >
              {/* overlay opcional */}
              <div className="w-full h-full bg-black/30" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
