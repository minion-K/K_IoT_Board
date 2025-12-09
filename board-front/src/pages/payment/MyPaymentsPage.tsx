import { paymentApi } from "@/apis/payment/payment.api";
import React, { useEffect, useState } from "react";
import type { PaymentResponse } from "@/types/payment/payment.dto";

const MyPaymentsPage: React.FC = () => {
  const [list, setList] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await paymentApi.getMyPayments(); // ★ res.data.data 반환됨
      setList(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRefund = async (payment: PaymentResponse) => {
    const input = window.prompt(
      `환불 금액을 입력하세요 (최대 ${payment.amount}원)`,
      String(payment.amount)
    );
    if (!input) return;

    const amount = Number(input);
    if (!amount || amount <= 0 || amount > payment.amount) {
      alert("잘못된 금액입니다.");
      return;
    }

    const reason = window.prompt("환불 사유를 입력하세요 (선택)", "");

    try {
      await paymentApi.refundPayment(payment.id, {
        amount,
        reason: reason ?? "",
      });
      alert("환불이 처리되었습니다.");
      load();
    } catch (e) {
      console.error(e);
      alert("환불 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h1>내 결제 내역</h1>
      <table width="100%" border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>상품</th>
            <th>금액</th>
            <th>수단</th>
            <th>상태</th>
            <th>요청일</th>
            <th>환불</th>
          </tr>
        </thead>
        <tbody>
          {list.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.productName}</td>
              <td>{p.amount.toLocaleString()}원</td>
              <td>{p.method}</td>
              <td>{p.status}</td>
              <td>{p.requestedAt}</td>
              <td>
                {p.status === "SUCCESS" ? (
                  <button onClick={() => handleRefund(p)}>환불</button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {list[0] && (
        <p style={{ marginTop: 12 }}>
          현재 포인트 잔액: {list[0].userPointBalance.toLocaleString()} P
        </p>
      )}
    </div>
  );
};

export default MyPaymentsPage;
