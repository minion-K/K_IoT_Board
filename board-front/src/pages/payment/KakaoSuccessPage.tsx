import { paymentApi } from "@/apis/payment/payment.api";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const KakaoSuccessPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pgToken = params.get("pg_token");
    const orderId = params.get("orderId");
    const productCode = params.get("productCode");
    const productName = params.get("productName");
    const amount = params.get("amount");

    console.log("Success Params:", {
      pgToken,
      orderId,
      productCode,
      productName,
      amount,
    });

    if (!pgToken || !orderId || !productCode || !productName || !amount) {
      alert("필수 파라미터 누락");
      navigate("/pay");
      return;
    }

    const tid = localStorage.getItem("kakao_tid");
    if (!tid) {
      alert("tid 정보 누락");
      navigate("/pay");
      return;
    }

    (async () => {
      try {
        const res = await paymentApi.approvePayment({
          tid,
          pgToken,
          orderId,
          method: "KAKAO_PAY",
          productCode,
          productName,
          amount: Number(amount),
        });

        alert("KakaoPay 결제가 완료되었습니다.");
        console.log(res);

        // 사용 후 삭제
        localStorage.removeItem("kakao_tid");

        navigate("/payments/me");
      } catch (e) {
        console.error(e);
        alert("KakaoPay 결제 승인 오류");
        navigate("/pay");
      }
    })();
  }, [params, navigate]);

  return <div>KakaoPay 결제를 승인 처리 중입니다...</div>;
};

export default KakaoSuccessPage;
