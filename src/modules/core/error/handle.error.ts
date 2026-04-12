// @/modules/core/error/handle.error.ts
import axios, { AxiosError } from "axios";
import { ERROR_MESSAGES } from "@/modules/core/constants/error.messages";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isCancel(error)) {
    return "CANCELED_BY_USER";
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      const url = error.config?.url?.toLowerCase() || "";

      const serverMessage = data?.message || data?.error;

      if (Array.isArray(serverMessage)) return serverMessage[0];
      if (typeof serverMessage === "string" && serverMessage.length > 0)
        return serverMessage;

      if (url.includes("auth/reset-password") && status === 400)
        return ERROR_MESSAGES.AUTH.INVALID_CODE;

      if (url.includes("auth/forgot-password") && status === 404)
        return ERROR_MESSAGES.AUTH.EMAIL_NOT_FOUND;

      switch (status) {
        case 400:
          return ERROR_MESSAGES.GENERIC.INVALID_DATA;
        case 401:
          return ERROR_MESSAGES.AUTH.SESSION_EXPIRED;
        case 404:
          return ERROR_MESSAGES.GENERIC.NOT_FOUND;
        case 500:
          return ERROR_MESSAGES.GENERIC.SERVER_ERROR;
        default:
          return "Ocurrió un error inesperado.";
      }
    }
    return ERROR_MESSAGES.GENERIC.NETWORK_ERROR;
  }
  return error instanceof Error ? error.message : "Error desconocido.";
};
