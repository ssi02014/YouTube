const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//video 스키마 작성
const disLikeSchema = mongoose.Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
}, { timestamps: true });

//스키마를 Model로 감싸줌: model('모델의이름', 스키마 이름)
const Dislike = mongoose.model('Dislike', disLikeSchema);

//재사용하기 위해 exports
module.exports= { Dislike };