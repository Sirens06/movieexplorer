import { useEffect, useState } from 'react'
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import Slider from 'react-slick';

const FavMovies = () => {
  const [favoritesMovs, setFavoritesMovs] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favMovies')) || [];
    setFavoritesMovs(favorites);
  }, []);

  return (
    <Container>
      <h2 style={({
        textAlign: 'center'
      })}>Favorites Movies</h2>
      <Card>
        <Slider slidesToShow={4} slidesToScroll={1} arrows>
          {favoritesMovs.length === 0 ? (
            <p>Nessun preferito</p>
          ) : (
            favoritesMovs.map(favMovie => {
              return <MovieCard key={favMovie.id} movie={favMovie} type="movie"></MovieCard>
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

export default FavMovies