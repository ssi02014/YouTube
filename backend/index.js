const express = require('express'); //express 모듈 가져옴
const app = express(); //새로운 express app을 만듦
const port = 5000; //백서버 포트

app.get('/', (req, res) => res.send('Hello World')); //루트 디렉터리에 오면 helloworld 출력
app.listen(port, () => console.log(`Example app listen ${port}`));