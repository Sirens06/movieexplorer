import React from 'react';
import styled from 'styled-components';
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const MovieCard = (props) => {
  const { movie, type } = props
  const navigate = useNavigate();

  const handleAddToFavorites = (movie) => {
    const favType = type === "movie" ? "favMovies" : "favTvSeries";
    const favorites = JSON.parse(localStorage.getItem(favType)) || [];

    // Aggiungi o rimuovi dai preferiti
    if (!favorites.some(fav => fav.id === movie.id)) {
      favorites.push(movie);
      localStorage.setItem(favType, JSON.stringify(favorites));
      alert(`${type === 'movie' ? "Film" : "Serie"} aggiunto ai preferiti!`);
    } else {
      const updatedFavs = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem(favType, JSON.stringify(updatedFavs));
      alert(`${type === 'movie' ? "Film" : "Serie"} già presente nei preferiti, ora è stato rimosso!`);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card onClick={() => navigate(`/${type}/${movie.id}`)}>
      <ImagePoster src={posterUrl} alt={`${type} Background Image`} />
      <CiHeart
        style={{
          color: 'white',
          fontSize: '1.25rem',
          position: 'absolute',
          bottom: '25px',
          right: '20px',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.stopPropagation(); // blocca il navigate
          handleAddToFavorites(movie);
        }}
        title="Aggiungi ai preferiti"
      />
    </Card>
  );
};

const Card = styled.div`
  padding: 1rem;
  position: relative;
  cursor: pointer;
`;

const ImagePoster = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default MovieCard;
