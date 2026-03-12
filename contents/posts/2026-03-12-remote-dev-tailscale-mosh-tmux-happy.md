---
emoji: "📱"
title: "아이패드로 개발하기 — Tailscale + Mosh + Tmux + Happy Coder"
date: 2026-03-12 00:00:00 +0900
update: 2026-03-12 00:00:00 +0900
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
---

## ☀️ 환경
> - Rocky Linux 10.1
> - iPhone / iPad (Termius, Happy Coder 앱)

## ✋ 들어가며
아이패드로 개발이 되냐고? 된다.
모든 연산은 서버에서 하고 아이패드는 그냥 터미널 화면이다.
Tailscale + Mosh + Tmux + Happy Coder 조합으로 실제로 쓰고 있는 세팅을 정리했다.

## 🌐 Tailscale
WireGuard 기반 메시 VPN. 포트포워딩 없이 서버에 `100.x.x.x` 고정 IP가 생긴다.

#### ***서버 설치***
```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo systemctl enable --now tailscaled
sudo tailscale up
```

iOS/Android 앱 설치 후 같은 계정으로 로그인하면 끝.

## 🔗 Mosh
SSH는 와이파이가 바뀌거나 화면이 꺼지면 세션이 죽는다.
Mosh는 UDP 기반이라 네트워크가 끊겼다 복구돼도 세션이 그대로다.

#### ***서버 설치***
```bash
sudo dnf install mosh
sudo firewall-cmd --permanent --add-port=60000-61000/udp
sudo firewall-cmd --reload
```

Termius 호스트 설정에서 Connection Type을 Mosh로 변경하고 Tailscale IP를 입력하면 된다.

## 📺 Tmux
Mosh를 끊어도 서버의 Tmux 세션은 살아있다. 이게 핵심이다.

#### ***서버 설치***
```bash
sudo dnf install tmux
```

#### ***기본 사용법***
```bash
tmux new -s dev      # 'dev' 이름의 세션 시작
Ctrl+b, d            # 세션에서 나가기 (서버에서는 계속 실행됨)
tmux attach -t dev   # 'dev' 세션에 다시 접속
```

## 🤖 Happy Coder
[Happy Coder](https://github.com/slopus/happy)는 Claude Code와 Codex를 지원하는 모바일/웹 클라이언트다. 종단간 암호화를 지원하고 오픈소스다.
서버의 Tmux 세션에서 `claude` 대신 `happy`를 실행해두면 아이폰/아이패드 앱에서 제어할 수 있다.

#### ***서버 설치***
```bash
npm install -g happy-coder
```

#### ***사용법***
```bash
happy  # claude 대신 실행
```

1. 서버 Tmux 세션에서 `happy` 실행
2. 아이폰/아이패드 Happy 앱에서 작업 지시
3. 작업 완료되거나 Claude Code가 질문이 생기면 앱으로 푸시 알림
4. 앱에서 바로 응답하면 작업 재개

## 👋
