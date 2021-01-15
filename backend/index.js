const express = require('express'); //express 모듈 가져옴
const app = express(); //새로운 express app을 만듦
const port = 5000; //백서버 포트

//mongoose를 이용한 MongDB와 App 연결
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://minjae:alswo8945@boiler-plate.03g6t.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => console.log('MongoDB Connected...')) //성공 시
.catch(err => console.log('err')); //실패 시



app.get('/', (req, res) => res.send('Hello World')); //루트 디렉터리에 오면 helloworld 출력
app.listen(port, () => console.log(`Example app listen ${port}`));