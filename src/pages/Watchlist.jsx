import React from 'react'
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WatchlistMov from '../components/WatchlistMov';
import WatchlistTvs from '../components/WatchlistTvs';

const Watchlist = () => {

  return (
    <Container>
      <Card>
        <WatchlistMov />
        <WatchlistTvs />
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
  width:100% !important;

  h2 {
    color: white;
  }
`

export default Watchlist