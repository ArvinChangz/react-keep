import React, { useState } from 'react';
import styled from "styled-components";
import Header from './layout/Header';
import { useLocalStorage } from './libs/useLocalStorage';
import CreateKeep from './component/CreateKeep';
import Keep from './component/Keep';
import EditKeep from './component/EditKeep';

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
`;

const RowContainer = styled.div`
width: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: center;
padding: 24px;
`;

function App() {

  const [keeps, setKeeps] = useLocalStorage([], 'keeps');
  const [selectedKeep, setSelectedKeep] = useState({ title: "", content: "", id: "" });
  const [modalType, setModalType] = useState(null);

  // Open Modal
  const onCreate = () => {
    setModalType('Create');
  };

  // Open Modal
  const onEdit = (editData) => {
    setModalType('Edit');
    setSelectedKeep(editData);
  };

  // set to localStorage
  const handleAddKeep = (newKeep) => {
    setKeeps((keeps) => [...keeps, newKeep]);
    console.log(`Add Keep`)
  };

  // update to localStorage
  const handleEditKeep = (editKeep) => {
    setKeeps(keeps => keeps.map((keep) => {
      return keep.id === editKeep.id ? editKeep : keep;
    }));
    // console.log(`Edited Keep ${editKeep.id}`);
  };

  // delete from localStorage
  const handleDeleteKeep = (id) => {
    setKeeps((keeps) => keeps.filter((note) => note.id !== id));
    // console.log(`Delete Keep ${id}`);
  };

  return (
    <Container>
      <Header title={'Keep'} onCreate={onCreate} />
      <RowContainer>
        {keeps.map((x) => {
          return (
            <Keep
              key={x.id}
              data={x}
              onDelete={handleDeleteKeep}
              onEdit={onEdit}
            />
          )
        })}
      </RowContainer>

      {/* Modal */}
      <CreateKeep onAddKeep={handleAddKeep} modalType={modalType} setModalType={setModalType} />
      <EditKeep data={selectedKeep} onEditKeep={handleEditKeep} modalType={modalType} setModalType={setModalType} />
    </Container>
  );
}

export default App;
