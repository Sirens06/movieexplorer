import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import Slider from 'react-slick';

const WatchlistTvs = () => {
    const [watchedTvs, setWatchedTvs] = useState([])

    useEffect(() => {
        const watched = JSON.parse(localStorage.getItem('watchedTvs') || "[]");
        setWatchedTvs(watched);
    }, [])

    return (
        <Container>
            <h2 style={({
                textAlign: 'center'
            })}>Watched Tv Series</h2>
            <Card>
                <Slider slidesToShow={8} slidesToScroll={2} arrows>
                    {watchedTvs.length === 0 ? (
                        <p>Nessun preferito</p>
                    ) : (
                        watchedTvs.map(watchedTv => {
                            return <MovieCard key={watchedTv.id} movie={watchedTv} type="tv"></MovieCard>
                        })
                    )}
                </Slider>
            </Card>
        </Container>
    )
}

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


export default WatchlistTvs