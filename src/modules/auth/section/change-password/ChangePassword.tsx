import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { ChangePasswordCard } from "@/modules/auth/components/ChangePasswordCard";
import { StepEmail } from "@/modules/auth/section/change-password/StepEmail";
import { StepResetPassword } from "@/modules/auth/section/change-password/StepResetPassword";

import { passwordService } from "@/modules/core/services/auth-services/password.services";
import { getErrorMessage } from "@/modules/core/error/handle.error";
import paths from "@/modules/core/routes/paths/path";

import type { ForgotPasswordFormData } from "@/modules/auth/schemas/forgot.password";
import type { ResetPasswordFormData } from "@/modules/auth/schemas/reset.password";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const toastIdRef = useRef<string | number | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
    };
  }, []);

  const handleBack = () => {
    abortControllerRef.current?.abort();
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }

    step === "otp" ? setStep("email") : navigate(-1);
  };

  const onSendEmail = async (data: ForgotPasswordFormData) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    const toastId = toast.loading("Enviando código de verificación...");
    toastIdRef.current = toastId;

    try {
      const response = await passwordService.forgotPassword(
        data,
        abortControllerRef.current.signal,
      );

      toast.success(response.message || "Código enviado a tu correo", {
        id: toastId,
      });

      toastIdRef.current = null;
      setStep("otp");
    } catch (error) {
      const message = getErrorMessage(error);

      if (message === "CANCELED_BY_USER") {
        toast.dismiss(toastId);
        return;
      }

      toast.error(message, { id: toastId });
      toastIdRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  const onResetPassword = async (data: ResetPasswordFormData) => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    const toastId = toast.loading("Actualizando contraseña...");
    toastIdRef.current = toastId;

    try {
      const response = await passwordService.resetPassword(
        data,
        abortControllerRef.current.signal,
      );

      toast.success(response.message || "Contraseña restablecida con éxito", {
        id: toastId,
      });

      toastIdRef.current = null;
      navigate(paths.login, { replace: true });
    } catch (error) {
      const message = getErrorMessage(error);

      if (message === "CANCELED_BY_USER") {
        toast.dismiss(toastId);
        return;
      }

      toast.error(message, { id: toastId });
      toastIdRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChangePasswordCard
      viewKey={step}
      onBack={handleBack}
      isLoading={isLoading}
    >
      {step === "email" ? (
        <StepEmail onSubmit={onSendEmail} isLoading={isLoading} />
      ) : (
        <StepResetPassword onSubmit={onResetPassword} isLoading={isLoading} />
      )}
    </ChangePasswordCard>
  );
}
