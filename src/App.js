import React, { useState } from 'react';
import styled from "styled-components";
import Header from './component/Header';
import { useLocalStorage } from './libs/useLocalStorage';
import CreateKeep from './component/CreateKeep';
import Keep from './component/Keep';

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
  const [modalType, setModalType] = useState(null);

  const onCreate = () => {
    setModalType('Create');
  };

  const onEdit = () => {
    setModalType('Edit');
  };

  const handleAddKeep = (newKeep) => {
    setKeeps((keeps) => [...keeps, newKeep]);
    console.log(`Add Keep`)
  };

  const handleDeleteKeep = (id) => {
    setKeeps((keeps) => keeps.filter((note, i) => i !== id));
    console.log(`Delete Keep ${id}`);
  };

  return (
    <Container>
      <Header title={'Keep'} onCreate={onCreate} />
      <RowContainer>
        {keeps.map((x, i) => {
          return (
            <Keep
              key={i}
              id={i}
              data={x}
              onDelete={handleDeleteKeep}
            />
          )
        })}
      </RowContainer>

      <CreateKeep onAddKeep={handleAddKeep} modalType={modalType} setModalType={setModalType} />
    </Container>
  );
}

export default App;
