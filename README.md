# 신한투자증권 - 실전 자바스크립트 종합 과제

자바스크립트 종합 과제로서 배운 것을 모두 활용(배우지 않은 것도 활용 가능)

-   Mongoose 모델 스키마 구성하기
-   웹 데이터 수집하여 저장하기
-   Express.js를 활용해 REST API 구성하기

## 1. Detail Requirement

1. > Mongoose 모델 스키마 구성: 다음과 같이 두 개의 `Collection`을 구성
    - Campaign
        - campaignId: 캠페인 id
        - categoryName: 카테고리 이름
        - title: 제목
        - totalBackedAmount: 총모집금액(인원)
        - photoUrl: 사진
        - nickname: 닉네임
        - coreMessage: 코어 메시지
        - whenOpen: 오픈 일자
        - achivementRate: 달성률
    - Comment
        - body: 댓글 본문
        - Campaign: 캠페인
        - commentType: 댓글 타입
        - userNickname: 유저 닉네임
        - whenCreated: 작성일자
        - commentReplys: 대댓글
        - depth: 대댓글 깊이
    - \[조건1\]:Comment는 Campaign을 참조하도록 구성할 것
    - \[조건2\]: 대댓글은 자기자신을 참조하도록 구성할 것
2. 웹 데이터 수집하여 저장하기
    - [해당 와디즈 사이트](https://www.wadiz.kr/web/wreward/main?order=support)에서 캠페인과 해당하는 캠페인의 댓글을 수집하여 (1)에서 만든 스키마에 저장할 것
    - \[조건1\]: Campaign은 50개, 댓글은 캠페인당 40개 씩 저장할 것(단 40개 보다 작으면 해당 개수까지만 저장할 것)
3. Express.js를 활용해 API 구성하기
    - `(GET) /api/campaign`요청이 들어오면 Campaign에 대한 리스트를 조회할 것
    - `(GET) /api/:campaignId`요청이 오면 Campaign 한 개에 대한 데이터와 댓글 전부를 함께 조회할 것
    - `(POST) /api/:campainId/comment` 요청이 오면 해당 Campaign에 대한 댓글을 임의로 달 수 있도록 할 것 (댓글 본문 / 유저닉네임 / ~~대댓글 깊이~~는 필수로 입력)
    - `(POST) /api/:campaignId/comment/:commentId` 요청이 달리면 해당 캠페인과 Comment에 대한 대댓글을 달 수 있도록 할 것 (댓글 본문 / 유저닉네임 / 대댓글 id와 대댓글 깊이는 필수로 입력)
    - \[조건1\]: 코드의 실행 성능은 보지 않습니다. 원하는 기능을 구현하고, 응답을 만들어내는 것만 확인됩니다.
4. React에서 캠페인 리스트 Rendering 하기
    - 위 내용에서 /api/campaign에 대한 내용을 (그림 A, 그림 B) 형태로 Rendering 하기.
    - \[조건1\]: Rendering 내용은 다음 필드만 있으면 됨
        - photoUrl로 렌더링된 이미지
        - archivementRate<>
        - 제목
        - 닉네임
    - \[조건2\]: 디자인은 신경쓰지 않습니다만 레이아웃 형태는 갖춰주세요. (부트스트랩의 Card 형태)

### etc

-   배운 것을 기반으로 자유롭게 응용하여 구성성: 다른 API 혹은 함수를 사용해도 좋음
-   평가는 1차적으로 캡처 이미지로 합니다
    -   몽구스 모델 소스코드
    -   mongodb.com에 저장된 내용
    -   route에 대한 api 구성 파일
    -   Rendering된 내용
-   세부 평가는 소스 코드를 기반으로 합니다. MONGO_URI를 포함한 소스코드 일체를 압축하여 전달
-   node_modules는 제외하여 압축
-   최종 결과물은 `캡처이미지`와 `소스코드`가 함께 압축된 파일

## 2. Project Structure

### capture

과제의 캡처본이 저장된 폴더입니다.

### crawler

해당 프로젝트는 와디즈에서 `캠페인`과 `댓글`을 수집하는 크롤러 입니다.  
자세한 실행 가이드는 아래의 `Tutorial`을 참고하세요.

-   src
    -   api: api를 통해서 데이터를 수집
    -   db: Mongo DB Setup 및 데이터 저장
    -   index.ts: 메인 실행 파일

### front

해당 프로젝트는 `캠페인의 GridView(with Card)`와 `캠페인 상세 조회` 기능이 구현되어 있습니다.  
자세한 실행 가이드는 아래의 `Tutorial`을 참고하세요.

-   src
    -   component: 컴포넌트 단위
    -   page: 페이지
    -   types: 타입스크립트의 공통 타입
    -   util: 유틸성 모듈

### server

해당 프로젝트는 크롤링한 데이터를 기반으로 `캠페인을 조회`하거나 `댓글/대댓글을 업로드`할 수 있는 서버입니다.  
자세한 실행 가이드는 아래의 `Tutorial`을 참고하세요.

-   src
    -   db: db연결 및 모델 / 스키마 정의
    -   middleware: 커스텀 미들웨어 모듈
    -   router: 라우터 모듈, 비즈니스 로직과 연결
    -   service: 비즈니스 로직을 처리하는 서비스 모듈
    -   util: 유틸성 모듈
    -   app.ts: 메인 실행 파일

## 3. Tutorial

### 0. 노드 및 타입스크립트 환경 준비

[NVM(노드 환경 구성) 설치 가이드](https://jang8584.tistory.com/295)

> 해당 프로젝트는 노드 `21.6.0` 버전에서 구성되었으니 참고 바랍니다.  
> 해당 튜토리얼은 Mac OS 기준으로 작성되었습니다. Window에서는 명령어 등의 차이가 있을 수 있습니다.  
> `npm update`는 하지 않습니다. (다운그레이드 한 패키지 일부 존재)

타입스크립트 전역적으로 사용하기 위해 설치

```
npm install -g typescript
npm install -g ts-node
```

### 1. 크롤링 실행 - env 설정

`crawler`라는 폴더에서 `env`파일을 작성해주세요. 작성해야 할 내용은 다음과 같습니다.

```
DB_HOST={Mongo DB Host}
DB_NAME={DB 이름}
DB_USERNAME={유저네임}
DB_PASSWORD={패스워드}
```

### 2. 크롤링 실행

프로젝트 최상단 경로에서 아래의 명령어를 실행해주세요

```
cd crawler
npm install
npm run dev
```

![크롤링 실행 결과](https://github.com/EastWon0103/shinhan-javascript-assignment/blob/main/capture/%ED%81%AC%EB%A1%A4%EB%A7%81%EC%99%84%EB%A3%8C%EC%BA%A1%EC%B2%98.png?raw=true)

### 3. 서버 실행 - env 설정

`server`라는 폴더에서 `env`파일을 작성해주세요. 작성해야 할 내용은 다음과 같습니다.

```
DB_HOST={Mongo DB Host}
DB_NAME={DB 이름}
DB_USERNAME={유저네임}
DB_PASSWORD={패스워드}

# 숫자만 들어감
SERVER_PORT
```

### 4. 서버 실행

프로젝트 최상단 경로에서 아래의 명령어를 실행해주세요

```
cd server
npm install
npm run dev
```

![서버 실행 결과](https://github.com/EastWon0103/shinhan-javascript-assignment/blob/main/capture/%EC%84%9C%EB%B2%84-%EC%BA%A0%ED%8E%98%EC%9D%B8-%EB%A6%AC%EC%8A%A4%ED%8A%B8-%EC%A1%B0%ED%9A%8C.png?raw=true)

### 5. 프론트 실행 - env 설정

`front`라는 폴더에서 `env`파일을 작성해주세요. 작성해야 할 내용은 다음과 같습니다.

```
# 서버의 port 번호와 맞추어야 함
VITE_SERVER_HOST = http://localhost:8888
```

### 6. 프론트 실행

프로젝트 최상단 경로에서 아래의 명령어를 실행해주세요

```
cd front
npm install
npm run dev
```

![프론트 실행 결과](https://github.com/EastWon0103/shinhan-javascript-assignment/blob/main/capture/%ED%94%84%EB%A1%A0%ED%8A%B8-%EC%BA%A0%ED%8E%98%EC%9D%B8%EC%A1%B0%ED%9A%8C-1.png?raw=true)

## 4. 주의 사항

-   기본적인 API의 `엔드포인트`와 `Request Body`값을 수정한 부분이 있습니다.
    -   (GET) /api/campaign -> /api/campaigns
    -   (GET) /api/:campaignId -> /api/campaigns/:campaignId
    -   (POST) /api/:campainId/comment -> /api/campaigns/:campainId/comment & depth 제거
    -   (POST) /api/:campaignId/comment/:commentId -> /api/campaigns/:campainId/comment/:commentId
-   캠페인 조회 시 아이디는 `_id`가 아닌 campaignId로 진행
-   현재 `campaign`과 `comment`는 `wadiz`에서 크롤링한 campaignId로 이어져 있음
    -   만약 캠페인을 추가하는 서버 코드가 필요할 시, `crawler`의 `schema`도 변경해야함
    -   변경 시 크롤러는 `campaign`을 저장 후, 도출되는 `id`로 `comment`와 매핑해야함 (기존 데이터 크롤링 -> 모두 저장)
-   프로젝트를 3개로 분리하였기 때문에 `crawler`와 `server`의 `schema, mongo env 파일 등`을 맞춰야 함
