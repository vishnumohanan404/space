import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../assets/logo.png'

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
`

const LogoImg = styled.div`
    width: 38px;
    height: 38px;

    img{
        width: 100%;
        height: 100%;
    }
`

const LogoText = styled.h2`
    font-size: 22px;
    margin: 0;
    margin-left: 4px;
    font-weight:600;
    color: #222;
    font-family: 'Nunito', sans-serif;
`;

export default function Logo(props) {
    return (
        <Link to="/" style={{ textDecoration: 'none' }}> 
       <LogoWrapper>
           <LogoImg>
               <img src={logo} alt="space" />
           </LogoImg>
           <LogoText>
               SPACE
           </LogoText>
       </LogoWrapper>
        </Link>
    )
}
