import React from 'react';
import styled from 'styled-components';
import { MdDelete } from "react-icons/md";

const KeepContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 180px;
height: 220px;
background-color: rgba(245, 224, 66, 0.4);
padding: 12px;
margin: 12px 12px;
`;

const KeepTitle = styled.h2`
font-size: 28px;
`;

const KeepContent = styled.p`
font-size: 18px;
`;

const Keep = ({id, data, onDelete }) => {
    return (
        <KeepContainer>
            <div>
                <KeepTitle>{data?.title}</KeepTitle>
                <KeepContent>{data?.content}</KeepContent>
            </div>
            <MdDelete style={{ width: 24, height: 24, cursor: 'pointer' }} onClick={() => onDelete(id)} />
        </KeepContainer>
    )
};

export default Keep