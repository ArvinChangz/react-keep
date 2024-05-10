import React from 'react';
import styled from 'styled-components';
import { MdDelete } from "react-icons/md";
import { Checkbox } from 'antd';

const KeepContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 21%;
height: 220px;
background-color: rgba(245, 224, 66, 0.4);
padding: 12px;
margin: 12px;
`;

const KeepTitle = styled.h2`
font-size: 28px;
word-break: break-word;
`;

const KeepContent = styled.p`
font-size: 18px;
word-break: break-word;
`;
const ImageContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
`;

const Keep = ({ data, onDelete, onEdit }) => {

    return (
        <KeepContainer>
            <div style={{ height: "80%", cursor: "pointer", overflow: "scroll" }} onClick={() => onEdit(data)}>
                <ImageContainer>
                    {data?.image
                        ? (<img src={data?.image} alt="keep_image" style={{ width: 104, height: 104, borderRadius: 8 }} />)
                        : null}
                    <KeepTitle>{data?.title}</KeepTitle>
                </ImageContainer>
                {data?.keepType === "unOrderedList"
                    ? (<ul>
                        {data?.content.map((item, index) => {
                            return <li style={{ marginBottom: 16 }} key={`${data?.id}-${index}`}>{item}</li>;
                        })}
                    </ul>)
                    : data?.keepType === "checkedList"
                        ? (<ul style={{ paddingLeft: 14 }}>
                            {data?.content.map((item, index) => {
                                return (
                                    <li style={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={`${data?.id}-${index}`}>
                                        <Checkbox
                                            checked={data?.checkedItems ? data?.checkedItems[index] || false : false}
                                        />
                                        <p style={{ marginLeft: 12 }}>{item}</p>
                                    </li>
                                )
                            })}
                        </ul>)
                        : (<KeepContent>{data?.content.split("\n").map((paragraph, index) => (
                            <p key={`${data?.id}-${index}`}>{paragraph}</p>
                        ))}</KeepContent>)}
            </div>
            <MdDelete style={{ width: 24, height: 24, cursor: 'pointer' }} onClick={() => onDelete(data.id)} />
        </KeepContainer>
    )
};

export default Keep