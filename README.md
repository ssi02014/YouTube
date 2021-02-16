# 💻 Youtube App
### node.js와 react로 만든 Youtube App

<br />

## 🎥 HomePage View
![mainPage](https://user-images.githubusercontent.com/64779472/107622385-1c921b00-6c9b-11eb-95db-585964e407d0.PNG)

<br />
<br />

## 🔖 YouTube App을 사용하기 전 행동 수칙
### Boiler-Plater: https://github.com/ssi02014/BoilerPlate
1. **" npm install or yarn install "** 을 backend 폴더에서 입력해주세요. (백엔드 종속성 다운받기)
2. **" npm install or yarn install "** 을 client 폴더에서 입력해주세요. (프론트엔드 종속성 다운받기)
3. backend 폴더에서 **" npm start or yarn start "** 를 통해 server를 실행시켜주세요.
4. cliend 폴더에서 **" npm start or yarn start "** 를 통해 client를 실행시켜주세요.
5. 회원가입을 해주세요. 
6. 회원가입 한 계정을 통해서 로그인 해주세요.
7. 로그인 후 App 기능을 확인합니다.
    - 또는, **ID: 1q2w3e4r@naver.com / Pwd: 1q2w3e4r** 로그인을 해서 App 기능들을 확인해보세요.

### ❗❗ 만약 Video Upload 기능을 확인하고 싶다면, **ffmpeg**를 본인 PC에 설치하셔야 됩니다. ❗❗
    - ffmpeg: https://ffmpeg.org/download.html

<br />
<br />

## 👨🏻‍💻 Youtube App 기능
1. **Boiler-Plate: Login, Register, Logout**
2. **Home Page**
    - 유저가 업로드한 Video들 나열
3. **Video Upload** 
    - 서버에 비디오 저장
    - 서버에 비디오 썸네일 저장
4. **Video Detail Page**
    - 업로드 된 비디오 시청
    - 사이드에 비디오 Section
5. **User Subscribe** 
    - 구독 페이지에서는 구독한 회원의 Video만 나오게 하기
6. **Comment**  
    - 대댓글 기능
7. **Like, Dislike 기능**
    - Video의 like, dislike
    - comment의 like, dislike

<br />
<br />

## 🔍 Server 추가 라이브러리
1. multer: 노드 서버에 파일을 저장하기 위한 Dependency
2. fluet-ffmpeg: thumbnail 생성을 위한 라이브러리
    - fluet-ffmpeg를 설치하기 전에 ffmpeg를 설치해야됨
    - **ffmpeg 윈도우 설치 참고** : https://blog.naver.com/chandong83/222095346417

<br />
<br />

## 📈 Client 추가 라이브러리
1. react-dropzone: video upload할 때 사용 (VideoUploadComponent)
2. antd 라이브러리: 디자인을 편리하게 하기 위한 라이브러리
3. multer: 노드 서버에 파일을 저장하기 위한 라이브러리

<br />
<hr />
<br />

## 🏃 Server) static 파일들을 처리하기 위한 추가 소스 코드
### static 한 파일: 이미지, css, javacript 파일 등
```javascript
    {
        //index.js에 추가하기
        app.use('/uploads', express.static('uploads'));
    }
```

<br />

## 🏃 Client) Antd 4.0 부터 Icon 사용 방법 변경
```javascript
    //3.0 기존
    import { Icon } from 'antd';
    <Icon type='plus' style={{fontSize: '3rem'}}/>

    //4.0 변경
    import { PlusOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
    <PlusOutlined type='plus' style={{fontSize: '3rem'}} />
```

<br />

## 🏃 Client) Input 태그에다 값을 입력하기 위한 방법(순서)
### 1. useState 정의
```javascript
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
```

<br />

### 2. 함수 정의
```javascript
    const onTitleChange = e => {
        setVideoTitle(e.currentTarget.value);
    }
    const onDescriptionChange = e => {
        setVideoDescription(e.currentTarget.value);
    }
```

<br />

### 3. 태그의 onChange 속성에다 정의한 함수 넣기
```javascript
    <Input
        onChange={onTitleChange}
        value={videoTitle}
    />
```

<br />

## 🏃 Client) router의 match 객체
### match 객체를 받아오려면 꼭! withRouter를 import 해야함
```javascript
    import { withRouter } from 'react-router-dom';

    const VideoUpladComponent = () => {
        return ( 
            //소스코드
        );
    }
    
    //코드 마지막에 withRouter안에다 export할 컴포넌트 추가하기
    export default withRouter(VideoUploadComponent);
```

<br />