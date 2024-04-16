import React, { useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import KeepForm from './KeepForm';

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background-color: rgba(245, 224, 66, 0.4);
    }
`;

const CreateKeep = ({ onAddKeep, modalType, setModalType }) => {

    const [keep, setKeep] = useState({ title: '', content: '' });

    const handleClick = () => {
        if (keep.title === '' || keep.content === '') return

        onAddKeep(keep)
        setKeep({ title: '', content: '' });
        setModalType(null);
    }

    return (
        <CustomModal
            destroyOnClose
            cancelText={'Cancel'}
            okText={'Create'}
            centered
            open={modalType === "Create"}
            maskClosable
            afterClose={() => handleClick()}
            width={640}
            height={640}
            styles={{ backgroundColor: 'rgba(245, 224, 66, 0.4)' }}
            onOk={() => handleClick()}
            onCancel={() => setModalType(null)}
        >
            <KeepForm
                keep={keep}
                setKeep={setKeep}
            />
        </CustomModal>
    )
}

export default CreateKeep

