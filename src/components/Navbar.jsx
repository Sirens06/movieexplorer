import React, { useState } from 'react'
import styled from 'styled-components';
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import logo from '../assets/movieExplorer.png';

const Navbar = ({searchValue, setSearchValue, handleKeyPress, setSearchResults}) => {
  const [clicked, setClicked] = useState(false);

  const onIconClick = () => {
    setClicked(true);
    console.log("clicked search: ", clicked);
  }
  const onCloseClick = () => {
    setClicked(false);
    setSearchValue('');
    setSearchResults([])
    console.log("clicked close: ", clicked);
  }

  return (
    <Nav>
      <LeftNav>
        <NavLink to='/'>
          <img src={logo} alt='Logo' height={25} width={25}></img>
        </NavLink>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/movies'>Movies</NavLink>
        <NavLink to='/tvSeries'>Tv Series</NavLink>
        <NavLink to='/fav'>Favorites</NavLink>
        <NavLink to='/watchlist'>Watchlist</NavLink>
      </LeftNav>
      <RightNav>
        {clicked ? (
          <SearchWrapper>
            <SearchInput
              type='text'
              placeholder='Cerca qui film o serie tv...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyPress}>
            </SearchInput>
            <CloseIcon onClick={onCloseClick} />
          </SearchWrapper>
        ) : (
          <Search onClick={onIconClick} clicked={clicked} />
        )}
        <NavLink to='/contact-us'>Contact Us</NavLink>
      </RightNav>
    </Nav>
  )
}

const Nav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;      /* resta sempre in alto */
    top: 0;
    left: 0;
    width: 100%;          /* occupa tutta la larghezza */
    height: 60px;         /* altezza fascia */
    background-color: #111;  /* colore sfondo */
    display: flex;
    align-items: center;  /* centra verticalmente i link */
    z-index: 1000;        /* resta sopra al resto */
    `

const LeftNav = styled.div`
    display:flex;
    align-items: center;   
    `

const RightNav = styled.div`
    display:flex;
    align-items: center;   
    `

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 1rem;
    &:hover {
        color: #8a8989ff;
        transition: 0.5s ease-in-out;
        transform: scale(1.04);

    }
`

const SearchWrapper = styled.div`
  display:flex;
  align-items:center;
  margin-right:1rem;
  position: relative;
`

const SearchInput = styled.input`
  border: 1px solid grey;
  padding: 0.35rem 1.75rem;
  background: #111;
  margin-right: 0.45rem !important;
  transition: 0.5s ease-in-out;

   &:focus {
    outline: none;
  }
`

const Search = styled(IoIosSearch)`
    color: white;
    font-size: 1.15rem !important;
    text-decoration: none;
    cursor: pointer;
    font-weight: 700;
    padding: 1rem;

    &:hover {
        color: #8a8989ff;
        transition: 0.5s ease-in-out;
        transform: scale(1.04);
    }

    &:focus,
    &:active {
        transition: 0.5s ease-in-out;
    }
`

const CloseIcon = styled(IoClose)`
  color: white;
  position: absolute;
  margin-left: 0.35rem;
  cursor: pointer;

   &:hover {
      color: #8a8989ff;
      transition: 0.5s ease-in-out;
      transform: scale(1.04);
    }
`

export default Navbar