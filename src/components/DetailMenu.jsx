import React from 'react'
import styled from 'styled-components';

const DetailMenu = ({activeTab, onTabClick}) => {
    const menuItems = ['Overview', 'Details', 'Cast', 'Trailer']

    return (
        <MenuContainer>
            {menuItems.map((item) => (
                <MenuLink MenuLink
                    key={item}
                    $isActive={activeTab === item}
                    onClick={() => onTabClick(item)}>
                    {item}
                </MenuLink>
            ))}
        </MenuContainer >
    )
}

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;       
`
const MenuLink = styled.a`
color:white;
text-decoration: none;
font-size: 1.25rem;
letter-spacing: 0.12rem;
cursor: pointer;
position: relative; //per posizionare la linea sotto

    &::after {
        content: ''; //serve per creare un elemento vuoto
        position: absolute; //lo posiziona relativamente al genitore che ha relative
        left: 50%; // questo + quello sotto lo centra orizzontalmente
        bottom: 2px;
        width: 90%;
        transform: translateX(-50%);
        border-radius: 1px;
        height: 2px;
        transition: background 0.3s ease-in-out;
        background: ${({ $isActive }) => ($isActive ? '#ff4757' : 'transparent')}
    }

    &:hover{
        color: #ff4757 !important; // cambia colore in hover
        transition: color 0.5s ease-in-out;
    }

    `



export default DetailMenu