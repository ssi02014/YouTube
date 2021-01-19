# 💻 Boiler-plate
### node.js와 react로 로그인, 회원가입, 로그아웃 구현

<br>

## 🔖 Boiler-plate를 사용하기 전 행동 수칙
1. dev.js file을 config 폴더 안에 생성해주세요.
2. mongoDB 정보를 dev.js file안에다가 넣어주세요.
3. " npm install or yarn install "을 root directory에서 입력해주세요. (백엔드 종속성 다운받기)
4. " npm install or yarn install "을 client directory에서 입력해주세요. (프론트엔드 종속성 다운받기)

<br>

## 👨🏻‍💻 Server 참고 사항 및 패키지
* Node.js / Express.js
* mongoDB / mongoose
* body-parser : Client에서 넘어온 정보를 Server가 분석해서 가져올 수 있게 함
* Postman : https://www.postman.com/
* NodeMon : 서버 구동을 편리하게 하기 위해 사용
* Bcrypt : 비밀번호 암호화
* Jsonwebtoken: 토큰 생성
* cookie-parser: 요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어

<br>

## 📈 Client 참고 사항 및 패키지
* actions, reducers : redux 관련 폴더
* components: View 관련 폴더
* HOC: 페이지 접근에 대한 권한 설정

<br>

1. react-router-dom
2. node-sass@4.14.1
3. axios: react js에서 request를 보내기 위해 사용
4. package.json에 proxy를 추가해서 CORS 오류 해결
5. redux, react-redux, redux-promise, redux-thunk, redux-devtools-extension: redux 관련 패키지

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

## 🔍 client: package.json에 proxy 추가
```javascript
    {
        "proxy": "http://localhost:5000/"
    }
```

<br>

## 🏃 Redux
### 1. 액션 타입 정의
```javascript
    //액션 타입
    export const LOGIN_USER = "login_user";
    export const REGISTER_USER = "register_user";
    export const AUTH_USER = "auth_user";
```

<br>

### 2. 액션 생성 함수 정의

```javascript
    export function loginUser(dataToSubmit) {

        const request = axios.post('/api/users/login', dataToSubmit)
            .then(response => response.data);

        return {
            type: LOGIN_USER,
            payload: request
        }
    }
```

<br>

### 3. 리듀서 함수 정의

```javascript
    //리듀서 함수 정의
    export default function(state = {}, action) {
        switch (action.type) {
            case LOGIN_USER:
                return {...state, loginSuccess: action.payload}
        
            case REGISTER_USER:
                return {...state, register: action.payload}
        
            case AUTH_USER:
                return {...state, userData: action.payload}

            default:
                return state;
        }
    } 
```

<br>

### 4. rootReducer 정의

```javascript
    const rootReducer = combineReducers({
        user,
    })
```

<br>

### 5. store 정의 및 provider 

```javascript
        const store = createStore(rootReducer, composeWithDevTools(
            applyMiddleware(promiseMiddleware, ReduxThunk)));

        ReactDOM.render(
            <Provider store={store}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </Provider>,
        document.getElementById('root')
        );
```

<br>