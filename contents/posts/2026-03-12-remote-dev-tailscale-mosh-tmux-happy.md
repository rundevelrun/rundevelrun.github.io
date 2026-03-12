---
emoji: "📱"
title: "아이패드로 개발하기 — Tailscale + Mosh + Tmux + Happy Coder 원격 개발 환경 구축"
date: 2026-03-12 00:00:00 +0900
tags:
  - tailscale
  - mosh
  - tmux
  - rocky-linux
  - ipad
  - iphone
  - remote-development
  - termius
  - happy-coder
  - claude-code
series:
description: "아이패드와 아이폰으로 Rocky Linux 서버에 접속해서 개발하는 환경 구축기. Tailscale로 어디서든 접근하고, Mosh로 끊김 없이, Tmux로 세션을 유지하고, Happy Coder로 AI 작업까지 모바일에서 제어한다."
---

## ✋ 들어가며

아이패드 하나 들고 카페에서 개발할 수 있을까?
Rocky Linux 서버 + Tailscale + Mosh + Tmux + Happy Coder 조합으로 실제로 쓰고 있는 환경을 공유한다.

---

## 환경

| 구분 | 스펙 |
|------|------|
| 서버 OS | Rocky Linux 10.1 |
| 클라이언트 | iPhone / iPad |
| 터미널 앱 | Termius |
| AI 코딩 | Happy Coder (Claude Code) |

---

## 1. Tailscale — 어디서든 내 서버에 접근

Tailscale은 WireGuard 기반 메시 VPN이다.
포트포워딩 없이 서버에 `100.x.x.x` 고정 IP를 부여해준다.
집, 카페, 어디서든 같은 주소로 접근 가능하다.

**서버 설치 (Rocky Linux 10):**
```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo systemctl enable --now tailscaled
sudo tailscale up
```

**iOS:** App Store에서 Tailscale 설치 후 동일 계정으로 로그인하면 끝.
이후 서버는 항상 `100.x.x.x` 주소로 접근 가능하다.

---

## 2. Mosh — 끊겨도 재연결되는 SSH

SSH는 와이파이가 바뀌거나 화면이 꺼지면 세션이 죽는다.
Mosh는 UDP 기반이라 네트워크가 복구되면 자동으로 재연결된다.
아이패드를 잠깐 잠금해도, 와이파이에서 LTE로 전환해도 세션이 그대로다.

**서버 설치:**
```bash
sudo dnf install mosh
# 방화벽 UDP 포트 오픈
sudo firewall-cmd --permanent --add-port=60000-61000/udp
sudo firewall-cmd --reload
```

**Termius에서 설정:**
호스트 설정 → Connection Type을 Mosh로 변경 → Tailscale IP 입력

---

## 3. Tmux — 세션을 닫아도 작업은 계속

Mosh + Tmux 조합의 핵심은 **서버의 Tmux 세션이 항상 살아있다**는 것이다.
아이패드를 덮어도, 앱을 종료해도 서버에서 돌던 작업은 그대로다.

**설치:**
```bash
sudo dnf install tmux
```

**기본 사용법:**
```bash
tmux new -s dev      # 세션 시작
Ctrl+b, d            # 분리 (작업 유지)
tmux attach -t dev   # 다시 붙기
```

**내가 쓰는 레이아웃:**
```
┌─────────────────┬──────────────┐
│                 │   git log    │
│      vim        ├──────────────┤
│                 │   build log  │
└─────────────────┴──────────────┘
```

---

## 4. Happy Coder — 아이폰/아이패드에서 Claude Code 원격 제어

[Happy Coder](https://github.com/slopus/happy)는 Claude Code의 모바일 클라이언트다.
서버에서 `claude` 대신 `happy`를 실행하면 아이폰/아이패드 앱에서 세션을 원격으로 모니터링하고 제어할 수 있다.

**서버 설치:**
```bash
npm install -g happy-coder
```

**사용법:**
```bash
# claude 대신 happy 실행
happy
```

**실제 사용 시나리오:**

서버의 Tmux 세션에서 `happy`로 긴 리팩토링 작업을 걸어두고 자리를 비운다.
작업이 완료되거나 Claude Code가 질문이 있을 때 아이폰/아이패드 앱으로 푸시 알림이 온다.
앱에서 바로 응답하면 작업이 재개된다.

**핵심 기능:**
- 🔔 Claude Code가 권한 요청이나 질문을 하면 **푸시 알림**
- ⚡ 폰 ↔ 데스크탑 제어권 즉시 전환
- 🔐 종단간 암호화 — 코드가 복호화 없이 외부로 나가지 않음
- 오픈소스

---

## 마치며

아이패드로 개발이 가능한가? **가능하다.**
단, 모든 연산은 서버에서 이루어지고 아이패드는 터미널 화면만 보여주는 구조다.

> 아이패드 = 얇고 가벼운 모니터 + 키보드

이 조합으로 카페, 출퇴근길 어디서든 동일한 개발 환경을 쓸 수 있다.

| 도구 | 역할 |
|------|------|
| Tailscale | 어디서든 내 서버 접근 |
| Mosh | 네트워크 끊김 내성 |
| Tmux | 세션 영속성 |
| Termius | iOS 터미널 클라이언트 |
| Happy Coder | 모바일에서 AI 코딩 제어 |
