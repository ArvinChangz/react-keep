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

const KeepForm = ({ keep, setKeep }) => {

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
                value={keep?.title}
                style={{ marginBottom: 16, backgroundColor: "#feefc3", border: "none" }}
            />
            <TextArea
                name="content"
                placeholder="Write down your note"
                onChange={handleChange}
                value={keep?.content}
                rows={10}
                style={{ backgroundColor: "#feefc3", border: "none" }}
            />
        </KeepContainer>
    )
}

export default KeepForm