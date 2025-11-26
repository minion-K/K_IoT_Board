//! global.tsx

import { css, Global } from "@emotion/react"

export const GlobalStyle = () => (
  <Global
    styles={css`
    /* 
    ! * 전체 선택자: 모든 요소 (실제 요소)
    > before, after - 해당 속성의 "가상 요소"는 해당 * 전체 선택자 속성에 포함되지 않음
    */
      *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body, #root {
        height: 100%;
      }

      body {
        font-family: Arial, Helvetica, sans-serif;
        background: #f8fafc;
        color: #111827;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul,li {
        list-style: none;
      }
      :root {
        --primary: #4f46e5;
        --sidebar-width: 220px;
        --header-height: 60px;
        --footer-height: 50px;
      }
      `}
  />

)