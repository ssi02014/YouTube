import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { registerUser} from '../../../actions/user_action';
import { withRouter } from 'react-router-dom';

const RegisterPage = (props) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = e => {
        setEmail(e.currentTarget.value);
    }

    const onNameHandler = e => {
        setName(e.currentTarget.value);
    }

    const onPasswordHandler = e => {
        setPassword(e.currentTarget.value);
    }

    const onConfirmPasswordHandler = e => {
        setConfirmPassword(e.currentTarget.value);
    }

    const onSubmitHandler = e => {
        e.preventDefault(); //버튼을 누르면 새로고침하는 것을 방지

        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        if (password !== confirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같이야 됩니다.');
        }

        let body = {
            email: email,
            name: name,
            password: password,
        }

        dispatch(registerUser(body))
            .then(response => {
                console.log(response);
                
                if(response.payload.success) {
                    props.history.push('/login');
                } else {
                    alert('Failed to sign up');
                }
            });
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

                    <label>name</label>
                    <input type="text" value={name} onChange={onNameHandler}></input>

                    <label>Password</label>
                    <input type="password" value={password} onChange={onPasswordHandler}></input>

                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}></input>
                    
                    <br />

                    <button>
                        회원 가입
                    </button>
                </form>
            </div>
    );
};

export default withRouter(RegisterPage);