import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import ContentDetail from './pages/ContentDetail';
import Watchlist from './pages/Watchlist';
import { useState } from 'react';
import tmdbService from './service/tmdb.service';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      console.log("Key Pressed");
      try {
        const data = await tmdbService.multiSearch(searchValue)
        setSearchResults(data.results || []);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  }

  return (
    <BrowserRouter>
      <Navbar 
      searchValue={searchValue} 
      setSearchValue={setSearchValue}
      handleKeyPress={handleKeyPress}
      setSearchResults={setSearchResults}/>
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults}/>} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvSeries" element={<TVSeries />} />
        <Route path="/:type/:id" element={<ContentDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/fav" element={<Favorites />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App
