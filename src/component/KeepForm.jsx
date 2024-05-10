import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { MdDelete } from "react-icons/md";

// Icons
import { ReactComponent as UnOrderListIcon } from '../assets/icon/unorderedlist.svg';
import { ReactComponent as CheckBoxIcon } from '../assets/icon/checkbox.svg';
import { ReactComponent as ImageIcon } from '../assets/icon/image.svg';
import UnorderedList from './UnorderedList';
import CheckedList from './CheckedList';

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

const ItemContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
`;

const ImageContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: center;
margin-bottom: 16px;
`;

const ItemButton = styled.button`
width: 56px;
height: 56px;
background-color: transparent;
cursor: pointer;
border: none;
border-radius: 8px;
margin-right: 12px;
font-size: 18px;
display: flex;
align-items: center;
justify-content: center;

&:hover {
    background-color: rgba(179, 165, 172, 0.19);
}
`;

const ImageDeleteButton = styled.button`
width: 56px;
height: 56px;
background-color: transparent;
cursor: pointer;
border: none;
border-radius: 8px;
font-size: 18px;
display: flex;
align-items: center;
justify-content: center;    
z-index: 100;

&:hover {
    background-color: rgba(179, 165, 172, 0.19);
}
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

const KeepForm = ({ keep, setKeep, type, handleCreate, keepType, setKeepType, image, setImage }) => {

    const [isOpen, setIsOpen] = useState(false);

    // PlainText
    const handleTextChange = (e) => {
        const { name, value } = e.target

        setKeep((prev) => {
            return { ...prev, [name]: value }
        });
    };

    // Add Image
    const readFile = (e) => {
        // var file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            const fileReader = event.target;
            console.log("Target", event.target)
            if (fileReader.result) {
                setImage(fileReader.result.toString());
                setIsOpen(true);
                setKeepType("plainText");
            };
        };
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0]);
            // setImage(e.target.files[0]);
        };
    };

    useEffect(() => {
        if (isOpen) {
            function handleClickOutside(event) {
                if (!event.target.closest('.dropdown')) {
                    setIsOpen(false);
                    handleCreate && handleCreate();
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
            {image
                ? (<ImageContainer>
                    <img src={image} alt="keep_image" style={{ width: 324, height: 324, borderRadius: 8 }} />
                    <ImageDeleteButton onClick={() => { setImage(null); }}>
                        <MdDelete style={{ width: 24, height: 24, cursor: 'pointer' }} />
                    </ImageDeleteButton>
                </ImageContainer>)
                : null}
            <ItemContainer>
                <Input
                    name="title"
                    placeholder={!isOpen && type === "Create" ? "Create Keep" : "Title"}
                    type="text"
                    onChange={handleTextChange}
                    value={keep?.title}
                    style={{ marginBottom: 16, backgroundColor: "#feefc3", border: "none" }}
                    onFocus={() => { setIsOpen(true); (type === "Create" && !keepType) && setKeepType("plainText"); }}
                />
                {!keepType
                    ? (<>
                        <ItemButton style={{ marginTop: 4 }} onClick={() => { setIsOpen(true); setKeepType("unOrderedList") }}>
                            <UnOrderListIcon />
                        </ItemButton>
                        <ItemButton onClick={() => { setIsOpen(true); setKeepType("checkedList") }}>
                            <CheckBoxIcon />
                        </ItemButton>
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={(e) => { readFile(e); }}
                            />
                            <ItemButton onClick={() => { document.getElementById('fileInput').click(); }}>
                                <ImageIcon />
                            </ItemButton>
                        </>
                    </>)
                    : null}
            </ItemContainer>
            {(type === "Edit" || (type === "Create" && isOpen))
                ? keepType === "unOrderedList"
                    ? (<UnorderedList
                        keep={keep}
                        setKeep={setKeep}
                    />
                    )
                    : keepType === "checkedList"
                        ? (<CheckedList
                            keep={keep}
                            setKeep={setKeep}
                        />
                        )
                        : (<TextArea
                            name="content"
                            placeholder="Write down your note"
                            onChange={handleTextChange}
                            value={keep?.content}
                            rows={10}
                            style={{ backgroundColor: "#feefc3", border: "none" }}
                        />)
                : null}
            {type === "Create" && isOpen
                ? (<ButtonContainer>
                    <CloseButton class="closeButton" onClick={() => { setKeep({ title: '', content: '' }); setIsOpen(false); setKeepType(''); }}>Close</CloseButton>
                </ButtonContainer>)
                : null}
        </KeepContainer>
    )
}

export default KeepForm