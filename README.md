# 💻 Youtube App
### node.js와 react로 만든 Youtube App

<br>

## 🔖 Boiler-plate를 사용하기 전 행동 수칙
### Boiler-Plater: https://github.com/ssi02014/BoilerPlate
1. dev.js file을 config 폴더 안에 생성해주세요.
2. mongoDB 정보를 dev.js file안에다가 넣어주세요.
3. " npm install or yarn install "을 root directory에서 입력해주세요. (백엔드 종속성 다운받기)
4. " npm install or yarn install "을 client directory에서 입력해주세요. (프론트엔드 종속성 다운받기)

<br>

## 👨🏻‍💻 Youtube App 기능
1. Boiler-Plate: 로그인, 회원가입, 로그아웃 기능
2. Video Upload
<br>

## 🔍 Server 추가 라이브러리
1. multer: 노드 서버에 파일을 저장하기 위한 Dependency

<br>

## 📈 Client 추가 라이브러리
1. react-dropzone: video upload할 때 사용 (VideoUploadComponent)
2. antd 라이브러리
3. multer: 노드 서버에 파일을 저장하기 위한 라이브러리

<br>

## 🔍 
```javascript
    {
        
    }
```

<br>

## 🏃 Antd 4.0 부터 Icon 사용 방법 변경
```javascript
    //3.0 기존
    import { Icon } from 'antd';
    <Icon type='plus' style={{fontSize: '3rem'}}/>

    //4.0 변경
    import { PlusOutlined } from '@ant-design/icons';
    <PlusOutlined type='plus' style={{fontSize: '3rem'}} />
```

<br>

## 🏃 Input 태그에다 값을 입력하기 위한 onChange함수 정의
### 1. useState 정의
```javascript
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
```

<br>

### 2. 함수 정의
```javascript
const onTitleChange = e => {
        setVideoTitle(e.currentTarget.value);
    }
    const onDescriptionChange = e => {
        setVideoDescription(e.currentTarget.value);
    }
```

<br>

### 3. 태그의 onChange 속성에다 정의한 함수 넣기
```javascript
    <Input
        onChange={onTitleChange}
        value={videoTitle}
    />
```