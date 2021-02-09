import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar} from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';
import Comment from './Section/Comment';
import LikeDislikes from './Section/LikeDislikes';

const VideoDetailComponent = (props) => {
    const videoId = props.match.params.videoId;
    const variable = {
        videoId : videoId,
    };
    const [videoDetail, setVideoDetail] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert('비디오 정보를 가져오는데 실패하였습니다.');
                }
            });

        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    alert('코멘트 정보를 가져오는데 실패하였습니다.');
                }
            });
    }, []);

    const refreshFunction = (newComment) => {
        setComments(comments.concat(newComment));
    }
    
    if(videoDetail.writer) {
        const subscribedButton = videoDetail.writer._id !== localStorage.getItem('userID') 
            && <Subscribe 
                    userTo= {videoDetail.writer._id} 
                    userFrom={localStorage.getItem('userID')}
                />
        return (
            <>
                <Row gutter={[16, 16]}>
                    <Col lg={18} xs={24}>
                        <div style={{
                            width: '100%',
                            padding: '3rem 4rem'
                        }}>
                            <video 
                                style={{ width: '100%' }} 
                                src={`http://localhost:5000/${videoDetail.filePath}`}
                                controls 
                            />
                            <List.Item actions={[ 
                                <LikeDislikes video userId={localStorage.getItem('userID')} videoId={videoId} />
                                , subscribedButton 
                            ]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={videoDetail.writer.image}/>}
                                    title={videoDetail.writer.name}
                                    description={videoDetail.description}
                                />
                            </List.Item>

                            {/* Comment */}

                            <Comment 
                                refreshFunction={refreshFunction}
                                commentList={comments}
                                postId={videoDetail._id} 
                            />
                        </div>
                    </Col>

                    {/* SideVideo */}
                    <Col lg={6} xs={24}>
                        <SideVideo></SideVideo>
                    </Col>
                </Row>  
            </>
        );
    } else {
        return <div>...loading</div>;
    }
};

export default withRouter(VideoDetailComponent);