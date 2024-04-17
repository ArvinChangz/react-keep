import React, { useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import KeepForm from './KeepForm';

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background-color: #feefc3;
    }
`;

const CreateKeep = ({ onAddKeep, modalType, setModalType }) => {

    const [keep, setKeep] = useState({ title: '', content: '' });

    const handleClick = () => {
        if (keep.title === '' && keep.content === '') return
        const id = Math.random().toString(36).substring(2, 18); // Random id
        const newKeep = { ...keep, id: id } // Add id
        onAddKeep(newKeep) // callBack
        setKeep({ title: '', content: '' }); // reset state
        setModalType(null); // close modal
    };

    return (
        <CustomModal
            destroyOnClose
            cancelText={'Cancel'}
            okText={'Create'}
            centered
            open={modalType === "Create"}
            maskClosable
            width={640}
            height={640}
            onOk={() => handleClick()}
            onCancel={() => { setKeep({ title: '', content: '' }); setModalType(null); }}
        >
            <KeepForm
                keep={keep}
                setKeep={setKeep}
            />
        </CustomModal>
    )
}

export default CreateKeep

