# 한자리 프론트엔드 프로젝트

> 대학교 동아리 관리 플랫폼 "한자리"의 프론트엔드 프로젝트입니다.

## 기술 스택 (Updated)

### 핵심 기술

-   **React 18.2**
-   **TypeScript 5.7**
-   **Vite 6** + **Tailwind v4 플러그인**
-   **Yarn** (패키지 매니저)

### 스타일링 (Transitioning)

-   **Tailwind CSS v4** (신규 스타일링 표준)
-   **class-variance-authority (cva)** (컴포넌트 변형 관리)
-   **clsx & tailwind-merge** (클래스 병합 유틸리티)
-   **Styled-components 6** (레거시 - 점진적 제거 대상)

---

### 상태 관리

-   **Recoil** - 원자적 상태 관리
-   **recoil-persist** - localStorage 기반 상태 영속성
-   **TanStack Query (React Query) 5** - 서버 상태 관리 및 캐싱

### 스타일링

-   **Styled-components 6** - CSS-in-JS(레거시)
-   **Swiper 12** - 캐러셀/슬라이더

### API 통신

-   **Axios** - HTTP 클라이언트 (JWT Bearer 토큰 인증)
-   **swagger-typescript-api** - API 타입 자동 생성

### 라우팅

-   **React Router DOM 7** - 클라이언트 사이드 라우팅

### 기타

-   **PWA** (vite-plugin-pwa) - 프로그레시브 웹 앱 지원
-   **ESLint 9** + **Prettier** - 코드 품질 관리

---

## 프로젝트 구조

```
/src
├── /api                    # API 통신 관련
│   ├── axiosInstance.ts    # Axios 인스턴스 + 인터셉터 설정
│   ├── apiRequest.ts       # 통합 API 요청 함수
│   ├── data-contracts.ts   # API 응답 타입 (자동 생성)
│   └── http-client.ts      # HTTP 클라이언트 (자동 생성)
│
├── /components             # 재사용 가능한 컴포넌트
│   ├── /Common             # 공통 UI 컴포넌트 (Button, InputField, Card, Modal 등)
│   ├── /ClubDetail         # 동아리 상세 페이지 컴포넌트
│   ├── /AdminClubDetail    # 관리자 동아리 상세 컴포넌트
│   ├── /ClubRegister       # 동아리 등록 컴포넌트
│   ├── /Search             # 검색 관련 컴포넌트
│   ├── /ActivityLog        # 활동 로그 컴포넌트
│   ├── /UnionNotice        # 총동연 공지 컴포넌트
│   ├── /Main               # 메인 페이지 섹션 컴포넌트
│   └── /ServiceAdmin       # 서비스 관리자 컴포넌트
│
├── /config                 # 설정 파일
│   ├── queryClient.ts      # React Query 클라이언트 설정
│   └── theme.ts            # 디자인 시스템 테마 (색상 팔레트)
│
├── /constants              # 상수 정의
│   ├── index.ts            # 상수 내보내기
│   ├── navigations.ts      # 네비게이션 데이터
│   ├── errorMessage.ts     # 에러 메시지 매핑
│   ├── DEFAULT_IMG.ts      # 기본 이미지 경로
│   └── MAX_FILE_SIZE.ts    # 파일 크기 제한
│
├── /contexts               # React Context
│   ├── ClubIntroContext.tsx      # 동아리 소개 컨텍스트
│   └── ActivityLogContext.tsx    # 활동 로그 컨텍스트
│
├── /hooks                  # Custom Hooks
│   ├── /queries            # React Query 훅
│   │   ├── useClubList.ts  # 동아리 목록 쿼리 (무한 스크롤)
│   │   ├── /club-detail/   # 동아리 상세 관련 쿼리
│   │   └── /main/          # 메인 페이지 쿼리
│   ├── /actions            # 상태 변경 훅 (useToast, useToggle 등)
│   ├── /auth               # 인증 관련 훅
│   ├── /handler            # 이벤트 핸들러 훅
│   └── /contexts           # Context 접근 훅
│
├── /pages                  # 페이지 컴포넌트
│   ├── /admin/             # 관리자 페이지
│   │   ├── /auth/          # 로그인, 회원가입
│   │   ├── /club/          # 동아리 관리
│   │   ├── /service/       # 서비스 관리 (관리자 전용)
│   │   └── /union/         # 총동연 관리
│   ├── /main/              # 메인 페이지
│   ├── /club-detail/       # 동아리 상세 페이지
│   └── /club-search/       # 동아리 검색 페이지
│
├── /routes                 # 라우팅 설정
│   ├── Routes.tsx          # 라우트 정의
│   ├── AuthGuard.tsx       # 인증 보호 (로그인 필요)
│   ├── ClubAdminGurad.tsx  # 동아리 관리자 권한 보호
│   ├── ServiceAdminGuard.tsx # 서비스 관리자 권한 보호
│   └── paths.ts            # 라우트 경로 상수
│
├── /store                  # Recoil 상태
│   ├── authState.ts        # 인증 상태 (isAuthenticated, adminType)
│   ├── clubInfoState.ts    # 동아리 정보 상태
│   └── toast.ts            # 토스트 알림 상태
│
├── /styles                 # 전역/공유 스타일
│   ├── button.ts           # 버튼 스타일
│   ├── registration-form.ts # 등록 폼 공통 스타일
│   └── admin-club-detail/  # 관리자 상세 페이지 스타일
│
├── /types                  # TypeScript 타입 정의
│   ├── api.types.ts        # API 관련 타입
│   ├── club.types.ts       # 동아리 관련 타입
│   ├── admin.types.ts      # 관리자 관련 타입
│   └── *.types.ts          # 도메인별 타입 파일
│
├── /utils                  # 유틸리티 함수
│   ├── apiRequest.ts       # API 요청 헬퍼
│   ├── tokenHandler.ts     # 토큰 관리 (get/set/remove)
│   ├── inputChangeHandler.ts # 입력 변경 핸들러 (제네릭)
│   ├── getErrorMessage.ts  # 에러 메시지 조회
│   ├── dateFormatHandler.ts # 날짜 포맷 처리
│   └── uploadImageWithPreview.ts # 이미지 업로드 미리보기
│
├── App.tsx                 # 앱 루트 컴포넌트
└── main.tsx                # 진입점
```

---

## 코드 스타일 가이드

### 네이밍 컨벤션

| 대상          | 규칙                           | 예시                                      |
| ------------- | ------------------------------ | ----------------------------------------- |
| 컴포넌트 파일 | PascalCase                     | `Button.tsx`, `ClubCard.tsx`              |
| 훅 파일       | camelCase + use 접두사         | `useToast.ts`, `useClubList.ts`           |
| 유틸리티 파일 | camelCase                      | `tokenHandler.ts`, `dateFormatHandler.ts` |
| 타입 파일     | camelCase + .types.ts          | `club.types.ts`, `api.types.ts`           |
| 상수 파일     | camelCase 또는 SCREAMING_SNAKE | `navigations.ts`, `MAX_FILE_SIZE.ts`      |

### 컴포넌트 작성 패턴

```typescript
// 함수형 컴포넌트 + Props 인터페이스 패턴
import styled from 'styled-components';
import { ReactNode } from 'react';

// Props 인터페이스 정의
interface ButtonProps {
    children: ReactNode;
    size?: 'small' | 'medium' | 'large';
    variant?: 'filled' | 'outlined';
    onClick?: () => void;
}

// styled-components Props는 $ 접두사 사용 (transient props)
interface StyledButtonProps {
    $size: string;
    $variant: string;
}

// 컴포넌트 정의 (화살표 함수)
const Button = ({
    children,
    size = 'medium',
    variant = 'filled',
    onClick,
}: ButtonProps) => {
    return (
        <StyledButton $size={size} $variant={variant} onClick={onClick}>
            {children}
        </StyledButton>
    );
};

// styled-component 정의
const StyledButton = styled.button<StyledButtonProps>`
    // 스타일 정의
`;

export default Button;
```

### Import 순서

```typescript
// 1. React 및 외부 라이브러리
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

// 2. 타입 import
import { ClubType, ClubStatus } from '@/types/club.types';

// 3. 컴포넌트 import
import Button from '@/components/Common/Button';
import { InputField } from '@/components/Common';

// 4. 훅 import
import useClubList from '@/hooks/queries/useClubList';
import { useToast } from '@/hooks/actions/useToast';

// 5. 유틸리티/상수 import
import { inputChangeHandler } from '@/utils/inputChangeHandler';
import { DEFAULT_IMG } from '@/constants';

// 6. 스타일 import
import { Wrapper, Title } from './styles';
```

### TypeScript 패턴

```typescript
// 제네릭 활용 예시
interface IHandleInputChange<T> {
    e: React.ChangeEvent<HTMLInputElement>;
    setInputValue: React.Dispatch<React.SetStateAction<T>>;
}

const inputChangeHandler = <T>({ e, setInputValue }: IHandleInputChange<T>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
};

// API 응답 타입
interface APIResponse<T> {
    result: T;
    code: string;
    isSuccess: boolean;
    message: string;
}
```

---

## 주요 패턴 및 규칙

### API 통신

```typescript
// apiRequest 함수 사용 (requireToken으로 인증 토큰 자동 추가)
const response = await apiRequest({
    url: '/api/clubs',
    method: 'GET',
    requireToken: true, // JWT 토큰 자동 첨부
});

// React Query 훅 패턴
const { data, isLoading } = useQuery({
    queryKey: ['clubs', clubId],
    queryFn: () => apiRequest({ url: `/api/clubs/${clubId}` }),
});
```

### 상태 관리 (Recoil)

```typescript
// Atom 정의 (recoil-persist로 localStorage 영속성)
const authState = atom({
    key: 'authState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

// Selector로 읽기 전용 접근
const authSelector = selector({
    key: 'authSelector',
    get: ({ get }) => get(authState),
});
```

### 에러 처리

```typescript
// useErrorHandler 훅 사용
const { handleError } = useErrorHandler();

try {
    await apiRequest({ url: '/api/clubs', method: 'POST', data });
} catch (error) {
    handleError(error); // 상태 코드별 토스트 메시지 표시
}
```

### 라우트 가드

```typescript
// 인증이 필요한 라우트
<Route path="/admin" element={<AuthGuard />}>
    <Route path="/admin/club/:id" element={<ClubAdminGurad />}>
        {/* 동아리 관리자 전용 라우트 */}
    </Route>
</Route>
```

---

## 개발 명령어

```bash
# 개발 서버 실행
yarn run dev

# 프로덕션 빌드
yarn run build

# 린트 검사
yarn run lint

# API 타입 자동 생성 (Swagger 문서 기반)
yarn run generate-api

# PWA 아이콘 생성
yarn run gen-pwa
```

---

## Prettier 설정

```json
{
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 4,
    "trailingComma": "all",
    "printWidth": 80
}
```

---

## 테마 색상

```typescript
// config/theme.ts
colors: {
    mainBlue: '#33639C',      // 메인 브랜드 색상
    subGreen: '#8BB421',      // 서브 색상 (녹색)
    subOrange: '#F08A00',     // 서브 색상 (주황)
    mainBlack: '#232323',     // 본문 텍스트
    mainGray: '#606060',      // 보조 텍스트
    red: '#DC5151',           // 에러/경고
}
```

---

## Tailwind v4 작업 원칙

-   **CSS-first 설정:** `tailwind.config.js` 대신 전역 CSS 파일(`src/index.css` 등)의 `@theme` 블록을 사용한다.
-   **디자인 사양:** 스타일 수치는 반드시 Figma MCP (`figma-remote-mcp`)를 통해 조회한 값을 우선한다.
-   **Styled-components 제거:** 리팩토링 대상 컴포넌트에서 모든 Styled-components를 제거하고 Tailwind 클래스로 대체한다.

## Tailwind v4 및 디자인 시스템 (중요)

-   **디자인 토큰 우선순위:** 기존 `config/theme.ts` 대신 Figma MCP를 통해 가져온 최신 디자인 토큰을 `src/index.css`의 `@theme`에 정의하여 사용한다.
-   **폰트 적용:** 사용자가 설정한 `@font-face` 규칙을 기반으로 Tailwind 테마 내에 `font-family`를 구성한다.
-   **자동화:** 새로운 컴포넌트 리팩토링 시, 필요한 컬러나 간격이 `@theme`에 없다면 Figma에서 찾아 즉시 추가한다.

## 주의사항

1. **API 타입 수정 금지**: `data-contracts.ts`, `http-client.ts`는 자동 생성 파일이므로 직접 수정하지 않습니다. `npm run generate-api`로 재생성하세요.

2. **styled-components transient props**: HTML에 전달되지 않아야 하는 props는 `$` 접두사를 사용합니다 (예: `$size`, `$variant`).

3. **토큰 관리**: `tokenHandler.ts`의 함수를 사용하여 accessToken을 관리합니다. 직접 localStorage에 접근하지 마세요.

4. **에러 처리**: API 호출 시 `useErrorHandler` 훅을 사용하여 일관된 에러 처리를 적용합니다.

5. **파일 크기 제한**: 이미지 업로드 시 `MAX_FILE_SIZE` (0.5MB) 제한을 확인합니다.

## 🛠️ 리팩토링 및 작업 원칙 (중요)

### 1. 디자인 토큰 및 테마 관리

-   **Figma First:** 스타일 수치는 반드시 Figma MCP (`figma-remote-mcp`)를 통해 조회한 값을 우선한다.
-   **CSS-first 설정:** 모든 디자인 토큰(Color, Spacing 등)은 `src/index.css`의 `@theme` 블록에 정의한다.
-   **토큰 강제:** 기존 `theme.ts`의 값보다 Figma에서 실시간으로 추출한 최신 토큰 값을 우선 적용한다.

### 2. 컴포넌트 작성 패턴 (Tailwind v4)

-   **cn 유틸리티 사용:** 클래스 병합 시 반드시 `src/utils/cn.ts`의 `cn()` 함수를 사용한다.
-   **변형 관리:** 다양한 상태를 가진 컴포넌트는 `cva`를 사용하여 정의한다.
-   **Styled-components 해체:** 리팩토링 대상 파일에서는 Styled-components를 완전히 제거하고 표준 태그 + Tailwind 클래스로 치환한다.

## 코드 스타일 가이드 (신규 패턴 예시)

### Tailwind v4 + CVA 패턴

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-main-blue text-white hover:bg-main-blue/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
);
---
```
