import axios from 'axios';
import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';

const Comment = ({ postId }) => {
    const videoId = postId;
    const user = useSelector(state => state.user);
    console.log(user);
    const [commentValue, setCommentValue] = useState("");

    const handelClick = e => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = e => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
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

            {/* Root Comment Form */}

            <form style ={{ display: 'flex', marginTop: '10px'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width: '100%', borderRadius: '5px'}} 
                    onChange={handelClick}
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