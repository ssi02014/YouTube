import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { LikeOutlined, DislikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import axios from 'axios';

const LikeDislikes = ({ video, videoId, userId, commentId }) => {
    
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [likeAction, setLikeAction] = useState(null);
    const [disLikeAction, setDislikeAction] = useState(null);

    let variables = {}
    if (video) {
        variables = { 
            videoId: videoId,
            userId: userId
        }
    } else {
        variables = {
            commentId: commentId,
            userId: userId
        }
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variables)
            .then(response => {
                if (response.data.success) {

                    //얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length);


                    // 내가 이미 그 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if (like.userId === userId) {
                            setLikeAction('liked');
                        }
                    }) 
                } else {
                    alert('Like 정보를 가져오는데 실패하였습니다.');
                }
            })

        axios.post('/api/like/getDisLikes', variables)
            .then(response => {
                if (response.data.success) {

                    //얼마나 많은 싫어요를 받았는지
                    setDislikes(response.data.dislikes.length);


                    // 내가 이미 그 좋아요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === userId) {
                            setDislikeAction('disliked');
                        }
                    }) 
                } else {
                    alert('DisLike 정보를 가져오는데 실패하였습니다.');
                }
            })
    })
    
    const onLike = () => {
        if(likeAction === null) {
            axios.post('/api/like/upLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes + 1);
                        setLikeAction('liked');

                        if(disLikeAction !== null) {
                            setDislikeAction(null);
                            setDislikes(dislikes - 1);
                        }

                    } else {
                        alert('Like를 올리지 못했습니다.');
                    }
                })
        } else {
            axios.post('/api/like/downLike', variables)
                .then(response => {
                    if (response.data.success) {
                        setLikes(likes - 1);
                        setLikeAction(null);
                    } else {
                        alert('Like를 내리지 못했습니다.');
                    }
                })
        }
    }

    const onDisLike = () => {
        if(disLikeAction !== null) {
            axios.post('/api/like/unDislike', variables)
            .then(response => {
                if (response.data.success) {
                    setDislikes(dislikes - 1)
                    setDislikeAction(null);
                } else {
                    alert('disLike를 올리지 못했습니다.');
                }
            })
        } else {
            axios.post('/api/like/upDislike', variables)
            .then(response => {
                if (response.data.success) {
                    setDislikes(dislikes + 1)
                    setDislikeAction('disliked');

                    if(likeAction !== null) {
                        setLikeAction(null);
                        setLikes(likes - 1);
                    }

                } else {
                    alert('disLike를 지우지 못했습니다.');
                }
            })
        }
    }

    return (
        <>
            <span key="comment-basic-like">
                {video ? 
                <>
                    <Tooltip title="Like">
                        {likeAction === "liked" ? 
                            <LikeFilled onClick={onLike} style={{fontSize: '20px'}}/> : 
                            <LikeOutlined onClick={onLike} style={{fontSize: '20px'}}/>
                        } 
                    </Tooltip>
                    <span style={{ paddingLeft: '4px', cursor: 'auto', fontSize: '20px'}}> {likes} </span>
                </>
                : 
                <>
                    <Tooltip title="Like">
                        {likeAction === "liked" ? 
                            <LikeFilled onClick={onLike} /> : 
                            <LikeOutlined onClick={onLike}/>
                        } 
                    </Tooltip>
                    <span style={{ paddingLeft: '4px', cursor: 'auto'}}> {likes} </span>
                </>
                }
                
                
            </span>

            <span key="comment-basic-dislike" style={{marginLeft: '5px'}}>
                {video ? 
                    <>
                        <Tooltip title="Dislike">
                            {disLikeAction === "disliked" ? 
                                <DislikeFilled onClick={onDisLike} style={{fontSize: '20px'}}/> : 
                                <DislikeOutlined onClick={onDisLike} style={{fontSize: '20px'}}/>
                            }
                        </Tooltip>
                        <span style={{ paddingLeft: '4px', cursor: 'auto', fontSize: '20px'}}> {dislikes} </span>
                    </>
                :
                    <>
                        <Tooltip title="Dislike">
                            {disLikeAction === "disliked" ? 
                                <DislikeFilled onClick={onDisLike}/> : 
                                <DislikeOutlined onClick={onDisLike}/>
                            }
                        </Tooltip>
                        <span style={{ paddingLeft: '4px', cursor: 'auto'}}> {dislikes} </span>
                    </>
                }
            </span>
        </>
    );
};

export default LikeDislikes;