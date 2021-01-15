const express = require('express'); //express 모듈 가져옴
const app = express(); //새로운 express app을 만듦
const bodyParser = require('body-parser'); //bodyparser란, 클라이언트에서 오는 정보를 서버에서 분석해서 가져올 수 있게함
const { User } = require("./models/User"); // User 모델을 가져옴
const config = require('./config/key');

//application/json 분석해서 가져 올 수 있게 함
app.use(bodyParser.json());

//application/x-www-form-urlencoded 분석해서 가져 올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));


//mongoose를 이용한 MongDB와 App 연결
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...')) //성공 시
.catch(err => console.log('err')); //실패 시

app.get('/', (req, res) => res.send('Hello World 안녕하세요.sdawd')); //루트 디렉터리에 오면 helloworld 출력

// 회원 가입 할 때 필요한 정보들을 client 에서 가져오면 것들은 데이터 베이스에 넣어준다.
// 회원 가입 라우트
app.post('/register', (req, res) => {

    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body)
  
    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err })
      return res.status(200).json({
        success: true
      })
    })
})


const port = 5000; //백서버 포트
app.listen(port, () => console.log(`Example app listen ${port}`));