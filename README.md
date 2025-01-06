## 1. Setting

```bash
# Install package
npm install

# Run dev server
npm run dev

# Build project
npm build

## Run Production Preview
npm run preview
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
    -   네이밍 형식: `[이슈번호]-[작업내용]`
    -   예: `14-admin-login-ui`
-   **refactor**: 코드 리팩토링
    -   예: `20-refactor-authentication`
-   **hotfix**: 배포 버전 버그 수정
    -   예: `27-hotfix-login-error`

<br> <br>

## 3. 폴더구조

```
src/
├── api // api 호출 함수 관리
├── assets // 각종 이미지 소스 관리
├── components // 컴포넌트 관리
│   ├── Common // 공통 컴포넌트
│   └── index.ts // 공통 import 관리 파일
│       ...
├── config // 환경 설정 관리
├── constants // 전역 상수 관리
├── hooks // custom hook 관리
├── pages
│   └── admin
│   └── index // 공통 import 관리 파일
│       ...
├── store // 전역 상태 관리
├── types // 공유 타입 관리
├── utils // 각종 유틸 함수 관리
├── App.tsx // 페이지별 routing
├── index.css // 전역 css 관리
└── main.tsx
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
