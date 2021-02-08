const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//video 스키마 작성
const commentSchema = mongoose.Schema({
    writer : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    },
}, { timestamps: true });

//스키마를 Model로 감싸줌: model('모델의이름', 스키마 이름)
const Comment = mongoose.model('Comment', commentSchema);

//재사용하기 위해 exports
module.exports= { Comment };