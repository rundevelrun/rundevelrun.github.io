---
emoji: "📱"
title: "아이패드(혹은 스마트폰)로 원격 개발하기 — Tailscale + Mosh + Tmux + Happy Coder"
date: 2026-03-12 18:53:08 +0900
update: 2026-03-12 18:53:08 +0900
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

아이패드로 개발이 되냐고? 된다. 스마트폰으로도 된다.

모든 부담은 서버에서 가져가고 아이패드는 그냥 아이패드다.

서버만 켜져 있으면 된다. 음성 입력까지 지원하니 스마트폰 들고 "이 버그 고쳐라" 한 마디로도 충분하다.

필자가 직접 사용하고 있는 Tailscale + Mosh + Tmux + Happy Coder 조합의 세팅을 정리했다.

## 🌐 Tailscale

WireGuard 기반 메시 VPN. 포트포워딩 없이 서버에 `100.x.x.x` 고정 IP가 생긴다.

홈 서버를 외부에서 접속하려면 복잡한 공유기 설정을 거쳐야 한다.

Tailscale은 그 과정 없이 기기끼리 직접 연결된다. 같은 계정으로 로그인한 기기들이 하나의 가상 네트워크에 묶이는 방식이다.

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

Termius 앱 호스트 설정에서 Connection Type을 Mosh로 변경하고 Tailscale IP와 계정 정보를 입력하면 된다.

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

[Happy Coder](https://github.com/slopus/happy)는 Claude Code를 모바일에서 제어할 수 있는 오픈소스 클라이언트다.

터미널, iOS, Android, 웹 앱 전부 실시간으로 동기화된다.

Claude Code가 입력을 기다리거나 작업이 완료되면 푸시 알림이 오고, End-to-End 암호화로 코드와 대화 내용이 보호된다.

서버의 Tmux 세션에서 `claude` 대신 `happy`를 실행해두면 아이폰/아이패드/안드로이드 앱 혹은 웹브라우저에서 제어할 수 있다.

#### ***서버 설치***
```bash
npm install -g happy-coder
```

#### ***사용법***
```bash
happy  # claude 대신 실행
```

#### ***사용 시나리오***
1. 서버 Tmux 세션에서 `happy` 실행
2. 아이폰/아이패드 Happy 앱에서 작업 지시
3. 작업 완료되거나 Claude Code가 질문이 생기면 앱으로 푸시 알림
4. 앱에서 바로 응답하면 작업 재개

앱에서 음성 입력도 지원해서 꼭 아이패드일 필요도 없다. 스마트폰을 들고 "이 버그 고쳐라" 한 마디면 끝이다.

## 👋

Tailscale로 어디서든 접속하고, Mosh로 연결을 유지하고, Tmux로 세션을 보존하고, Happy Coder로 AI까지 붙였다.

그리고 이 모든 게 전부 무료다. ~~클로드 빼고 ㅎㅎ~~

아이패드는 그냥 우리가 알던 아이패드다.
