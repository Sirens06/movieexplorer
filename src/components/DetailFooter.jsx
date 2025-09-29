import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard';
import tmdbService from '../service/tmdb.service';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const DetailFooter = ({ id, type }) => {
    const [similar, setSimilar] = useState([]);
    console.log("DetailFooter id: " + id);
    console.log("DetailFooter type: " + type);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (type === 'movie') {
                    data = await tmdbService.getSimilarMovies(id);
                } else if (type === 'tv') {
                    data = await tmdbService.getSimilarTvSeries(id)
                }
                setSimilar(data?.results ?? [])
            } catch (error) {
                console.log("Errore nel fetch dei dettagli del film:", error);
                setSimilar([])
            }
        };
        fetchData();
    }, [id, type]
    )

    if (similar.length === 0) return <div>Loading...</div>

    return (
     <Container>
      <h2 style={({
        textAlign: 'center'
      })}>Similar {type}s</h2>
      <Card>
        <Slider slidesToShow={6} slidesToScroll={2} arrows>
          {similar.length === 0 ? (
            <p>Nessun preferito</p>
          ) : (
            similar.map(sim => {
              return <MovieCard key={sim.id} movie={sim} type={type}></MovieCard>
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
  padding:2rem;

  h2 {
    color: white;
  }`

const Card = styled.div`
  padding-top: 0rem;
  padding: 0rem 2rem 0rem 2rem;
  border-radius: 8px;

  h2 {
    color: white;
  }
`

export default DetailFooter