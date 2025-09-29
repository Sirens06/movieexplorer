import { useEffect, useState } from 'react'
import styled from 'styled-components';
import Movies from './Movies';
import TVSeries from './TVSeries';
import tmdbService from '../service/tmdb.service';
import MovieCard from '../components/MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = ({ searchResults }) => {
  const [movies, setMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])

  useEffect(() => {
    // Esempio di chiamata al servizio TMDB
    // Puoi rimuovere questo esempio se non ti serve
    const fetchData = async () => {
      const data = await tmdbService.getPopularMovies({
        language: 'it-IT',
        page: 1
      });
      setMovies(data.results || []);
    };
    fetchData();
  }, [])

  useEffect(() => {
    const fetchUpcoming = async () => {
      const data = await tmdbService.getUpcomingMovies()
      setUpcomingMovies(data.results || [])
    };
    fetchUpcoming();
  }, [])// [se mettiamo un dato qui dentro si esegue ogni volta che il dato cambia, ad esempio upcomingmovies cambierebbe ogni qualvolta cambia il dato, se si lascia vuoto esegue solo una volta]);

  if (!movies) return <div style={{ color: 'white' }}>Loading...</div>;
  if (!upcomingMovies) return <div style={{ color: 'white' }}>Loading...</div>;
  return (
    <Container>
      <Card>
        {searchResults.length > 0 ? (
          <>
            <ResultsGrid>
              {searchResults.map((item) => {
                return <MovieCard key={item.id} movie={item}></MovieCard>  
              })}
            </ResultsGrid>
          </>
        ) : (
          <>
            <Movies />
            <TVSeries />
          </>
        )}
      </Card>
      <Card>
      </Card>
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
  border-radius: 8px;

  h2 {
    color: white;
  }`
const Card = styled.div`
  padding: 2rem;
  border-radius: 8px;

  h2 {
    color: white;
  }
`
const Popular = styled.div`
  display:flex;
`
const Upcoming = styled.div`
  display:flex;
`

const ResultsGrid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap:1rem;
`;

/* BACKTICK ` */

export default Home