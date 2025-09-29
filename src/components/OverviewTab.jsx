import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { SiTicktick } from "react-icons/si";

const OverviewTab = ({ contentDetail, type, expanded, setExpanded }) => {
    const [isWatched, setIsWatched] = useState(false)
    const notExpandedOverview = contentDetail.overview?.slice(0, 175) + '...';
    const releaseYear = type === 'movie'
        ? (contentDetail.release_date ? contentDetail.release_date.slice(0, 4) : 'N/A')
        : (contentDetail.first_air_date ? contentDetail.first_air_date.slice(0, 4) : 'N/A')

    //Faccio questo per far si che quando si monta il component controlla il localstorage
    useEffect(() => {
        const watchType = type === "movie" ? "watchedMovs" : "watchedTvs";
        const watched = JSON.parse(localStorage.getItem(watchType)) || []; 
        const alreadyWatched = watched.some(item => item.id === contentDetail.id)
        setIsWatched(alreadyWatched)
    }, [contentDetail.id, type]);

    //qui gestisco il click invece quando richiamo l'icon nella ui
    const toggleWatched = () => {
        const watchType = type === "movie" ? "watchedMovs" : "watchedTvs";
        let watched = JSON.parse(localStorage.getItem(watchType)) || []; 
        const alreadyWatched = watched.some(item => item.id === contentDetail.id)

        if(!alreadyWatched){
            const item = {
                id: contentDetail.id,
                title: contentDetail.title || contentDetail.name,
                poster_path: contentDetail.poster_path || contentDetail.backdrop_drop || '',
                vote_average: contentDetail.vote_average,
                release_date: contentDetail.release_date,
                first_air_date: contentDetail.first_air_date,
                type
            }
            watched.push(item);
            alert(`${type === 'movie' ? "Film" : "Serie"} aggiunto ai preferiti!`);
        } else {
            watched = watched.filter(watch => watch.id !== contentDetail.id);
            alert(`${type === 'movie' ? "Film" : "Serie"} già presente nei preferiti, ora è stato rimosso!`);
        }
        //aggiorna lo stato di isWatched a ciascun click settando il contrario dello stato attuale
        /*const newState = !isWatched;*/
        //uso lo usestate per settarlo sulla proprietà
        localStorage.setItem(watchType, JSON.stringify(watched))
        setIsWatched(!alreadyWatched);
    }    

    const title = type === 'movie' ? contentDetail.title : contentDetail.name;

    const getDurationInfo = () => {
        if (type === 'movie') {
            return contentDetail.runtime ? `${contentDetail.runtime}min` : 'N/A';
        } else {
            const seasons = contentDetail.number_of_seasons;
            const episodes = contentDetail.number_of_episodes;
            return seasons && episodes ? `${seasons} stagioni, ${episodes} episodi` : 'N/A';
        }
    }

    const getAddInfo = () => {
        if (type === 'tv') {
            const status = contentDetail.status === 'Ended' ? 'Terminata' :
                contentDetail.status === 'Returning Series' ? 'In corso' : contentDetail.status;

            return (
                <p style={(
                    { fontWeight: 'bold', marginBottom: '0.5rem', padding: '0rem 0rem' }
                )}> Stato: {status}</p>
            )
        }
    }
    return (
        <>
            {/* Contenuto testo */}
            <div style={{
                position: 'relative', // per stare sopra l'overlay
                maxWidth: '800px',
                marginLeft: '2rem',   // spostamento dal bordo
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
            }
            }
            >
                <h1 style={{ fontSize: '3rem', marginBottom: '0rem', marginTop: '4rem' }}>
                    {title}
                </h1>
                <WatchedWrapper onClick={toggleWatched}>
                    <WatchedIcon isWatched={isWatched}/>
                    <span style={{marginLeft: '0.5rem'}}>
                        {isWatched ? 'Watched' : 'To Watch'}
                    </span>
                </WatchedWrapper>
                <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {getDurationInfo()} - {releaseYear}
                </p>
                {getAddInfo()}
                <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                    Voto: {contentDetail.vote_average.toFixed(1)}/10
                </p>
                <p
                    style={{
                        lineHeight: "1.5rem",
                        maxWidth: "500px",
                        whiteSpace: "normal",
                        marginTop: "0.5rem",
                    }}
                >
                    {expanded ? contentDetail.overview : notExpandedOverview}
                </p>
                <Button onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Leggi meno" : "Leggi altro"}
                </Button>
                <p
                    style={{
                        fontWeight: "normal",
                        marginBottom: "0.5rem",
                        padding: "1rem 0rem",
                    }}
                >
                    Genere: {contentDetail.genres.map((genre) => genre.name).join(", ")}
                </p>
            </div>
        </>
    )
}

const Button = styled.button`
  background: transparent;
  border: none;
  color: #ffffffff;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1rem;
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

// 🔹 Wrapper per allineare icona + testo
const WatchedWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0.5rem;
`;

const WatchedIcon = styled(SiTicktick)`
  background: transparent;
  border: none;
  color: ${({isWatched}) => (isWatched ? 'green' : '#ffffffff')};
  cursor: pointer;
  font-size: 1rem;
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

export default OverviewTab