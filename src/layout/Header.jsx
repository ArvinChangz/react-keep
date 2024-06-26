import React from 'react';
import styled from "styled-components";
import { TiLightbulb } from "react-icons/ti";

const HeaderContainer = styled.div`
height: 72px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: rgba(245, 224, 66, 0.4);
`;

const HeaderRow = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: transparent;
padding: 0px 16px;
`;

const HeaderText = styled.h1`
font-size: 36px;
margin-left: 10px;
`;

const Header = ({title}) => {
    return (
        <HeaderContainer>
            <HeaderRow>
                <TiLightbulb style={{width: 32, height: 32}} />
                <HeaderText>{title}</HeaderText>
            </HeaderRow>
        </HeaderContainer>
    )
}

export default Header