const express = require('express'); //express 모듈 가져옴
const app = express(); //새로운 express app을 만듦

const bodyParser = require('body-parser'); 
const cookieParser = require('cookie-parser');

const multer = require('multer'); //video 파일을 저장하기 위한 Dependency
const ffmpeg = require('fluent-ffmpeg'); //썸네일

const config = require('./config/key');

const { auth } = require("./middleware/auth");
const { User } = require("./models/User"); 
const { Video } = require("./models/Video"); 

app.use(bodyParser.json()); //application/json 분석해서 가져 올 수 있게 함

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/uploads', express.static('uploads')); //static한 파일들을 처리하기 위함

const port = 5000; //서버 포트

//mongoose를 이용한 MongDB와 App 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...')) 
.catch(err => console.log('err'));

//동영상 파일을 저장하기 위한 multer 옵션!
let storage = multer.diskStorage({
  //파일을 올리면 uploads 폴더에 저장됨
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos');
  },
  //파일을 어떤 이름으로 저장할지 ex) 시간_파일이름
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  //파일 종류 제한
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  }
});
const upload = multer({ storage: storage }).single('file');

app.get('/', (req, res) => res.send('Hello World 안녕하세요.sdawd'));
app.get('/api/hello', (req, res) => res.send("안녕하세요"));

//회원가입
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
        success: true
    });
  });
});

//로그인 
app.post('/api/users/login', (req, res) => {

  //1. 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        });
    };
    //2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      };

      //3. 비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) {
          return res.status(400).send(err);
        };
        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie('x_auth', user.token)
        .status(200)
        .json({ loginSuccess: true, userID: user._id});
      });
    });
  });
});

//role이 0이면 일반유저, 1이면 Admin
app.get('/api/users/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 이야기는 Authentication이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    (err, user) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

//video
app.post('/api/video/uploadfiles',(req, res) => {
  upload(req, res, err => {
    if(err) return res.json({ success: false, err});
    //url은 uploads 폴더에 저장된 경로를 client에 보내줌
    return res.json({ 
      success: true, 
      url: res.req.file.path, 
      fileName: res.req.file.filename,
    });
  });
});

app.post('/api/video/thumbnail', (req, res) => {

  let filePath = '';
  let fileDuration = '';

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function(err, metadata) {
    console.log(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  //썸네일 생성
  ffmpeg(req.body.url)
  .on('filenames', function(filenames) {
    console.log('Will generate ' + filenames.join(', '));
    console.log(filenames);

    filePath = 'uploads/thumbnails/' + filenames[0];
  })
  .on('end', function() {
    console.log('Sceenshots taken');
    return res.json({ 
      success: true,
      url: filePath,
      fileDuration: fileDuration,
    })
  })
  .on('error', function(err) {
    console.error(err);
    return res.json({ success: false, err });
  })
  .screenshots({
    count: 2,
    folder: 'uploads/thumbnails',
    size: '320x240',
    filename: 'thumbnail-%b.png',
  })
});

app.post('/api/video/uploadVideo', (req, res) => {
  //비디오 정보 저장
  const video = new Video(req.body)
  video.save((err, doc) => {
    if(err) return res.json({ success: false });
    else return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listen ${port}`));