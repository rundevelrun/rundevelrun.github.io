# rundevelrun.github.io — Claude 작업 가이드

## 프로젝트 개요
- Gatsby 5 + React 18 기반 개인 블로그
- 소스 브랜치: `gatsby` / 배포 브랜치: `main` (GitHub Pages)
- 도메인: `rundevelrun.com`
- 배포 명령: `npm run deploy` (gatsby 브랜치에서 실행)

## 배포 시 주의사항
- **반드시 사용자 확인 후 배포할 것** — 먼저 커밋/push 후 배포 여부를 물어본다
- npm install 시 peer dependency 오류 발생하면 `--legacy-peer-deps` 옵션 사용
- gatsby build 실패 시 `npx playwright install chromium` 먼저 실행

## 블로그 포스트 작성 규칙

### 파일 위치
```
contents/posts/YYYY-MM-DD-slug.md
```

### 프론트매터 형식
```yaml
---
emoji: "이모지"
title: "제목"
date: YYYY-MM-DD HH:MM:SS +0900
update: YYYY-MM-DD HH:MM:SS +0900
tags:
  - tag1
  - tag2
series: "시리즈명 (선택)"
description: "설명 (선택)"
---
```

- `date`와 `update`는 최초 작성 시 현재 시각으로 설정 (`date` 명령으로 확인)
- 이후 수정 시에는 `update`만 변경

### 글 스타일
- 구어체, 간결한 문장
- 섹션 제목: `## 이모지 제목`
- 소제목: `#### ***소제목***`
- 환경 정보는 `> - 항목` 형식의 인용구로
- 코드 블록에는 언어 명시
- 마지막 섹션은 `## 👋`로 마무리

### 예시 구조
```markdown
## ☀️ 환경
> - OS 버전
> - 클라이언트 환경

## ✋ 들어가며
간단한 도입부

## 🔧 섹션명
설명

#### ***소제목***
```bash
명령어
```

## 👋
```

## 주요 설정 파일
- `blog-config.js` — 블로그 제목, 설명, siteUrl, AdSense 설정
- `gatsby-config.js` — Gatsby 플러그인 설정 (pathPrefix 없음)
- `static/CNAME` — `rundevelrun.com`
