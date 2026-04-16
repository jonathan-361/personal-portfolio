import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormField from "@/components/custom/FormField";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/modules/auth/schemas/forgot.password";

interface StepEmailProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  isLoading: boolean;
}

export function StepEmail({ onSubmit, isLoading }: StepEmailProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 cursor-not-allowed bg-transparent" />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-6 pt-2 space-y-6 transition-opacity duration-200 ${
          isLoading ? "opacity-60" : "opacity-100"
        }`}
        noValidate
        autoComplete="off"
      >
        <div>
          <h2 className="text-xl font-bold mb-2 text-slate-800">
            Recuperar contraseña
          </h2>
          <p className="text-sm text-muted-foreground">
            Ingresa tu correo para recibir el código de verificación.
          </p>
        </div>

        <FormField
          label="Correo electrónico"
          type="email"
          placeholder="ejemplo@correo.com"
          error={errors.email?.message}
          disabled={isLoading}
          {...register("email")}
        />

        <Button type="submit" className="w-full h-10" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar código"}
        </Button>
      </form>
    </div>
  );
}
