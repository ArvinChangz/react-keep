import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import KeepForm from './KeepForm';

const CustomModal = styled(Modal)`
    .ant-modal-content {
        background-color: #feefc3;
    }
`;

const EditKeep = ({ data, onEditKeep, modalType, setModalType }) => {

    const [keep, setKeep] = useState({ title: '', content: '', id: '' });

    const handleClick = () => {
        if (keep.title === '' && keep.content === '') return

        onEditKeep(keep); // callback
        setModalType(null);
    };

    useEffect(() => {
        setKeep(data);
    }, [data]);

    return (
        <CustomModal
            destroyOnClose
            cancelText={'Cancel'}
            okText={'Update'}
            centered
            open={modalType === "Edit"}
            maskClosable
            width={640}
            height={640}
            onOk={() => handleClick()}
            onCancel={() => { setKeep(data); setModalType(null); }}
        >
            <KeepForm
                keep={keep}
                setKeep={setKeep}
            />
        </CustomModal>
    )
}

export default EditKeep