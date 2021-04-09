import {useState, useEffect} from "react";
import API from "../../Config/API";
import PropTypes from "prop-types";
import * as TMDBCases from './TMDBCases';
import {APIKey} from "../../Config/TMDB";

export const useTMDB = (props) => {
    const { type, mediaType, timeWin, query, id, num, num2, category= "movie"} = props 
    console.log(mediaType, category);
    const [result, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function requestFunc (adjustedUrl){
            setLoading(true);
          return await API().get(adjustedUrl).then((res) =>{
                    setData(res);
                    setLoading(false);
                }).catch(() => {
                    setData([]);
                    setLoading(false);
                });
        }

        switch(type){
            case TMDBCases.netflix_originals:
                requestFunc(`/discover/tv?api_key=${APIKey}&with_networks=213`);
            break;
            case TMDBCases.trending:
                requestFunc(`/trending/${category}/${timeWin}?api_key=${APIKey}`);
            break;
            case TMDBCases.actionMovies:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=28`);
            break;
            case TMDBCases.comedyMovies:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=35`);
            break;
            case TMDBCases.crime:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=80`);
            break;
            case TMDBCases.animation:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=16`);
            break;
            case TMDBCases.adventure:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=12`);
            break;
            case TMDBCases.drama:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=18`);
            break;
            case TMDBCases.family:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=10751`);
            break;
            case TMDBCases.fantasy:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=14`);
            break;
            case TMDBCases.history:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=36`);
            break;
            case TMDBCases.music:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=10402`);
            break;
            case TMDBCases.mystery:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=9648`);
            break;
            case TMDBCases.science:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=878`);
            break;
            case TMDBCases.tvMovie:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=10770`);
            break;
            case TMDBCases.thriller:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=53`);
            break;
            case TMDBCases.war:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=10752`);
            break;
            case TMDBCases.western:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=37`);
            break;
            case TMDBCases.horrorMovies:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=27`);
            break;
            case TMDBCases.romanceMovies:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=10749`);
            break;
            case TMDBCases.documentariesMovies:
                requestFunc(`/discover/${category}?api_key=${APIKey}&with_genres=99`);
            break;
            case TMDBCases.genres:
                if(query){
                     requestFunc(`/genre/${category}/list?api_key=${APIKey}${query}`);
                }else{
                    requestFunc(`/genre/${category}/list?api_key=${APIKey}`);
                }
               
            break;
            case TMDBCases.certifs:
                requestFunc(`/certification/${category}/list?api_key=${APIKey}`);
            break;
            case TMDBCases.changed:
                if(query){
                    requestFunc(`/${category}/changes?api_key=${APIKey}${query}`);
                }else{
                    requestFunc(`/${category}/changes?api_key=${APIKey}`);
                }
                
            break;
            case TMDBCases.collection:
                if(query){
                     requestFunc(`/collection/${id}?api_key=${APIKey}${query}`);    
                }else{
                    requestFunc(`/collection/${id}?api_key=${APIKey}`);    
                }
               
            break;
            case TMDBCases.company:
                requestFunc(`/company/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.credit:
                requestFunc(`/credit/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.discover:
                if(query){
                     requestFunc(`/discover/${category}?api_key=${APIKey}${query}`);   
                }else{
                    requestFunc(`/discover/${category}?api_key=${APIKey}`);   
                }
                
            break;
            case TMDBCases.find:
                requestFunc(`/find/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.keyword:
                requestFunc(`/keyword/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.list:
                requestFunc(`/list/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.movie:
                requestFunc(`/movie/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.network:
                requestFunc(`/network/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.person:
                requestFunc(`/person/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.tv:
                requestFunc(`/tv/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.review:
                requestFunc(`/review/${id}?api_key=${APIKey}`);    
            break;
            case TMDBCases.tvSeason:
                requestFunc(`/tv/${id}/season/${num}?api_key=${APIKey}`);    
            break;
            case TMDBCases.tvEpisode:
                requestFunc(`/tv/${id}/season/${num}/episode/${num2}?api_key=${APIKey}`);    
            break;
            case TMDBCases.tvEpisodeGroup:
                requestFunc(`/tv/episode_group/${id}/?api_key=${APIKey}`);    
            break;
            case TMDBCases.topRated:
                if(query){
                    requestFunc(`/${category}/top_rated?api_key=${APIKey}${query}`);    
                }else{
                    requestFunc(`/${category}/top_rated?api_key=${APIKey}`);  
                }
                
            break;
            default:
                requestFunc(`/discover/${id}?api_key=${APIKey}&with_networks=213`);
        }
    },[type, category]);
    return {result, loading};
}

useTMDB.propTypes = {
    type: PropTypes.string,
    mediaType: PropTypes.string,
    timeWin: PropTypes.string,
    query: PropTypes.string,
    id: PropTypes.string,
    num: PropTypes.string,
    num2: PropTypes.string,
    category: PropTypes.string
}