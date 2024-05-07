import React, { useState } from 'react';
import KeepForm from './KeepForm';
import styled from "styled-components";

const Container = styled.div`
width: 70%;
display: flex;
flex-direction: column;
background-color: #feefc3;
margin-top: 18px;
border-radius: 8px;
padding: 12px;
`;

const CreateKeep = ({ onAddKeep, modalType, setModalType }) => {

    const [keep, setKeep] = useState({ title: '', content: '' });

    const handleClick = () => {
        if (keep.title === '' && keep.content === '') return setModalType(null);
        const id = Math.random().toString(36).substring(2, 18); // Random id
        const newKeep = { ...keep, id: id } // Add id
        onAddKeep(newKeep) // callBack
        setKeep({ title: '', content: '' }); // reset state
        setModalType(null); // close modal
    };

    return (
        <Container>
            <KeepForm
                keep={keep}
                setKeep={setKeep}
                type="Create"
                handleCreate={handleClick}
            />
        </Container>
    )
}

export default CreateKeep

