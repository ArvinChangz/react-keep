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
    const [keepType, setKeepType] = useState(''); // plainText, unOrderedList, checkedList

    const [image, setImage] = useState(null);

    const handleClick = async () => {
        try {
            if (keep.title === '' && keep.content === '' && image === null) {
                setModalType(null); 
                setKeepType(''); 
                return;
            };
            const id = await Math.random().toString(36).substring(2, 18); // Random id
            const newKeep = await { ...keep, id: id, keepType: keepType, image: image } // Add id and keepType
            await onAddKeep(newKeep) // callBack
            setKeep({ title: '', content: '' }); // reset state
            setModalType(null); // close modal
            setKeepType('');
            setImage(null);
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <Container>
            <KeepForm
                keep={keep}
                setKeep={setKeep}
                type="Create"
                handleCreate={handleClick}
                keepType={keepType}
                setKeepType={setKeepType}
                image={image}
                setImage={setImage}
            />
        </Container>
    )
}

export default CreateKeep

