# 신한투자증권 - 실전 자바스크립트 종합 과제

자바스크립트 종합 과제로서 배운 것을 모두 활용(배우지 않은 것도 활용 가능)

-   Mongoose 모델 스키마 구성하기
-   웹 데이터 수집하여 저장하기
-   Express.js를 활용해 REST API 구성하기

## Detail Requirement

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
    - [해당 와디즈 사이트](https://www.wadiz.kr/web/wreward/main?order=support)에서 캨페인과 해당하는 캠페인의 댓글을 수집하여 (1)에서 만든 스키마에 저장할 것
    - \[조건1\]: Campaign은 50개, 댓글은 캠페인당 40개 씩 저장할 것(단 40개 보다 작으면 해당 개수까지만 저장할 것)
3. Express.js를 활용해 API 구성하기
    - `(GET) /api/campaign`요청이 들ㅇ어오면 Campaign에 대한 리스트를 조회할 것
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

## Project Structure

### capture

과제의 캡처본을 의미 합니다.

### crawler

### front

### server

## Tutorial

### 0. 노드 및 타입스크립트 환경 준비

[NVM(노드 환경 구성) 설치 가이드](https://jang8584.tistory.com/295)

> 해당 프로젝트는 노드 `21.6.0` 버전에서 구성되었으니 참고 바랍니다.

타입스크립트 전역적으로 사용하기 위해 설치

```
npm install -g typescript
npm install -g ts-node
```
