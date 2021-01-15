# 💻 Boiler-plate
### node.js와 react로 로그인, 회원가입, 로그아웃 구현

<br>

## 🔖 Boiler-plate를 사용하기 전 행동 수칙
1. dev.js file을 config 폴더 안에 생성해주세요.
2. mongoDB 정보를 dev.js file안에다가 넣어주세요.
3. " npm install or yarn install "을 root directory에서 입력해주세요. (백엔드 종속성 다운받기)
4. " npm install or yarn install "을 client directory에서 입력해주세요. (프론트엔드 종속성 다운받기)

<br>

## 👨🏻‍💻 Server 참고 사항
* Node.js / Express.js
* mongoDB / mongoose
* body-parser : Client에서 넘어온 정보를 Server가 분석해서 가져올 수 있게 함
* Postman : https://www.postman.com/
* NodeMon : 서버 구동을 편리하게 하기 위해 사용
* Bcrypt : 비밀번호 암호화
* Jsonwebtoken: 토큰 생성
* cookie-parser: 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어

<br>

## 📈 Client 참고 사항
1. actions, reducers : redux 관련 폴더
2. components: View 관련 폴더

<br>

## 🔍 Server: package.json scripts 수정
```javascript
    "scripts": {
        "start": "node index.js",
        "start:dev" : "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    }
```

<br>

