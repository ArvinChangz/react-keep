import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

const KeepContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-top: 18px;
`;

const ButtonContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
`;

const CloseButton = styled.button`
width: 84px;
height: 64px;
background-color: transparent;
cursor: pointer;
border: 1px solid rgba(161, 161, 161, 0.8);
border-radius: 8px;
margin: 8px 12px;
font-size: 18px;

&:hover {
    background-color: rgba(179, 165, 172, 0.19);
}
`;

const KeepForm = ({ keep, setKeep, type, handleCreate }) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target

        setKeep((prev) => {
            return { ...prev, [name]: value }
        });
    };

    useEffect(() => {
        if (isOpen) {
            function handleClickOutside(event) {
                if (!event.target.closest('.dropdown')) {
                    setIsOpen(false);
                    handleCreate && handleCreate();
                    console.log("Here")
                };
            };

            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        };
    }, [handleCreate, isOpen]);

    return (
        <KeepContainer className='dropdown'>
            <Input
                name="title"
                placeholder={!isOpen && type === "Create" ? "Create Keep" : "Title"}
                type="text"
                onChange={handleChange}
                value={keep?.title}
                style={{ marginBottom: 16, backgroundColor: "#feefc3", border: "none" }}
                onFocus={() => { setIsOpen(true) }}
            />
            {(type === "Edit" || (type === "Create" && isOpen)) && (
                <TextArea
                    name="content"
                    placeholder="Write down your note"
                    onChange={handleChange}
                    value={keep?.content}
                    rows={10}
                    style={{ backgroundColor: "#feefc3", border: "none" }}
                />
            )}
            {type === "Create" && isOpen
                ? (<ButtonContainer>
                    <CloseButton class="closeButton" onClick={() => { setKeep({ title: '', content: '' }); setIsOpen(false); }}>Close</CloseButton>
                </ButtonContainer>)
                : null}
        </KeepContainer>
    )
}

export default KeepForm