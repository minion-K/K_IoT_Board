// src/hooks/payment/useCreatePayment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "@/apis/payment/payment.api";
import type {
  KakaoReadyResponse,
  PaymentCreateRequest,
} from "@/types/payment/payment.dto";
import { PAYMENT_KEYS } from "@/query/payment.keys";
import type { PaymentResponse } from "@/types/payment/payment.dto";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PaymentResponse | KakaoReadyResponse,
    Error,
    PaymentCreateRequest
  >({
    mutationFn: (body) => paymentApi.createPayment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENT_KEYS.myList });
    },
  });
};
