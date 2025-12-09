import type {
  PaymentCreateRequest,
  PaymentApproveRequest,
  PaymentRefundRequest,
  PaymentResponse,
  PaymentMethod,
  KakaoReadyResponse,
} from "@/types/payment/payment.dto";

import { privateApi } from "../common/axiosInstance";
import type { ResponseDto } from "@/types/common/ResponseDto";

export const paymentApi = {
  // 결제 생성 (Mock, KakaoReady)
  createPayment: async (body: PaymentCreateRequest) => {
    const res = await privateApi.post<
      ResponseDto<PaymentResponse | KakaoReadyResponse>
    >("/api/v1/payments", body);

    if (!res.data.data) {
      throw new Error("결제 생성 실패: 응답 데이터 없음");
    }
    return res.data.data;
  },

  // 결제 승인
  approvePayment: async (body: PaymentApproveRequest) => {
    const res = await privateApi.post<ResponseDto<PaymentResponse>>(
      "/api/v1/payments/approve",
      body
    );

    return res.data.data;
  },

  // 내 결제 목록 조회
  getMyPayments: async (): Promise<PaymentResponse[]> => {
    const res = await privateApi.get<ResponseDto<PaymentResponse[]>>(
      "/api/v1/payments/me"
    );
    return res.data.data ?? [];
  },

  // 결제 환불
  refundPayment: async (paymentId: number, body: PaymentRefundRequest) => {
    const res = await privateApi.post<ResponseDto<void>>(
      `/api/v1/payments/${paymentId}/refund`,
      body
    );

    if (!res.data.status) {
      throw new Error(res.data.message ?? "결제 환불 실패");
    }

    return;
  },

  // 결제 수단 조회
  getPaymentMethods: async () => {
    const res = await privateApi.get<ResponseDto<PaymentMethod[]>>(
      "/api/v1/payments/methods"
    );
    if (!res.data.data) {
      throw new Error("결제 생성 실패: 응답 데이터 없음");
    }
    return res.data.data;
  },
};
