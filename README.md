<sup>[바닐라 프로젝트 6조 대장군 Karly (발표용)](https://docs.google.com/presentation/d/1DKqTBBRs951pF0c6P9nZ5QtY9kifBoBgmeiXymnqGH0/edit#slide=id.p1) (작성자: 박예진)</sup>
![2024-01-15_170723](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/6b30bdb5-e9fe-4ecc-8cc2-d3d5c2c108ae)


 

## 프로젝트 소개

#### 마켓칼리 웹사이트 클론코딩(Web)

`Pure CSS`, `Javascript`, `PocketBase`, `Vite`, `Git`, `Github Pages` 사용

#### 배포 링크
- [https://lumpyspaceyz.github.io/Karly/](https://lumpyspaceyz.github.io/Karly/)
- id: water222, pw: 123456!

<br>

### 	:dog: 팀 대장군 소개

> 테킷 프론트엔드 스쿨 8기 프로젝트 팀 '대장군'

- 송현규 (팀장) : 회원가입 페이지, 로그인 페이지
- 김용범 (스크럼마스터) : 제품 목록 페이지, 제품 상세 페이지, 발표자
- 박예진 (노션관리) : 헤더 컴포넌트, 메인 페이지, 발표 PPT 작성
- 조유나 : 푸터 컴포넌트, 장바구니 페이지

<br>

### :date: 프로젝트 일정

> 2024.1.4 ~ 2024.1.16

| 일정 | 개발기간 | 진행내용 |
| --- | --- | --- |
| 1차 | 2024. 01. 04 ~ 2024. 01. 08 | 킥오프, html 마크업 및 css 스타일링, 시맨틱 마크업 및 접근성 |
| 중간점검 | 2024. 01. 09 | 진행내용 피드백 |
| 2차 | 2024. 01. 10 ~ 2024. 01. 15 | js 작업 및 리팩토링, 1차 2차 배포, 발표 준비 |
| 데모데이 | 2024. 01. 16 | 발표 |

<br>

### :+1: 프로젝트 진행 과정

#### 개발 환경
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 :
    - Discord : 커밋시 알람기능이 오도록 WebHook을 활용 Github연동
    - [Notion](https://www.notion.so/6-92b1c6344f0d4094ba3f0f7133fe6a4f?pvs=4) : 일정을 포함한 모든 관련 기록
    - [Github Wiki](https://github.com/FRONTENDSCHOOL8/Karly/wiki/Daily-Scrum) : 데일리 스크럼 목록
- 서비스 배포 환경 : Github Pages
- 디자인 툴 : Figma


<details>
<summary> 컨벤션 </summary>

- HTML
    - 네이밍 컨벤션 : Snake Case
    - XHTML 1.0 문법
    - 'Web Developer' 사용
    - 'headingsMap' 사용
    - Indentation: 2spaces

- JS
    - 네이밍 컨벤션 : Camel case
    - Prettier 사용
    - ESLint 사용

- Eslint
    - 선언한 변수 사용하지 않으면 에러 `"no-unused-vars": "error"`
    - 정의되지 않은 변수 사용하면 에러 `"no-undef": "error"`
    - 줄 끝에 공백 에러 `"no-trailing-spaces": "error"`
    - var 키워드 사용 금지 `"no-var": "error"`

- Prettier
    - 세미콜론 여부 `"semi": false`
    - 따옴표, 쌍따옴표 `"singleQuote": true`
    - 탭 너비 `"tabWidth": 2`
    - 마지막 요소 뒤에 콤마 여부 `"trailingComma": "es5”`

- 커밋
    - 추가 - [add]
    - 수정 - [modify]
    - 완료 - [complete]
    - ex) [add] 한글로 작성
 
</details>

<details>
<summary> Github 이슈 라벨</summary>

- bug : 버그 이슈
- documentation : 문서 작업과 관련된 이슈
- duplicate : 중복된 이슈
- enhancement : 기존 기능 향상
- feature : 새로운 기능 추가
- in progress : 현재 진행 중인 작업
- invalid : 유효하지 않은 이슈
- needs review : 리뷰가 필요한 상태
- on hold : 작업 중지 상태
</details>

<details>
<summary> 요구사항 및 기능 정의서 </summary>


- :file_folder: **[기능 정의서](https://docs.google.com/spreadsheets/d/1u4vWIQy6U2TnrtsBtA_hJqDMsRjy-KHzLwP8ZNa05DE/edit?usp=sharing)**

- 슬라이드가 필요한 ui에서는 [**swiper.js**](https://swiperjs.com/)를 사용해주세요.
    - 각 슬라이드를 데이터로 받아 동적으로 렌더링 되도록 만들어주세요.
    - 슬라이드의 `prev`, `next` 버튼도 구현해주세요.
    - 키보드 키로도 작동되도록 구현해주세요.
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 사용하여 “최근 본 항목”의 UI를 구성해주세요.
- “마이크로 애니메이션”이 필요하다면 추가해주세요.
- “회원가입 기능”을 구현해주세요.
    - 최소한 이메일, 비밀번호 입력 필드(`input`), 제출 버튼(`button`)을 가지도록 구성해주세요.
- 이메일과 비밀번호의 유효성을 확인합니다.
    - 이메일 조건 : 최소 `@`, `.` 포함
    - 비밀번호 조건 : 특수문자 포함 최소 6자 - 최대 16자
    - 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 구현해주세요.
- 회원가입을 통해 사용자(user)를 생성하고 관리합니다.
    - 데이터 통신을 통해 유저를 생성하고 관리해주세요
    - 유저의 회원을 탈퇴할 수 있는 기능을 구현해주세요
    - 로그인된 유저를 인식하여 UI를 다르게 랜더링해주세요
    - 로그인되지 않은 사용자면 회원가입 페이지로 리디렉션 시켜주세요
    - 회원가입시 중복된 유저가 있는지 체크해주세요
- 장바구니 기능을 구현해 주세요
    - 사용자가 장바구니에 항목을 담으면 장바구니 페이지에 랜더링이 되도록 구현해 주세요.


</details>

<br>

## :memo: 페이지 및 기능


| 헤더 |
|     :---:      |
| ![a220b1cc15bda619](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/90678356-2517-434d-9dc3-f3f579b2dc03) |

- 최상단 배너 닫기, 고객센터 호버 시 버블 나타내기, 스크롤시 fixed nav 나타내기, 카테고리 영역 스크롤바 나타내기

<br>

| 메인 |
|     :---:      |
| ![a220b1cc15bda619](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/de349f73-2246-4b9f-af69-fff307d4e7f8) |

| 배너 캐러셀 |
|     :---:      |
| ![메인](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/4a90a96e-f308-4d98-b9be-cf32cd4d99a6) |

| 상품 캐러셀 타입 1 |
|     :---:      |
| ![3](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/71a8dfbe-b1eb-4f2a-8988-f8dc07a0dd1b) |

| 상품 캐러셀 타입 2 | 최근본상품 |
|     :---:      |     :---:      |
| ![메인2](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/f3d056e9-c4a9-4beb-af34-00fbcb0b7cb6) | ![메인4](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/983b57b9-b5cb-44c7-96b6-cfbd6a675d9e) |

<br>

### 로그인 및 회원가입

| 로그인 - 아이디 유효성 검사 | 로그인 - 비밀번호 유효성 검사 |
|     :---:      |     :---:      |
| ![login1](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/10b8d4fe-9294-441b-a712-081ce9f8fb0e) | ![login7](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/8150f15c-3949-40b0-8afc-d75180d065d4) |

| 로그인 기능  | 회원가입 - 이메일 중복 검사  |
|     :---:      |     :---:      |
| ![login6](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/24b99a26-6db1-4497-b760-e8f936f1251e) | ![login4](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/32702723-b1d2-4947-b413-638edf35decb) |

| 새로운 회원 생성 | 회원가입 - 아이디 유효성 검사, 회원가입 - 아이디 중복 검사 |
|     :---:      |     :---:      |
| ![login2](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/edfe5408-63e7-4474-9aef-998234e832f9) | ![login3](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/14139e2a-dc55-4352-b804-cdb826d6fad7) |

<br>

### 제품

| 제품 상세 페이지 |
|     :---:      |
| ![Honeycam_2024-01-15_19-52-31](https://github.com/FRONTENDSCHOOL8/Karly/assets/50475140/62c5c164-386a-4ae5-a552-ac486c4a152c) |

<br>

### 장바구니

| 장바구니 페이지 |
|     :---:      |
| ![장바구니](https://github.com/rnssue/test/assets/50475140/068f860d-9818-4c47-8acf-07d408e90827) |

<br>

