import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser} from '../../../actions/user_action';
import { withRouter } from 'react-router-dom';

const LoginComponent = (props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = e => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = e => {
        setPassword(e.currentTarget.value);
    }

    const onSubmitHandler = e => {
        e.preventDefault(); //버튼을 누르면 새로고침하는 것을 방지

        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        let body = {
            email: email,
            password: password
        }

        dispatch(loginUser(body))
            .then(response => {

                console.log(response);
                
                if(response.payload.loginSuccess) {
                    window.localStorage.setItem('userID', response.payload.userID);
                    props.history.push('/');
                } else {
                    alert('Error');
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type="password" value={password} onChange={onPasswordHandler}></input>
                
                <br />

                <button>
                    Login
                </button>
            </form>
        </div>
    );
};

export default withRouter(LoginComponent);