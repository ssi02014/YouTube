import React, { useEffect, useState } from 'react';
import {Row, Col, List, Avatar} from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SideVideo from './Section/SideVideo';

const VideoDetailComponent = (props) => {
    const videoId = props.match.params.videoId;
    const variable = {
        videoId : videoId,
    };
    const [videoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setVideoDetail(response.data.videoDetail);
                } else {
                    alert('비디오 정보를 가져오는데 실패하였습니다.');
                }
            })
    }, []);
    
    if(videoDetail.writer) {
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
                            <List.Item actions>
                                <List.Item.Meta
                                    avatar={<Avatar src={videoDetail.writer.image}/>}
                                    title={videoDetail.writer.name}
                                    description={videoDetail.description}
                                >
    
                                </List.Item.Meta>
                            </List.Item>
                        </div>
                    </Col>
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