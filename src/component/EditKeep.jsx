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

    const [keep, setKeep] = useState({ title: '', content: '', id: '', keepType: '', image: null });

    const [image, setImage] = useState(null);

    const handleClick = () => {
        if (keep.title === '' && keep.content === '' && keep.image === null) {
            setModalType(null);
            onDeleteKeep(data.id); // Delete if no title and content
            return
        };

        onEditKeep({...keep, image: image}); // callback
        setModalType(null);
        setImage(null);
    };

    useEffect(() => {
        setKeep(data);
        if (data?.image) {
            setImage(data.image);
        };
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
                type="Edit"
                keepType={data?.keepType}
                image={image}
                setImage={setImage}
            />
        </CustomModal>
    )
}

export default EditKeep