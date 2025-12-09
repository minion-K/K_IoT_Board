// 결제 수단
export type PaymentMethod = "MOCK" | "TOSS_PAY" | "KAKAO_PAY";

// 결제 생성 요청
export interface PaymentCreateRequest {
  productCode: string;
  productName: string;
  amount: number;
  method: PaymentMethod;
}

// 결제 승인 요청
export interface PaymentApproveRequest {
  // TOSS_PAY
  paymentKey?: string;
  orderId?: string;
  amount?: number;

  // KAKAO_PAY
  tid?: string;
  pgToken?: string;

  // 공통
  method: PaymentMethod;
  productCode: string;
  productName: string;
}

// 환불 요청
export interface PaymentRefundRequest {
  amount: number;
  reason?: string;
}

// 백엔드 결제 응답
export interface PaymentResponse {
  id: number;
  orderId: string;
  paymentKey: string;
  amount: number;
  method: PaymentMethod;
  status: "READY" | "SUCCESS" | "FAILED" | "CANCELLED" | "REFUNDED";
  productCode: string;
  productName: string;
  userPointBalance: number;
  requestedAt: string;
  approvedAt: string | null;
}

// 카카오페이 Ready 응답
export interface KakaoReadyResponse {
  tid: string;
  next_redirect_pc_url: string;
  next_redirect_mobile_url: string;
  next_redirect_app_url: string;
  created_at: string;

  // 🔥 서버에서 추가로 내려줘야 하는 필드
  orderId: string; // 결제 고유 주문번호
  productCode: string; // 프론트 입력 상품코드
  productName: string; // 프론트 입력 상품명
  amount: number; // 결제 금액
}
