import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import '../../../scss/Duration.scss'
import {Typography, Card, Row, Col, Avatar } from 'antd'; 

const { Title } = Typography;
const { Meta } = Card;

const HomeComponent = () => {

    const [video, setVideo] = useState([]);

    //홈페이지 들어오면 useEffect를 실행 1번만
    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then( response => {
                if (response.data.success) {
                    console.log(response.data);
                    setVideo(response.data.videos);
                } else {
                    alert('비디오 정보를 가져오는게 실패하였습니다.')
                }
            })
    }, []);

    const renderCards = video.map((video, index) => {

        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);

        return (
            <Col key={index} lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <Link to={`/video/${video._id}`}>
                            <img 
                                style={{width: '100%'}}
                                src={`http://localhost:5000/${video.thumbnail}`} 
                                alt="thumbnail"
                            />
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                        </Link>
                    </div>
                <br />
                <Meta
                    avatar = { <Avatar src={video.writer.image} /> }
                    title = {video.title}
                    description = ""
                />
                <span>{video.writer.name}</span>
                <br/>
                <span style={{ marginLeft: '3rem' }}>
                    {video.views} views <span> - </span> {moment(video.createdAt).format("MMM Do YY")}
                </span>
            </Col>
        )});

    return (
        <>
            <div style={{
                width: '90%',
                margin: '0 auto',
            }}>
                <Title level={2}> Recommended</Title>
                <hr />
                <Row gutter={[32, 16]}>
                    {renderCards}
                </Row>
            </div>
        </>
    );
};

export default withRouter(HomeComponent);