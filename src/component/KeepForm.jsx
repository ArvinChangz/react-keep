import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

const KeepContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
margin-top: 32px;
`;



const KeepForm = ({keep, setKeep}) => {

    const handleChange = (e) => {
        const { name, value } = e.target

        setKeep((prev) => {
            return { ...prev, [name]: value }
        });
    };

    return (
        <KeepContainer>
            <Input
                name="title"
                placeholder="Title"
                type="text"
                onChange={handleChange}
                value={keep.title}
                style={{ marginBottom: 16 }}
            />
            <TextArea
                name="content"
                placeholder="write down your note"
                onChange={handleChange}
                value={keep.content}
                rows={5}
            />
        </KeepContainer>
    )
}

export default KeepForm