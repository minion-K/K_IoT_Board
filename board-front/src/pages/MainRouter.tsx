import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardListPage from "./board/BoardListPage";
import TossSuccessPage from "./payment/TossSuccessPage";
import TossFailPage from "./payment/TossFailPage";
import KakaoSuccessPage from "./payment/KakaoSuccessPage";
import KakaoFailPage from "./payment/KakaoFailPage";
import MyPaymentsPage from "./payment/MyPaymentsPage";
import PaymentPage from "./payment/PaymentPage";

function MainRouter() {
  return (
    <Routes>
      {/* 로그인 이후 게시판 라우터 */}
      <Route path="/board" element={<BoardListPage />} />

      <Route path="/pay" element={<PaymentPage />} />
      <Route path="/pay/toss/success" element={<TossSuccessPage />} />
      <Route path="/pay/toss/fail" element={<TossFailPage />} />
      <Route path="/pay/kakao/success" element={<KakaoSuccessPage />} />
      <Route path="/pay/kakao/fail" element={<KakaoFailPage />} />
      <Route path="/payments/me" element={<MyPaymentsPage />} />

      <Route path="*" element={<BoardListPage />} />
    </Routes>
  );
}

export default MainRouter;
