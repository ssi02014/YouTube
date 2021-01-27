import React, { useState } from 'react';
import {Typography, Button, Form, Message, Input } from 'antd'; 
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const { TextArea } = Input
const { Title } = Typography;

const PrivateOptions = [
    { value: 0, label: "Private"},
    { value: 1, label: "Public"},
]
const CategoryOptions = [
    { value: 0, label: "Film & Animation"},
    { value: 1, label: "Auto & Vehicles"},
    { value: 2, label: "Music"},
    { value: 3, label: "Pets & Animals"},
]

const VideoUploadComponent = () => {

    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoPrivate, setVideoPrivate] = useState(0);
    const [videoCategory, setVideoCategory] = useState("Film & Animation");

    //input에 입력하기 위해 change 함수를 꼭 만들어줘야됨
    const onTitleChange = e => {
        setVideoTitle(e.currentTarget.value);
    }
    const onDescriptionChange = e => {
        setVideoDescription(e.currentTarget.value);
    }
    const onPrivateChange = e => {
        setVideoPrivate(e.currentTarget.value);
    }
    const onCategoryChange = e => {
        setVideoCategory(e.currentTarget.value);
    }

    //DropZone
    const onDrop = (files) => {
        const formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);
        console.log(files);

        //여기서 formData, config 즉 file을 서버의 request로 보냄
        axios.post('/api/video/uploadfiles', formData, config) 
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                } else {
                    alert('비디오 업로드를 실패했습니다.');
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                    {/* Drop Zone */}
                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={10000000}>
                        {({getRootProps, getInputProps}) => (
                            <div style ={{
                                width: '300px', height: '240px',
                                border: '1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PlusOutlined type='plus' style={{fontSize: '3rem'}}></PlusOutlined>
                            </div>
                        )}

                    </Dropzone>
                    {/* Thumbnail */}   
                    <div>
                        <img src="" alt=""/>
                    </div>
                </div>
                <br />
                <br />
                
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={videoTitle}
                />
                <br />
                <br />

                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={videoDescription}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((PrivateOption, index) => (
                        <option key={index} value={PrivateOption.value}>{PrivateOption.label}</option>
                    ))}
                </select>
                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((CategoryOption, index) => (
                        <option key={index} value={CategoryOption.value}>{CategoryOption.label}</option>
                    ))}
                </select>
                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default VideoUploadComponent;