import React, { useEffect, useState } from 'react'
import tmdbService from '../service/tmdb.service';
import { useParams } from 'react-router-dom';
import EpisodeCard from './EpisodeCard';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const DetailsTab = () => {
  const { id } = useParams();
  const [seasons, setSeasons] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [expanded, setExpanded] = useState(false)
  const [episodeLimit, setEpisodeLimit] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await tmdbService.getTvSeriesDetails(id);
        setSeasons(data.number_of_seasons || 0);
      } catch (error) {
        console.error("Errore nel fetch dei dettagli del film:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!selectedSeason) return;
    const fetchSeasonData = async () => {
      try {
        let data = await tmdbService.getSeasonsDetails(id, selectedSeason);
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error("Errore nel fetch degli episodi:", error);
      }
    };
    fetchSeasonData();
  }, [id, selectedSeason]);

  const numberOfSeasons = seasons > 0 ? Array.from({ length: seasons }, (_, i) => i + 1) : [];

  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 3,
    infinite: false,
    arrows: true,
    variableWidth: false,
    speed: 500,
    adaptiveHeight: false,
    beforeChange: (current, next) => {
      if(next + 5 >= episodeLimit && episodeLimit < episodes.length){
        setEpisodeLimit(prev => Math.min(prev + 10, episodes.length)) 
      }
    }
  };

  return (
    <SliderWrapper>
      <Wrapper>
        <select
          style={{
            position: 'absolute',
            right: '5rem',
            top: '5rem',
            padding: '0.5rem 1.25rem',
            fontFamily: `"Bebas Neue", sans-serif`
          }}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          value={selectedSeason}>
          <option disabled value="">Seleziona una stagione</option>
          {numberOfSeasons.map(season => (
            <option key={season} value={season}>
              Stagione {season}
            </option>
          ))}
        </select>

        {episodes.length > 0 ? (
          <StyledSlider {...sliderSettings}>
            {episodes.slice(0, episodeLimit).map((episode) => (
              <Slide key={episode.id}>
                <EpisodeCard 
                episode={episode} 
                setExpanded={setExpanded} 
                expanded={expanded} 
                seriesId={id}/>
              </Slide>
            ))}
          </StyledSlider>
        ) : (
          <p style={{ marginTop: "2rem" }}>Nessun episodio trovato</p>
        )}
      </Wrapper>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 1rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 95%;
  margin: 3rem auto 0 auto;
  padding: 1rem;
`;

const StyledSlider = styled(Slider)`
  /* Rimuovi l'altezza fissa dal track */
  .slick-track {
    width: 4200px !important;
    /* height: 16rem !important; ← RIMUOVI QUESTA LINEA */
    display: flex;
    align-items: stretch; /* Fa sì che tutti gli slide abbiano la stessa altezza */
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
    /* height: 290px !important; ← RIMUOVI O MODIFICA */
    min-height: 290px; /* Usa min-height invece di height fisso */
    
    /* Assicurati che il contenuto non vada a capo */
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .slick-prev, .slick-next {
    z-index: 10;
    &:before {
      color: white;
      font-size: 2rem;
    }
  }
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export default DetailsTab;

