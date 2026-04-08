import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { ChangePasswordCard } from "@/modules/auth/components/ChangePasswordCard";
import { StepEmail } from "@/modules/auth/section/change-password/StepEmail";
import { StepResetPassword } from "@/modules/auth/section/change-password/StepResetPassword";

import { passwordService } from "@/modules/core/services/auth-services/password.services";
import paths from "@/modules/core/routes/paths/path";
import type { ForgotPasswordFormData } from "@/modules/auth/schemas/forgot_password";
import type { ResetPasswordFormData } from "@/modules/auth/schemas/reset_password";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    step === "otp" ? setStep("email") : navigate(-1);
  };

  const onSendEmail = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Enviando código...");
    try {
      await passwordService.forgotPassword(data);
      toast.success("Código enviado a tu correo", { id: toastId });
      setStep("otp");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error al enviar el correo",
        { id: toastId },
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Validando datos...");
    try {
      const payload = { ...data, token: Number(data.token) };
      await passwordService.resetPassword(payload as any);
      toast.success("Contraseña restablecida con éxito", { id: toastId });
      navigate(paths.login);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Código inválido o expirado",
        { id: toastId },
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChangePasswordCard viewKey={step} onBack={handleBack}>
      {step === "email" ? (
        <StepEmail onSubmit={onSendEmail} isLoading={isLoading} />
      ) : (
        <StepResetPassword onSubmit={onResetPassword} isLoading={isLoading} />
      )}
    </ChangePasswordCard>
  );
}
