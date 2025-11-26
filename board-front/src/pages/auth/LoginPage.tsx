import { authApi } from "@/apis/auth/auth.api";
import { publicApi } from "@/apis/common/axiosInstance";
import { userApi } from "@/apis/user/user.api";
import { SocialLoginButtons } from "@/components/SocialLoginButtons";
import { useAuthStore } from "@/stores/auth.store";
import type { UserLoginForm } from "@/types/user/user.type";
import { getErrorMessage } from "@/utils/error";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// 로그인 페이지
function LoginPage() {
  //% === HOOKS === //
  const [form, setForm] = useState<UserLoginForm>({
    username: "",
    password: "",
  });

  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 페이지 이동 훅
  const navigate = useNavigate();

  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);

  //% === EVENT HANDLER === //
  //! 입력 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //! fetch (react-query: Mutation)
  const loginMutation = useMutation({ // react-qeury의 useMutation으로 로그인 요청 정의
    mutationFn: async () => {         // 실제로 실행될 비동기 함수 정의
      const res = await authApi.loginApi(form);

      if(!res || !res.data) {
        throw new Error ("로그인 정보가 올바르지 않습니다.");
      }
      
      // accessToken 저장
      setAccessToken(res.data?.accessToken);

      // me 조회
      const me = await userApi.me();

      if (!me.success || !me.data) {
        throw new Error("유저 정보 조회 실패: 데이터가 없습니다.");
      }

      setUser(me.data);

    },

    onSuccess: () => {  // mutationFn이 에러 없이 성공했을 때 실행되는 콜백
      navigate("/");
    },

    onError: (err: any) => {  // mutationFn 실행 중 에러가 발생했을 때 호출되는 콜백
        setErrorMessage(getErrorMessage(err, "로그인에 실패했습니다."))
    }
  });

  /*
  ! 로그인 처리
  : 백엔드에 username/password로 로그인 요청
  - 성공하면 accessToken 저장
  - /me API 호출하여 사용자 정보 가져오기
  - 사용자 정보 저장 후 메인 페이지로 이동
  */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if(!form.username || !form.password) {
      setErrorMessage("아이디와 비밀번호를 입력해주세요");
      return;
    }

    loginMutation.mutate();
  };

  return (
    <div>
      <h1>로그인</h1>

      {/* 로컬 로그인 폼 */}
      <form onSubmit={handleSubmit}>
        <label>
          아이디
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" >
          {}
        </button>
      </form>

      {/* 에러 메시지 */}
      

      {/* 소셜 로그인 버튼 */}
      <SocialLoginButtons />

      <div style={{ marginTop: 16 }}>
        <Link to="/register">회원가입 | </Link>
        <Link to="/forgot-password">비밀번호 재설정</Link>
      </div>
    </div>
  );
}

export default LoginPage;
