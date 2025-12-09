// src/pages/TossSuccessPage.tsx
import { paymentApi } from "@/apis/payment/payment.api";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const TossSuccessPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const paymentKey = params.get("paymentKey");
    const orderId = params.get("orderId");
    const amount = params.get("amount");
    const productCode = params.get("productCode");
    const productName = params.get("productName");

    if (!paymentKey || !orderId || !amount || !productCode || !productName) {
      alert("필수 파라미터가 누락되었습니다.");
      navigate("/pay");
      return;
    }

    (async () => {
      try {
        const res = await paymentApi.approvePayment({
          paymentKey,
          orderId,
          amount: Number(amount),
          method: "TOSS_PAY",
          productCode,
          productName,
        });

        alert("Toss 결제가 완료되었습니다.");
        console.log(res);
        navigate("/payments/me");
      } catch (e) {
        console.error(e);
        alert("Toss 결제 승인 중 오류가 발생했습니다.");
        navigate("/pay");
      }
    })();
  }, [params, navigate]);

  return <div>Toss 결제를 승인 처리 중입니다...</div>;
};

export default TossSuccessPage;
