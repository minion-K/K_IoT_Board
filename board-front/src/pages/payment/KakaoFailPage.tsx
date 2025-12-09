// src/pages/KakaoFailPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const KakaoFailPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <h2>KakaoPay 결제 실패/취소</h2>
      <p>결제가 취소되었거나 실패했습니다.</p>
      <button onClick={() => navigate("/pay")}>다시 시도</button>
    </div>
  );
};

export default KakaoFailPage;
