# Directional 프론트엔드 코딩 테스트

## 프로젝트 개요

---

- 실행환경: node: v20.19.4
- 기술 스택
  - 프레임워크: React.js v19.2.0
    - 소규모 프로젝트로 Next.JS 불필요하다고 판단
  - 타입검사: TypeScript v5
  - 스타일: TailwindCSS v4 + DaisyUI v5
  - 유효성검사: react-hook-form + @hookform/resolvers + zod
  - 데이터시각화: recharts
  - 기타
    - 날짜 제어: date-fns, react-day-picker
    - 데이터 그리드: ag-grid-react
    - 상태 관리: zustand(무의식적으로, 설치하고 한 번도 안 씀)
- 주요 구현 기능
  - 로그인 / 로그아웃
  - 게시판
    - 게시글 작성(태그 항목 제외) / 조회 / 수정 / 삭제
    - 무한스크롤
      - AG-Grid에서 지원하는 무한스크롤 기능에 맞춰 개발
    - 검색, 정렬, 필터
  - 데이터 시각화
    - 아래 엔드포인트 구현 완료
      - /mock/top-coffee-brands → 바 차트, 도넛 차트 두 가지
      - /mock/popular-snack-brands → 바 차트, 도넛 차트 두 가지
      - /mock/weekly-mood-trend → 스택형 바 차트, 스택형 면적(Stacked Bar/Area) 차트 두 가지
      - /mock/weekly-workout-trend → 스택형 바 차트, 스택형 면적(Stacked Bar/Area) 차트 두 가지
- 디자인 패턴
  - 앱라우트 페이지 MVVM 패턴 정의
    - `consts`: 상수 모음 [M]
    - `interfaces`: 모델 모음 [M]
      - 서버-프론트 사이드 타입 통일
      - 가끔 편의 상 type 사용
    - `schemas`: 유효성 검사 모델 모음 [M]
    - `page.ts`: 화면 [V]
    - `components`: `page.ts` 구성요소를 여러 컴포넌트로 분리한 경우, 자식 컴포넌트가 위치 [V]
    - `styles`: CSS 모듈 스타일 모음 폴더 [V] - 본 프로젝트에서는 규모 상 생략
    - `hooks.ts` : 클라이언트 사이드에서 실행되는 공통 훅들이 위치 [VM]
    - `utils` : 공통으로 사용되는 주요 유틸 함수 등이 위치

---

## 미구현 항목

- 게시글 작성
  - 태그 항목 입력 제어 기능(컴마 또는 공백 기준으로 해시태그 자동 완성)
  - 금칙어 필터: 기능은 작동하나, 오류 메시지가 안 뜸
- 데이터시각화
  - 멀티라인 차트
