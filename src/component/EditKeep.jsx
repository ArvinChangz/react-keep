import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import KeepForm from './KeepForm';

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background-color: #feefc3;
    }
`;

const EditKeep = ({ data, onEditKeep, modalType, setModalType, onDeleteKeep }) => {

    const [keep, setKeep] = useState({ title: '', content: '', id: '' });

    const handleClick = () => {
        if (keep.title === '' && keep.content === '') {
            setModalType(null);
            onDeleteKeep(data.id); // Delete if no title and content
            return
        };

        onEditKeep(keep); // callback
        setModalType(null);
    };

    useEffect(() => {
        setKeep(data);
    }, [data]);

    return (
        <CustomModal
            destroyOnClose
            centered
            open={modalType === "Edit"}
            maskClosable
            closeIcon={false}
            width={640}
            height={640}
            onCancel={() => { handleClick() }}
            footer={null}
        >
            <KeepForm
                keep={keep}
                setKeep={setKeep}
            />
        </CustomModal>
    )
}

export default EditKeep