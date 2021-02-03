import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const SideVideo = () => {

    const [sideVideo, setSideVideo] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                    setSideVideo(response.data.videos);
                } else {
                    alert('비디오 정보를 가져오는게 실패하였습니다.')
                }
            })
    }, []);

    const renderSideVideo = sideVideo.map((video, index) => {

        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration - minutes * 60);

        return (
            <div 
                key={index}
                style={{ display: 'flex', margin: '2rem 0', padding: '0 1rem',}}
            >
                <div style={{ width: '40%', height: '100%'}}>
                    <a href={`/video/${video._id}`}>
                        <img style={{ width: '100%', height: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="썸네일"/>
                    </a>
                </div>

                <div style={{width: '50%', marginLeft: '0.3rem'}}>
                    <a href={`/video/${video._id}`} style={{ color: 'gray'}}>
                        <span style={{ fontSize: '1rem', color: 'black'}}>{video.title}</span><br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views} views</span><br />
                        <span>{minutes} : {seconds}</span><br />
                    </a>
                </div>
            </div>
        );
    });

    return (

        <>
            {renderSideVideo}
        </>
    );
};

export default withRouter(SideVideo);