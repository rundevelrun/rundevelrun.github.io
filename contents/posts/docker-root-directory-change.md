---
emoji: "🐳"
title: "Docker Root Directory 변경"
date: 2025-01-20 12:48:00 +0900
update: 2025-01-20 12:48:00 +0900
tags:
  - aws
  - ec2
  - amazon-linux
  - linux
  - docker
---


## ☀️ 테스트 환경
> - Amazon Linux 2023 (EC2)
> - Docker 20.10.25

## ✋ 들어가며
운영중인 시스템에서 Docker Root Directory를 변경해야하는 일이 생겨버렸다. 기본 설정의 Root Directory가 루트(/) 볼륨에 잡혀있어서 내부 정책상 다른 볼륨으로 옮겨가야했다.

## 💾 신규 디렉토리로 데이터 복사

#### ***기존 디렉토리 확인***
도커 명령어를 이용해서 기존 디렉토리가 어디로 잡혀있는지 확인해보자. 필자의 경우 별도의 설정이 없었기에 기본 경로로 설정되어 있다.
```shell
docker info
```
```shell
✔
...
Docker Root Dir: /var/lib/docker
...
```

#### ***신규 디렉토리 생성***
Docker Root Directory로 사용할 신규 디렉토리를 생성해주자. 예제에서는 루트 볼륨과 분리되어있는 별도의 볼륨(/data)으로 진행했다.
```shell
cd /data
mkdir docker
```

#### ***데이터 복사***
운영중인 시스템이기 때문에 기존에 사용하던 디렉토리를 신규 디렉토리로 옮겨야했다.
```shell
cp -a /var/lib/docker/* /data/docker
```

## 🐳 data-root 설정

#### ***첫번째 방법***
_daemon.json_ 파일을 수정한다. (없으면 당황하지 말고 생성해주자)
```shell
sudo /etc/docker/daemon.json
```
```json
{
    "data-root": "/data/docker/",
    ...
}
```


#### ***두번째 방법***
_docker.service_ 에서 ExecStart를 찾아서 --data-root를 추가한다.
```shell
sudo vi /usr/lib/systemd/system/docker.service
```
```shell
ExecStart=/usr/bin/dockerd --data-root /data/docker -H fd:// ...
```

## 🔄 재시작
재시작은 언제나 제일 무서운 타이밍이 아닐까

#### ***서비스 재시작***
```shell
sudo systemctl stop docker
sudo systemctl daemon-reload # docker.service를 수정한 경우에만
sudo systemctl start docker
```
or
```shell
sudo systemctl daemon-reload # docker.service를 수정한 경우에만
sudo systemctl restart docker
```

#### ***컨테이너 재시작***
구동중인 프로세스가 있는 경우 컨테이너도 재시작하자.

- 컨테이너 ID 확인
```shell
docker ps
```
```shell
✔
CONTAINER ID   IMAGE    ...
aaaaaaaaaaaa   ...
bbbbbbbbbbbb   ...
cccccccccccc   ...
```

- 컨테이너 재시작 
```shell
docker restart aaaaaaaaaaaa bbbbbbbbbbbb cccccccccccc
```

## ✅ 정상 확인
위 과정들을 마치면 드디어 변경된 Docker Root Directory를 볼 수 있다.

```shell
docker info
```
```shell
✔
...
Docker Root Dir: /data/docker
...
```

## 👋

