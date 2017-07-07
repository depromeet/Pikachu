피카츄(오프라인 만남 번개! 서비스)
=======================
**Url**: http://localhost 미정..

목   차
=======================
- [기능리스트 - features](#features)
- [시작하기(Getting Started)](#getting-started)
- [설치 및 요구사항 - Prerequisites](#prerequisites)
- [참고 자료]

기능리스트 - Features
=======================
- **OAuth 2.0 Authentication** via Facebook, Google, Kakao

시작하기 - Getting Started
=======================
프로젝트를 시작하기 전 테이블을 만들어야 합니다. 다음과 같은 테이블을 데이터베이스에 만들어주세요.
...

깃으로 부터 프로젝트를 내려 받습니다.

최상위 디렉토리에 다음과 같은 환경 변수가 있어야지 정상적으로 실행할 수 있습니다.
``` .env
PORT=3000
SESSION_SECRET=secret

FACEBOOK_APP_ID=...
FACEBOOK_APP_SECRET=...

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

KAKAO_NATIVE_APP=...
KAKAO_REST_API=...
KAKAO_JAVASCRIPT=...
KAKAO_ADMIN=...

DIALECT=MYSQL
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=...
DATABASE_NAME=...
DATABASE_PASSWORD=...

REDIS_HOST=localhost
REDIS_NAME=...
REDIS_PORT=...
REDIS_PASS=...
```

환경 변수를 설정한 다음 아래와 같이 프로젝트를 실행할 수 있습니다.
```
yarn install
yarn start
```

업데이트 내역
=======================

### 0.0.1 (2017.07.07)
- 페이스북 로그인 기능추가
### 0.0.0
- 프로젝트 생성
- 로컬 로그인 기능 구현


프로젝트에 기여 하는 법(Contributing)
=======================

License
=======================
...
