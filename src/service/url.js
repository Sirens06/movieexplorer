const API_URL = 'https://api.themoviedb.org';
const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWRhYzI4YTE3Mjg4OGZhMzU1ODJlNzcxOGM1MzQ2MCIsIm5iZiI6MTc1Njg5ODAzMy4yNzMsInN1YiI6IjY4YjgyMmYxYTYwNTgyODFkNzFmMzlkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ip6HdTan7cL1ghvbD2PyOykUJRs9Zmp-OTeJcywIwzQ';
const apiKey = import.meta.env.VITE_MOVIE_APIKEY;
/*MOVIES*/
const movieUrl = '/3/movie/popular';
const complexSearchUrl = '/3/search/movie';
const topRatedUrl = '/3/movie/top_rated';
const upcomingUrl = '/3/movie/upcoming';
const movieInfosUrl = (id) => `/3/movie/${id}`
const similarMoviesUrl = (id) => `/3/movie/${id}/similar`

/*TV SERIES*/
const tvSeriesUrl = '/3/tv/popular';
const tvSeriescomplexSearchUrl = '/3/search/tv';
const topRatedTvSeriesUrl = '/3/tv/top_rated';
const onTheAirSeries = '/3/tv/on_the_air';
const tvSeriesInfosUrl = (id) => `/3/tv/${id}`
const similarTvSeriesUrl = (id) => `/3/tv/${id}/similar`
const seasonsDetails = (id, season) => `/3/tv/${id}/season/${season}`
/*SEARCH BASED ON TYPE */
const multiSearchUrl = `/3/search/multi`

const generateUrl = (endpoint, params = []) => {
    console.log("Generate url called with:" + apiKey)
    const urlWithAuth = `${API_URL}${endpoint}?api_key=${apiKey}`;
    console.log("URL with auth: " + urlWithAuth);
    
    if(params && params.length > 0) {
        let paramsUrl = new URLSearchParams();
        params.forEach(param => {
            paramsUrl.append(param.key, param.value);
        });
        return `${urlWithAuth}&${paramsUrl.toString()}`;
    }
    return urlWithAuth;
}

export { 
    API_URL, 
    movieUrl, 
    complexSearchUrl, 
    topRatedUrl, 
    upcomingUrl, 
    tvSeriesUrl,
    tvSeriescomplexSearchUrl,
    topRatedTvSeriesUrl,
    onTheAirSeries,
    tvSeriesInfosUrl,
    movieInfosUrl,
    similarTvSeriesUrl, 
    similarMoviesUrl,
    seasonsDetails,
    multiSearchUrl,
    generateUrl };