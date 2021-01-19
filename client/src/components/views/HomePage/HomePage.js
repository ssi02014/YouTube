import React, { useEffect } from 'react';
import axios from 'axios';

const HomePage = (props) => {

    //홈페이지 들어오면 useEffect를 실행 1번만
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data));
    }, []);

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if (response.data.success) {
                props.history.push('/login');
            } else {
                alert("로그아웃하는데 실패하였습니다.");
            }
        })
    }

    return (

        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    );
};

export default HomePage;