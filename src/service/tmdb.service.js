import getService from "./http.service";
import { 
    movieUrl, 
    movieInfosUrl, 
    generateUrl, 
    upcomingUrl, 
    topRatedUrl,
    tvSeriesUrl,
    topRatedTvSeriesUrl,
    onTheAirSeries,
    tvSeriesInfosUrl,
    similarTvSeriesUrl,
    similarMoviesUrl,
    seasonsDetails,
    multiSearchUrl
} from "./url";

/*MOVIES API CALLS */
const getPopularMovies = async () => {
    console.log("getPopularMovies called");
    const url = generateUrl(movieUrl);
    return await getService(url);
};

const getMovieDetails = async (id) => {
    console.log("getMovieDetails called for id: " + id);
    const url = generateUrl(movieInfosUrl(id));
    return await getService(url);
};

const getTopRatedMovies = async () => {
    console.log("getTopRatedMovies called");
    const url = generateUrl(topRatedUrl);
    return await getService(url);
};

const getSimilarMovies = async (id) => {
    console.log("getSimilarMovies called");
    const url = generateUrl(similarMoviesUrl(id)) 
    return await getService(url)
};
/*ENDED MOVIES*/

/*TV SERIES API CALLS */
const getPopularTvSeries = async () => {
    console.log("getPopularTvSeries called");
    const url = generateUrl(tvSeriesUrl);
    return await getService(url);
};

const getTvSeriesDetails = async (id) => {
    console.log("getTvSeriesDetails called for id: " + id);
    const url = generateUrl(tvSeriesInfosUrl(id));
    return await getService(url);
};

const getTopRatedTvSeries = async () => {
    console.log("getTopRatedTvSeries called");
    const url = generateUrl(topRatedTvSeriesUrl);
    return await getService(url);
};

const getUpcomingMovies = async () => {
    console.log("getUpcomingMovies called");
    const url = generateUrl(upcomingUrl)
    return await getService(url)
};

const getOnTheAirSeries = async () => {
    console.log("getUpcomingTvSeries called");
    const url = generateUrl(onTheAirSeries)
    return await getService(url)
};

const getSimilarTvSeries = async (id) => {
    console.log("getSimilarTvSeries called");
    const url = generateUrl(similarTvSeriesUrl(id)) 
    return await getService(url)
};

const getSeasonsDetails = async (id, season) => {
    console.log("getSeasonsDetails called");
    const url = generateUrl(seasonsDetails(id, season)) 
    return await getService(url)
};
/*SERIES ENDED */

/*SEARCH MULTI MOVIES, TVSERIES & PEOPLE IN ONE API CALL */
const multiSearch = async (query, page = 1) => {
    console.log("multiSearch called");
    const params = [
        {key: 'query', value: query},
        {key: 'page', value: page.toString()}
    ];
    const url = generateUrl(multiSearchUrl, params);
    return await getService(url)
}

export default {
    getPopularMovies,
    getMovieDetails,
    getTopRatedMovies,
    getUpcomingMovies,
    getSimilarMovies,
    getPopularTvSeries,
    getTvSeriesDetails,
    getTopRatedTvSeries,
    getOnTheAirSeries,
    getSimilarTvSeries,
    getSeasonsDetails,
    multiSearch
};