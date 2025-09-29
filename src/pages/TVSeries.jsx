import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import tmdbService from '../service/tmdb.service';
import MovieCard from '../components/MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const TVSeries = () => {
    const [tvSeries, setTvSeries] = useState([])
    const [upcomingTvSeries, setUpcomingTvSeries] = useState([])

    useEffect(() => {
        // Esempio di chiamata al servizio TMDB
        // Puoi rimuovere questo esempio se non ti serve
        const fetchData = async () => {
            const data = await tmdbService.getPopularTvSeries({
                language: 'it-IT',
                page: 1
            });
            setTvSeries(data.results || []);
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchUpcoming = async () => {
            const data = await tmdbService.getOnTheAirSeries({
                language: 'it-IT'
            })
            setUpcomingTvSeries(data.results || [])
        };
        fetchUpcoming();
    }, [])// [se mettiamo un dato qui dentro si esegue ogni volta che il dato cambia, ad esempio upcomingmovies cambierebbe ogni qualvolta cambia il dato, se si lascia vuoto esegue solo una volta]);

    if (!tvSeries) return <div style={{ color: 'white' }}>Loading...</div>;
    if (!upcomingTvSeries) return <div style={{ color: 'white' }}>Loading...</div>;
    return (
        <Container>
            <Card>
                <h2>Popular Tv Series</h2>
                <Slider slidesToShow={6}
                    slidesToScroll={2}
                    arrows>
                    {tvSeries.map(tvSerie => {
                        return <MovieCard key={tvSerie.id} movie={tvSerie} type="tv"/>
                    })}
                </Slider>
            </Card>
            <Card>
                <h2>Upcoming Tv Series</h2>
                <Slider slidesToShow={6} slidesToScroll={2} arrows>
                    {upcomingTvSeries.map(upcomingTvSerie => {
                        return <MovieCard key={upcomingTvSerie.id} movie={upcomingTvSerie} type="tv"/>
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

export default TVSeries