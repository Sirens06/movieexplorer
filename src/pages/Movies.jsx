import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import tmdbService from '../service/tmdb.service';
import MovieCard from '../components/MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Movies = () => {
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
            const data = await tmdbService.getUpcomingMovies({
                language: 'it-IT'
            })
            setUpcomingMovies(data.results || [])
        };
        fetchUpcoming();
    }, [])// [se mettiamo un dato qui dentro si esegue ogni volta che il dato cambia, ad esempio upcomingmovies cambierebbe ogni qualvolta cambia il dato, se si lascia vuoto esegue solo una volta]);

    if (!movies) return <div style={{ color: 'white' }}>Loading...</div>;
    if (!upcomingMovies) return <div style={{ color: 'white' }}>Loading...</div>;
    return (
        <Container>
            <Card>
                <h2>Popular Movies</h2>
                <Slider slidesToShow={6}
                    slidesToScroll={2}
                    arrows>
                    {movies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie} type="movie"/>
                    })}
                </Slider>
            </Card>
            <Card>
                <h2>Upcoming Movies</h2>
                <Slider slidesToShow={6} slidesToScroll={2} arrows>
                    {upcomingMovies.map(upcomingMovie => {
                        return <MovieCard key={upcomingMovie.id} movie={upcomingMovie} type="movie"/>
                    })}
                </Slider>

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

/* BACKTICK ` */

export default Movies