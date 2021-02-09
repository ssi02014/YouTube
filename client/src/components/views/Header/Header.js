import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { useSelector} from 'react-redux';
import '../../../scss/Header.scss';


    
const Header = (props) => {
    const user = useSelector(state => state.user);
    const [login, setLogin] = useState(false);
    

    useEffect(() => {
        if (localStorage.getItem('userID')) {
            setLogin(!login);
        }
    }, []);

    const onClickLogoutHandler = () => {
        localStorage.removeItem('userID');
        
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
                {login ? (
                    <>
                        <h1 className="header-title"><Link to="/">MINTUBE</Link></h1>
                        <ul className="header-menu">
                            <li><Link to="/video/upload">VideoUpload</Link></li> 
                            <li><Link to="/subscription">Subscription</Link></li> 
                            <li><Link to="/" onClick={onClickLogoutHandler}>Logout</Link></li>
                        </ul>
                    </>
                    ) :
                    <>
                        <h1 className="header-title"><Link to="/">MINTUBE</Link></h1>
                        <ul className="header-menu">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Signup</Link></li>
                        </ul>
                    </>
                }
            </header>
        )
};

export default withRouter(Header);