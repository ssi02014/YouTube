"use strict";

var express = require('express'); //express 모듈 가져옴


var app = express(); //새로운 express app을 만듦

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var multer = require('multer'); //video 파일을 저장하기 위한 Dependency


var ffmpeg = require('fluent-ffmpeg'); //썸네일


var config = require('./config/key');

var _require = require("./middleware/auth"),
    auth = _require.auth;

var _require2 = require("./models/User"),
    User = _require2.User;

var _require3 = require("./models/Video"),
    Video = _require3.Video;

var _require4 = require("./models/Subscriber"),
    Subscriber = _require4.Subscriber;

app.use(bodyParser.json()); //application/json 분석해서 가져 올 수 있게 함

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use('/uploads', express["static"]('uploads')); //static한 파일들을 처리하기 위함

var port = 5000; //서버 포트
//mongoose를 이용한 MongDB와 App 연결

var mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  return console.log('MongoDB Connected...');
})["catch"](function (err) {
  return console.log('err');
}); //동영상 파일을 저장하기 위한 multer 옵션!

var storage = multer.diskStorage({
  //파일을 올리면 uploads 폴더에 저장됨
  destination: function destination(req, file, cb) {
    cb(null, 'uploads/videos');
  },
  //파일을 어떤 이름으로 저장할지 ex) 시간_파일이름
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now(), "_").concat(file.originalname));
  },
  //파일 종류 제한
  fileFilter: function fileFilter(req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false);
    }

    cb(null, true);
  }
});
var upload = multer({
  storage: storage
}).single('file');
app.get('/', function (req, res) {
  return res.send('Hello World 안녕하세요.sdawd');
});
app.get('/api/hello', function (req, res) {
  return res.send("안녕하세요");
}); //회원가입

app.post('/api/users/register', function (req, res) {
  var user = new User(req.body);
  user.save(function (err, userInfo) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).json({
      success: true
    });
  });
}); //로그인 

app.post('/api/users/login', function (req, res) {
  //1. 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      });
    }

    ; //2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.

    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });
      }

      ; //3. 비밀번호 까지 맞다면 토큰을 생성하기.

      user.generateToken(function (err, user) {
        if (err) {
          return res.status(400).send(err);
        }

        ; //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지

        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
          userID: user._id
        });
      });
    });
  });
}); //role이 0이면 일반유저, 1이면 Admin

app.get('/api/users/auth', auth, function (req, res) {
  //여기 까지 미들웨어를 통과해 왔다는 이야기는 Authentication이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});
app.get('/api/users/logout', auth, function (req, res) {
  User.findOneAndUpdate({
    _id: req.user._id
  }, {
    token: ""
  }, function (err, user) {
    if (err) return res.json({
      success: false,
      err: err
    });
    return res.status(200).send({
      success: true
    });
  });
}); //video

app.post('/api/video/uploadfiles', function (req, res) {
  upload(req, res, function (err) {
    if (err) return res.json({
      success: false,
      err: err
    }); //url은 uploads 폴더에 저장된 경로를 client에 보내줌

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename
    });
  });
});
app.post('/api/video/thumbnail', function (req, res) {
  var filePath = '';
  var fileDuration = ''; // 비디오 정보 가져오기

  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.log(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  }); //썸네일 생성

  ffmpeg(req.body.url).on('filenames', function (filenames) {
    console.log('Will generate ' + filenames.join(', '));
    console.log(filenames);
    filePath = 'uploads/thumbnails/' + filenames[0];
  }).on('end', function () {
    console.log('Sceenshots taken');
    return res.json({
      success: true,
      url: filePath,
      fileDuration: fileDuration
    });
  }).on('error', function (err) {
    console.error(err);
    return res.json({
      success: false,
      err: err
    });
  }).screenshots({
    count: 2,
    folder: 'uploads/thumbnails',
    size: '320x240',
    filename: 'thumbnail-%b.png'
  });
});
app.post('/api/video/uploadVideo', function (req, res) {
  //비디오 정보 저장
  var video = new Video(req.body);
  video.save(function (err, doc) {
    if (err) return res.json({
      success: false
    });else return res.status(200).json({
      success: true
    });
  });
});
app.get('/api/video/getVideos', function (req, res) {
  //비디오를 db에서 가져오기
  Video.find().populate('writer').exec(function (err, videos) {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      videos: videos
    });
  });
});
app.post('/api/video/getVideoDetail', function (req, res) {
  Video.findOne({
    '_id': req.body.videoId
  }).populate('writer').exec(function (err, videoDetail) {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      videoDetail: videoDetail
    });
  });
});
app.post('/api/subscribe/subscribeNumber', function (req, res) {
  Subscriber.find({
    'userTo': req.body.userTo
  }).exec(function (err, subscribe) {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      success: true,
      subscribeNumber: subscribe.length
    });
  });
});
app.post('/api/subscribe/subscribed', function (req, res) {
  Subscriber.find({
    'userTo': req.body.userTo,
    'userFrom': req.body.userFrom
  }).exec(function (err, subscribe) {
    if (err) return res.status(400).send(err);
    var result = false;

    if (subscribe.length !== 0) {
      result = true;
    }

    return res.status(200).json({
      success: true,
      subscribed: result
    });
  });
});
app.listen(port, function () {
  return console.log("Example app listen ".concat(port));
});