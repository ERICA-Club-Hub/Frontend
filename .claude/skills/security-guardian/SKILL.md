---
name: security-guardian
description: 프론트엔드 보안 취약점을 방어하고 안전한 코딩 패턴을 적용합니다. XSS 방지, 안전한 외부 링크 처리, 데이터 검증이 포함됩니다.
---

# Security Guardian

코드를 생성하거나 리팩토링할 때 다음 보안 수칙을 반드시 준수하세요.

1. **XSS 방어**:
    - `dangerouslySetInnerHTML`은 절대 사용하지 않습니다.
    - 부득이한 경우 반드시 `dompurify` 등의 라이브러리로 살균 처리된 데이터만 사용함을 명시하세요.
2. **안전한 외부 링크**:
    - `target="_blank"` 속성을 사용하는 모든 `<a>` 태그에는 `rel="noopener noreferrer"`를 필수로 추가합니다.
3. **입력값 검증**:
    - 사용자 입력(Form, Input)을 처리할 때 적절한 타입 체크와 유효성 검사 로직을 포함합니다.
4. **민감 정보 노출 방지**:
    - API 키나 개인정보가 `console.log`에 남지 않도록 하며, 환경 변수는 `.env`를 통하도록 유도합니다.
