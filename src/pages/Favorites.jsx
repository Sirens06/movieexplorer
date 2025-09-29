import React from 'react'
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FavMovies from './FavMovies';
import FavTvSeries from './FavTVSeries';

const Favorites = () => {

  return (
    <Container>
      <Card>
        <FavMovies />
        <FavTvSeries />
      </Card>
    </Container>

  )
}
const Container = styled.div`
  padding-top: 4rem;
  border-radius: 8px;

  h2 {
    color: white;
  }`

const Card = styled.div`
  padding-top: 0rem;
  border-radius: 8px;
  width:100vh !important;

  h2 {
    color: white;
  }
`

export default Favorites