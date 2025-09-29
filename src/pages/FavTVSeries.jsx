import { useEffect, useState } from 'react'
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import Slider from 'react-slick';

const FavTvSeries = () => {
  const [favoritesTvSeries, setFavoritesTvSeries] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favTvSeries')) || [];
    setFavoritesTvSeries(favorites);
  }, []);

  return (
    <Container>
      <h2 style={({
        textAlign: 'center'
      })}>Favorites Tv Series</h2>
      <Card>
        <Slider slidesToShow={4} slidesToScroll={1} arrows>
          {favoritesTvSeries.length === 0 ? (
            <p>Nessun preferito</p>
          ) : (
            favoritesTvSeries.map(favTvSerie => {
              return <MovieCard key={favTvSerie.id} movie={favTvSerie} type="tv"></MovieCard>
            })
          )}
        </Slider>
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

export default FavTvSeries