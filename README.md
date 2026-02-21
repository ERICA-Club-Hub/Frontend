## 1. Setting

```bash
# Install package
yarn install

# Run dev server
yarn dev

# Build project
yarn build

## Run Production Preview
yarn preview
```

<br> <br>

## 2. Branch Convention

### **브랜치 네이밍 규칙**

> -   **형식**  
>      `[이슈번호]-[작업내용]` (3-4 단어로 작업 내용을 간결히 표현)  
>      ex) `14-admin-login-ui`

<br>

### **브랜치 종류**

-   **main**: 서비스 운영용 브랜치 (프로덕션 코드)
-   **develop**: 배포 전 개발 및 통합 브랜치
-   **feature**: 기능 단위 구현
    -   예: `14-admin-login-ui`
-   **refactor**: 코드 리팩토링
    -   예: `20-refactor-authentication`
-   **hotfix**: 배포 버전 버그 수정
    -   예: `27-hotfix-login`

<br> <br>

## 3. 폴더구조

```
root/
├── .claude/               # [Tool] Claude Agent 프롬프트 (리팩토링, 마이그레이션 가이드)
├── .github/               # [CI/CD] PR 템플릿 및 워크플로우
├── public/                # [Static] 정적 리소스
├── scripts/               # [Automation] 빌드/배포 보조 스크립트 (sitemap 생성 등)
│
├── src/
│   ├── api/               # axios 인스턴스, swagger 타입 정의
│   ├── assets/            # 정적 이미지
│   ├── components/        # 디자인 시스템 및 공통 아토믹 컴포넌트 (Button, InputField)
│   ├── constants/         # 전역 상수
│   ├── domains/           # [Domain Layer] 비즈니스 도메인별 모듈 분리
│   │   ├── club/
│   │   │   └── registration/   # (nested) 하위 도메인 폴더링
│   │   ├── search/
│   │   │   ├── api/            # api 함수 정의, query key 관리
│   │   │   ├── ui/             # 도메인 로직이 포함된 UI 컴포넌트
│   │   │   ├── model/          # 상태 관리 및 비즈니스 로직 훅
│   │   │   ├── lib/            # 도메인 전용 라이브러리 설정 및 어댑터
│   │   │   └── types/          # 도메인 전용 타입 정의
│   │   ├── ...
│   │   └── shared/             # 도메인 간 공유되는 비즈니스 모듈
│   │       ├── components/
│   │       ├── layout/
│   │       ├── hooks/
│   │       └── utils/
│   │
│   ├── hooks/             # 전역 커스텀 훅
│   ├── pages/             # 도메인 모듈을 조합하여 페이지 구성
│   ├── routes/            # 페이지 라우팅 및 Guard 설정
│   ├── types/             # 전역 유틸리티 타입 (Nullable, APIResponse)
│   └── utils/             # 순수 헬퍼 함수 (dateFormatter, validators)
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
└── tsconfig.json
```

<br> <br>

## 4. Commit Convention

### **커밋 메시지 규칙**

-   커밋 메시지는 작업의 성격을 명확히 나타내기 위해 **타입**을 사용합니다.
    > -   **형식**  
    >     `[타입]: 작업 내용 (#이슈번호)`

<br>

### **커밋 타입**

-   feat: 기능 구현 또는 새로운 기능 추가
-   fix: 버그 및 오류 수정
-   setting: 빌드수행, 패키지 설치, 환경 설정 수정 등
-   style: CSS 파일 위주의 UI 작업
-   docs: README.md 작성, 주석 작성 등 문서 관련 작업
-   refactor: 코드 리팩토링 (기능 변화 없이 코드 개선)
-   chore: 기타 작업

<br>

### **커밋 메시지 작성 예시**

```bash
feat: 어드민 로그인 UI 구현 (#14)
```
