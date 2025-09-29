import React, { useState } from 'react'
import styled from 'styled-components';
import { SiTicktick } from "react-icons/si";

const EpisodeCard = ({ episode, expanded, setExpanded, seriesId }) => {

    const posterUrl = episode.still_path
        ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
        : 'Background Image';

    const notExpandedDescription = episode.overview?.slice(0, 70) + '...';

    const [isWatched, setIsWatched] = useState(() => {
        const watched = JSON.parse(localStorage.getItem("watchedEpisode")) || {};
        return watched[seriesId]?.includes(episode.id) || false;
    })

    const toggleWatched = () => {
        let watched = JSON.parse(localStorage.getItem("watchedEpisode")) || {};

        if (!watched[seriesId]) watched[seriesId] = [];

        const alreadyWatched = watched[seriesId].includes(episode.id)

        if (!alreadyWatched) {
            watched[seriesId].push(episode.id)
            alert(`Episodio aggiunto ai preferiti!`);
        } else {
            watched[seriesId] = watched[seriesId].filter(id => id !== episode.id);
            alert(`Episodio già presente nei preferiti, ora è stato rimosso!`);
        }
        //aggiorna lo stato di isWatched a ciascun click settando il contrario dello stato attuale
        /*const newState = !isWatched;*/
        //uso lo usestate per settarlo sulla proprietà
        localStorage.setItem("watchedEpisode", JSON.stringify(watched))
        setIsWatched(!alreadyWatched);
    }
    return (
        <Card>
            <ImagePoster src={posterUrl} alt={episode.name} />
            <Title>{episode.episode_number}-{episode.name}</Title>
            <WatchedWrapper onClick={toggleWatched}>
                <WatchedIcon isWatched={isWatched} />
                <span style={{ marginLeft: '0.5rem' }}>
                    {isWatched ? 'Watched' : 'To Watch'}
                </span>
            </WatchedWrapper>
            <Description>{
                expanded ? episode.overview : notExpandedDescription}
            </Description>
            <Button onClick={() => setExpanded(!expanded)}>
                {expanded ? "Leggi meno" : "Leggi altro"}
            </Button>
        </Card>
    )
}
const Card = styled.div`
    width: 200px;
    height: 250px;
    border-radius: 10px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: transform 0.3s ease;
    margin: 1rem;

  &:hover {
    transform: scale(1.03);
  }
`;

const WatchedWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  color: #ffffffff;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0rem !important;

  &:focus,
  &:active,
  &:focus-visible {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

const WatchedIcon = styled(SiTicktick)`
  background: transparent;
  border: none;
  color: ${({ isWatched }) => (isWatched ? 'green' : '#ffffff')};
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  padding: 0rem !important;
`;

const ImagePoster = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  height: 140px; /* meno alta per dare spazio a titolo+descrizione */
`;

const Title = styled.h4`
  margin: 0.5rem 0 0.25rem 0;
  font-size: 0.8rem;
  text-align: center;
`;

const Description = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.65rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* max 3 righe */
  -webkit-box-orient: vertical;
  text-align: center;
`;


export default EpisodeCard