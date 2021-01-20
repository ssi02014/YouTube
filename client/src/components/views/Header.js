import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import '../../scss/Header.scss';


    
const Header = (props) => {
    const [login, setLogin] = useState(false);

    useEffect((login) => {
        axios.get('/api/users/auth')
        .then(response => {
            if(response.data.isAuth) {
                setLogin(!login);
            }
        })
    }, []);

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            console.log(response);

            if (response.data.success) {
                setLogin(!login);
                props.history.push('/');
            } else {
                alert("로그아웃하는데 실패하였습니다.");
            }
        })
    }

    return (
        <header>
            <h1 className="header-title"><Link to="/">MINJAE</Link></h1>
            <ul className="header-menu">
                {login ? 
                <li><Link to="/" onClick={onClickHandler}>Logout</Link></li>
                : <li><Link to="/login">Login</Link></li>}
                {login ? 
                    '' : <li><Link to="/register">Signup</Link></li>
                }
            </ul>
        </header>
    );
};

export default withRouter(Header);