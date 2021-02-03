const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//video 스키마 작성
const subscriberSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

//스키마를 Model로 감싸줌: model('모델의이름', 스키마 이름)
const Subscriber = mongoose.model('Subscriber', subScriberSchema);

//재사용하기 위해 exports
module.exports= { Subscriber };