import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import FormField from "@/components/custom/FormField";
import Loading from "@/components/custom/Loading";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/modules/auth/schemas/reset.password";

interface StepResetPasswordProps {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  isLoading: boolean;
}

export function StepResetPassword({
  onSubmit,
  isLoading,
}: StepResetPasswordProps) {
  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: { token: "", newPassword: "", confirmPassword: "" },
  });

  return (
    <>
      {isLoading && <Loading isFullPage={true} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 pt-2 space-y-6"
        autoComplete="off"
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2 text-slate-800">
            Verificar código
          </h2>
          <p className="text-sm text-muted-foreground">
            Ingresa los 6 dígitos enviados a tu correo.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <Label className="mb-2 text-slate-700">Código de 6 dígitos</Label>
          <Controller
            control={control}
            name="token"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                inputMode="numeric"
                value={field.value}
                onChange={(val) => {
                  const onlyNums = val.replace(/\D/g, "");
                  field.onChange(onlyNums);
                  if (onlyNums.length === 6 && isSubmitted) trigger("token");
                }}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
          {isSubmitted && errors.token && (
            <p className="text-red-500 text-[10px] font-semibold mt-1 uppercase text-center">
              {errors.token.message}
            </p>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <FormField
            label="Nueva contraseña"
            type="password"
            placeholder="Crea una contraseña segura"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <FormField
            label="Confirmar contraseña"
            type="password"
            placeholder="Repite la contraseña"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" className="w-full h-10" disabled={isLoading}>
            Restablecer contraseña
          </Button>
        </div>
      </form>
    </>
  );
}
