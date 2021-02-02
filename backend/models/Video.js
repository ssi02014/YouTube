const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//video 스키마 작성
const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        maxlength: 50,
    },
    description: {
        type: String,
    },
    privacy: {
        type: Number,
    },
    filePath: {
        type: String,
    },
    category: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    duration: {
        type: String,
    },
    thumbnail: {
        type: String,
    }
}, { timestamps: true });

//스키마를 Model로 감싸줌: model('모델의이름', 스키마 이름)
const Video = mongoose.model('Video', videoSchema);

//재사용하기 위해 exports
module.exports= { Video };