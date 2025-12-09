// src/pages/TossFailPage.tsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const TossFailPage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const message = params.get("message") ?? "결제가 실패했습니다.";

  return (
    <div style={{ padding: 24 }}>
      <h2>Toss 결제 실패</h2>
      <p>{message}</p>
      <button onClick={() => navigate("/pay")}>다시 시도</button>
    </div>
  );
};

export default TossFailPage;
