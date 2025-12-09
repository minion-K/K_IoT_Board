/* eslint-disable @typescript-eslint/no-explicit-any */
import { paymentApi } from "@/apis/payment/payment.api";
import type {
  PaymentMethod,
  KakaoReadyResponse,
} from "@/types/payment/payment.dto";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY as string;

const PaymentPage: React.FC = () => {
  const [form, setForm] = useState({
    productCode: "P-001",
    productName: "테스트 상품",
    amount: 1000,
    method: "MOCK" as PaymentMethod,
  });

  const navigate = useNavigate();

  const updateForm = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* -----------------------------
   * 1) MOCK 결제
   * ----------------------------- */
  const handleMockPay = async () => {
    try {
      const res = await paymentApi.createPayment({
        ...form,
        method: "MOCK",
      });

      alert("Mock 결제가 완료되었습니다.");
      console.log("Mock Payment:", res);
      navigate("/payments/me");
    } catch (e) {
      console.error(e);
      alert("Mock 결제 오류");
    }
  };

  /* -----------------------------
   * 2) KakaoPay 결제 (Ready → Redirect)
   * ----------------------------- */
  const handleKakaoPay = async () => {
    try {
      const res = await paymentApi.createPayment({
        ...form,
        method: "KAKAO_PAY",
      });

      const data = res as KakaoReadyResponse;
      console.log("Kakao Ready Response:", data);

      const redirectUrl = data.next_redirect_pc_url;

      // 🔥 tid만 저장
      localStorage.setItem("kakao_tid", data.tid);

      // 카카오 결제창 이동
      window.location.href = redirectUrl;
    } catch (e) {
      console.error(e);
      alert("KakaoPay 결제 준비 중 오류 발생");
    }
  };

  /* -----------------------------
   * 3) TossPayments 결제
   * ----------------------------- */
  const handleTossPay = async () => {
    if (!(window as any).TossPayments) {
      alert("TossPayments SDK 로드 오류");
      return;
    }

    const tossPayments = (window as any).TossPayments(TOSS_CLIENT_KEY);
    const orderId = crypto.randomUUID();
    const origin = window.location.origin;

    const successUrl = new URL("/pay/toss/success", origin);
    successUrl.searchParams.set("orderId", orderId);
    successUrl.searchParams.set("amount", String(form.amount));
    successUrl.searchParams.set("productCode", form.productCode);
    successUrl.searchParams.set("productName", form.productName);

    const failUrl = `${origin}/pay/toss/fail`;

    try {
      await tossPayments.requestPayment("카드", {
        amount: form.amount,
        orderId,
        orderName: form.productName,
        successUrl: successUrl.toString(),
        failUrl,
      });
    } catch (e: any) {
      console.error(e);
      alert("Toss 결제 오류: " + (e.message ?? ""));
    }
  };

  /* -----------------------------
   * 결제 수단별 처리
   * ----------------------------- */
  const onClickPay = () => {
    if (form.method === "MOCK") return handleMockPay();
    if (form.method === "KAKAO_PAY") return handleKakaoPay();
    if (form.method === "TOSS_PAY") return handleTossPay();
  };

  return (
    <div style={{ maxWidth: 480, margin: "40px auto" }}>
      <h1>결제 데모</h1>

      <div>
        <label>
          상품 코드
          <input
            value={form.productCode}
            onChange={(e) => updateForm("productCode", e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          상품명
          <input
            value={form.productName}
            onChange={(e) => updateForm("productName", e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          금액
          <input
            type="number"
            value={form.amount}
            onChange={(e) => updateForm("amount", Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          결제 수단
          <select
            value={form.method}
            onChange={(e) =>
              updateForm("method", e.target.value as PaymentMethod)
            }
          >
            <option value="MOCK">Mock 결제</option>
            <option value="TOSS_PAY">Toss 결제</option>
            <option value="KAKAO_PAY">KakaoPay</option>
          </select>
        </label>
      </div>

      <button onClick={onClickPay} style={{ marginTop: 16 }}>
        결제하기
      </button>

      <button
        style={{ marginTop: 16, marginLeft: 8 }}
        onClick={() => navigate("/payments/me")}
      >
        내 결제 내역 보기
      </button>
    </div>
  );
};

export default PaymentPage;
