import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import tmdbService from '../service/tmdb.service';
import DetailMenu from '../components/DetailMenu';
import DetailFooter from '../components/DetailFooter';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import OverviewTab from '../components/OverviewTab';
import DetailsTab from '../components/DetailsTab';
import CastTab from '../components/CastTab';
import TrailerTab from '../components/TrailerTab';

const ContentDetail = () => {

  const { id, type } = useParams();

  const [contentDetail, setContentDetail] = useState(null)
  const [activeTab, setActiveTab] = useState('Overview');
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await tmdbService.getMovieDetails(id);
        if (type === 'movie') {
          data = await tmdbService.getMovieDetails(id);
        } else if (type === 'tv') {
          data = await tmdbService.getTvSeriesDetails(id);
        }
        setContentDetail(data);
      } catch (error) {
        console.error("Errore nel fetch dei dettagli del film:", error);
      }
    };
    fetchData();
  }, [id, type])

  const Img_Base_URL = 'https://image.tmdb.org/t/p/original';

  if (!contentDetail) return <div style={{ color: 'white' }}>Loading...</div>;

  const backdropUrl = contentDetail.backdrop_path ? `${Img_Base_URL}${contentDetail.backdrop_path}` : null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <OverviewTab
            title={type === 'movie' ? contentDetail.title : contentDetail.name}
            type={type}
            expanded={expanded}
            setExpanded={setExpanded}
            contentDetail={contentDetail}
          />
        );
      case 'Details':
        return (
          <DetailsTab></DetailsTab>
        );
      case 'Cast':
        return (
          <CastTab></CastTab>
        );
      case 'Trailer':
        return (
          <TrailerTab></TrailerTab>
        );
      default:
        return null;
    }
  }

  return (
    <div>
      <header
        style={{
          height: '70vh',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          width:'100%'
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0, // shorthand per top/left/right/bottom:0
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))',
          }}
        />
        <div style={{
          position: 'absolute',
          top: '4.25rem',
          left: '2rem',
          zIndex: 2,
        }}>
          <Button onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </Button>
        </div>
        <div>
          {renderTabContent()}
        </div>
        <DetailMenuContainer>
          <DetailMenu
            activeTab={activeTab}
            onTabClick={setActiveTab} 
            />
            {/*qui si passano sempre i parametri che inseriamo ad es activeTab, anche nella
            funzione dove è creata la funzione nelle () dopo => */} 
        </DetailMenuContainer>
      </header>
      <DetailFooter id={id} type={type} />
    </div>
  )
}

const Button = styled.button`
  background: transparent;
  border: none;
  color: #ffffffff; // verde tipo Spotify
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  padding: 0rem !important;  

  &:focus,
  &:active,
  &:focus-visible{
    outline: none !important;
    border:none !important;
    box-shadow: none !important;
    }
`

const DetailMenuContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`

export default ContentDetail