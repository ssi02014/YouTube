const mongoose = require('mongoose');

//user 스키마 작성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //공백 제거
        unique: 1
    },
    password: {
        type: String,
        maxlength: 15,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    rold: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

//스키마를 Model로 감싸줌: model('모델의이름', 스키마 이름)
const User = mongoose.model('User', userSchema);

//재사용하기 위해 exports
module.exports= { User }