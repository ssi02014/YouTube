import React, { useState } from 'react';
import { Comment, Avatar, Input } from 'antd';
import { useSelector} from 'react-redux';
import axios from 'axios';

const SingleComment = ({ comment, postId, refreshFunction }) => {
    const user = useSelector(state => state.user);
    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setcommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!openReply);
    }

    const onHandleChange = e => {
        setcommentValue(e.currentTarget.value);
    }
    
    const onSubmit = e => {
        e.preventDefault();
        setcommentValue("");

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId,
            responseTo: comment._id,
        }

        axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.result);
                refreshFunction(response.data.result);
            } else {
                alert('커멘트를 저장하지 못했습니다.');
            }
        })
    }
    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]
    
    return (
        <div>
            <Comment
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt />}
                content={<p>{comment.content}</p>}
            />

        {openReply &&
            <form style ={{ display: 'flex', marginTop: '10px'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width: '100%', borderRadius: '5px'}} 
                    onChange={onHandleChange}
                    value={commentValue}
                    placeholder="코멘트 작성하세요."
                />
                <br />

                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>
                    Submit
                </button>
            </form>
        }

        </div>
    );
};

export default SingleComment;