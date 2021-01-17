import React, { useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {

    //홈페이지 들어오면 useEffect를 실행 1번만
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data));
    }, []);


    return (

        <div>
            <h1>hello</h1>
        </div>
    );
};

export default HomePage;