import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Subscribe = (props) => {

    const [subscribeNumber, setSubscribeNumber] = useState(0);
    const [subscribed, setSubscribed] = useState(false);

    const variable = {
        userTo: props.userTo
    }
    const subscribedVariable = {
        userTo: props.userTo,
        userFrom: localStorage.getItem('userID'),
    }

    useEffect(() => {
        axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('구독자 수 정보를 가져오지 못했습니다.');
                }
            })

        axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('정보를 가져오지 못했습니다.');
                }
            })
    }, [])

    return (
        <>
            <button
                style={{
                    backgroundColor: `${subscribed ? '#999' : '#E03030'}`,
                    borderRadius: '4px',
                    color: '#fff',
                    padding: '10px 16px',
                    fontWeight: '500',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                }}
                onClick
            >
                {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </>
    );
};

export default Subscribe;