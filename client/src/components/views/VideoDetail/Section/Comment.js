import React, { useState } from 'react';
import axios from 'axios';
import { useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const Comment = ({ postId, commentList, refreshFunction }) => {
    const user = useSelector(state => state.user);

    const [commentValue, setCommentValue] = useState("");

    const handleClick = e => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        setCommentValue("");

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId
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
    
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment List */}
            
            {commentList && commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <>
                        <SingleComment 
                            refreshFunction={refreshFunction}
                            key={index} 
                            comment={comment} 
                            postId={postId}
                        />
                        <ReplyComment 
                            refreshFunction={refreshFunction}
                            parentCommentId={comment._id} 
                            commentList={commentList} 
                            postId={postId} 
                        />
                    </>
                )
            ))}
            {/* Root Comment Form */}

            <form style ={{ display: 'flex', marginTop: '10px'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width: '100%', borderRadius: '5px'}} 
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트 작성하세요."
                />
                <br />

                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default withRouter(Comment);