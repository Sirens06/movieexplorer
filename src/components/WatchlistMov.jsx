import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WatchlistMovs = () => {
    const [watchedMovs, setWatchedMovs] = useState([]);

    useEffect(() => {
        const watched = JSON.parse(localStorage.getItem('watchedMovs') || "[]");
        setWatchedMovs(watched);
    }, []);

    return (
        <Container>
            <Card>
                <h2>Watched Movies</h2>
                {watchedMovs.length === 0 ? (
                    <p style={{ color: 'white', textAlign: 'center' }}>Nessun preferito</p>
                ) : (
                    <Slider
                        slidesToShow={8}
                        slidesToScroll={2}
                        arrows
                    >
                        {watchedMovs.map(movie => (
                            <MovieCard key={movie.id} movie={movie} type="movie" />
                        ))}
                    </Slider>
                )}
            </Card>
        </Container>
    );
};

const Container = styled.div`
  width: 100%;
  overflow: hidden; // evita che le frecce vengano tagliate
`;

const Card = styled.div`
  margin-bottom: 3rem;
  width: 100%; // importantissimo per lo slider

  h2 {
    color: white;
    margin-bottom: 1rem;
  }
`;


export default WatchlistMovs;
