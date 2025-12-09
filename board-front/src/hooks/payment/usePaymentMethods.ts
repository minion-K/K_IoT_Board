import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "@/apis/payment/payment.api";
import type { PaymentMethod } from "@/types/payment/payment.dto";

export const usePaymentMethods = () => {
  return useQuery<PaymentMethod[]>({
    queryKey: ["paymentMethods"],
    queryFn: () => paymentApi.getPaymentMethods(),
  });
};
