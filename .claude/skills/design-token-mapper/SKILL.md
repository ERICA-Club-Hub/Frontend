---
name: design-token-mapper
description: Figma의 시각적 속성을 Tailwind v4 토큰으로 정확히 매핑합니다.
---

# Design Token Mapper

Figma 디자인을 분석할 때 다음 규칙으로 토큰을 매핑하세요.

## 색상 매핑

### Figma → Tailwind 변환 테이블

| Figma 색상             | Tailwind 클래스       | CSS 변수                        |
| ---------------------- | --------------------- | ------------------------------- |
| Primary Blue (#1264c4) | `bg-primary-500`      | `var(--color-primary-500)`      |
| Orange (#f08a00)       | `bg-sub-orange`       | `var(--color-sub-orange)`       |
| Badge Background       | `bg-badge-{color}-bg` | `var(--color-badge-{color}-bg)` |

### 불확실한 경우

1. 가장 가까운 기존 토큰을 찾음
2. 없다면 사용자에게 "이 색상(#xxx)에 대한 토큰이 없습니다. 추가가 필요한가요?" 질문

## 폰트 매핑

| Figma 스타일 | Tailwind 클래스 | 설명         |
| ------------ | --------------- | ------------ |
| 24px/600     | `.text-h1`      | 헤더         |
| 16px/600     | `.text-b2`      | Bold Body    |
| 14px/400     | `.text-b4`      | Regular Body |
| 12px/400     | `.text-c1`      | Caption      |

## 간격 매핑

-   Figma Auto Layout의 간격 → `gap-[n]` (n은 픽셀값)
-   Padding → `p-[n]` 또는 토큰 우선 (`p-4`, `p-6` 등)
