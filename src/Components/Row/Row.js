import React, {useState, useRef} from 'react'
import Auxiliary from "../../Components/HOC/Auxiliary";
import PropTypes from "prop-types";
import { useTMDB } from "../../Hooks/useTMDB/useTMDB";
import "./Row.scss";
import defaultImg from "../../Assets/images/netflix-movie-preview-2021-and-beyond-min.jpeg";
import {baseImgURL} from "../../Config/TMDB";
import {truncateText} from "../../Utilities/TruncateText";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";
import {RiArrowLeftSLine, RiArrowDownLine , RiCheckboxCircleLine} from "react-icons/ri";
import Loader from "react-loader-spinner";
import {connect} from "react-redux";
import {MdAddCircleOutline} from "react-icons/md";
import {FiPlay} from "react-icons/fi";
import * as ActionTypes from "../../Store/ActionTypes/ActionTypes";
import {generateId} from "../../Utilities/GenerateId";
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";

const Row = (props) =>{
    const { title, queries, isLargeRow, setActiveRow, activeRow, currIndex, activeProfile, category, onAddingToList } = props; 
    console.log(activeProfile);
    const [chosenContent, setChosenContent]= useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [activeElementIndex, setElementIndex] = useState("");
    const listItems = useTMDB({...queries,category});
    const autoScroll = useRef(null);
    const contentBox = useRef(null);
    const isLoading = listItems && listItems?.loading;
    const resultItems = listItems && listItems.result?.data?.results;

    const onElClick = (item, i) =>{
        setChosenContent(item);
        setTrailerUrl("");
        setActiveRow(currIndex);
        setElementIndex(i);
        if(autoScroll && autoScroll?.current){
            autoScroll.current?.scrollIntoView({behavior: "smooth", block:"end"});
        }
    }
    const onTrailerPlay = (name) => {
        if(name){
             movieTrailer(name || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch((err) =>{
                setTrailerUrl("");
                alert(err);
            });
        }
        
    }  
    const ops = {
        width: "100%",
        height: "390px",
        playerVars: {
            autoplay: 1,
        }
    };
    const addToMyList = (content, type) => {
        if(activeProfile && chosenContent){
            onAddingToList({
            ...content,
                contentId: generateId()
            }, type );
        }else{
            alert("You are not logged in. Please log in and try again.");
        }
    }
    const isAddedToFavs = activeProfile?.favorites.some(el => el.id === chosenContent?.id);
    const scrollHorizontally  = (direction) => {
        contentBox && contentBox?.current.scrollBy({
            top: 0,
            left: direction === "right" ? 300 : direction === "left" ? -300 : 0,
            behavior: "smooth"
        });
    }
    return (
        <Auxiliary>
            <div id="RowContent">
                <div className="row--title">
                    {/* Title */}
                    <h1>{title}</h1>
                </div>
                {/* Container -- > items */}
                <ul ref={contentBox} className="row--u--list flex-row">
                    {/* <div className="row--scroll"> */}
                       <button className="row--scroll--btn--right" onClick={() => scrollHorizontally("right")}><IoIosArrowDroprightCircle /></button> 
                       <button className="row--scroll--btn--left" onClick={() => scrollHorizontally("left")}><IoIosArrowDropleftCircle /></button> 
                    {/* </div> */}

                    {
                        isLoading ?
                        <div className="loading--row flex-row">
                          <Loader
                            type="Oval"
                            color="#e50914"
                            height={80}
                            width={80}
                            timeout={5000}
                            />  
                        </div>
                        :
                        resultItems && resultItems.length >0 && resultItems.map(((item, i) => {
                                 return <li key={item.id} onClick={() => onElClick(item, i)} className={`row--list--item flex-column ${isLargeRow && "large__poster__item"} ${ activeRow === currIndex && activeElementIndex === i && "active--element--style"}`}>
                                    {
                                        activeRow === currIndex && activeElementIndex === i &&
                                        <div className="row--arrow--down"><span><RiArrowDownLine /></span></div>
                                    }
                                    <img className="item__img" loading="lazy" src={`${item?.backdrop_path !== null || item?.poster_path !==  null ? (baseImgURL + (isLargeRow ? item.poster_path : item.backdrop_path || item.poster_path)): defaultImg }`}  alt={item.title} />
                                </li> 
                               }  
                         ))
                    }
                   
                </ul>
               {
                   chosenContent !== 0 && activeRow === currIndex &&
                    <div ref={autoScroll} className="chosen--content flex-row">
                 {
                     !trailerUrl ?
                    <div className="chosen--inner flex-row">

                        <div className="chosen--info--box">
                        <h2 className="chosen__title">{chosenContent?.title || chosenContent?.original_name || chosenContent?.name || chosenContent?.original_title}</h2>
                        <div className="chosen__additional__info flex-row">
                             <small  className="chosen__date">Release Date: {chosenContent?.release_date}</small>
                            <small className="chosen__avg"><small style={{color: chosenContent?.vote_average > 8.5 ? "green" : chosenContent?.vote_average < 5.0 ? "red" : chosenContent?.vote_average > 5.0 && chosenContent?.vote_average < 8.5 ? "yellow" : "lightblue" }}>{chosenContent?.vote_average}</small> <small>({chosenContent?.vote_count && chosenContent?.vote_count.toLocaleString()})</small></small>
                        </div>
                        <p className="chosen__lang">{chosenContent?.original_language}</p>
                       
                        <p className="chosen__description">{truncateText(chosenContent?.overview, 400)}</p>
                        <button onClick={() => {onTrailerPlay(chosenContent?.title || chosenContent?.original_name || chosenContent?.name || chosenContent?.original_title);addToMyList (chosenContent, "watchlist")}} className="md-btn mr-3"><FiPlay />play</button>
                        <button disabled={isAddedToFavs} style={{backgroundColor: isAddedToFavs ? "green" : "transparent"}} onClick={() => addToMyList(chosenContent, "favorites")} className="md-btn my__list__btn">
                            {
                                isAddedToFavs ?
                            <RiCheckboxCircleLine />
                            :
                            <MdAddCircleOutline />
                            }
                            My List</button>
                        </div>
                        <div className="chosen--content--img">
                            <div className="right--fade"></div>
                            <img loading="lazy" src={`${chosenContent?.poster_path || chosenContent?.backdrop_path ? (baseImgURL + chosenContent?.poster_path || chosenContent?.backdrop_path): defaultImg}`} />
                        </div>
                    </div>
                  :
                    <div className="chosen--trailer">
                        <span className="go__back__btn" onClick={() => setTrailerUrl("")}><RiArrowLeftSLine/></span>
                        <Youtube videoId={trailerUrl} opts={ops} />
                     </div>
                  } 
                </div>
               } 
            </div>
        </Auxiliary>
    )
}
Row.propTypes = {
    title: PropTypes.string.isRequired,
    queries: PropTypes.object,
    isLargeRow: PropTypes.bool,
    setActiveRow: PropTypes.func,
    activeRow: PropTypes.number,
    currIndex: PropTypes.number,
    activeProfile: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    category: PropTypes.string,
    onAddingToList: PropTypes.func
}
const mapStateToProps = state => {
    return {
        activeProfile: state.currentUser?.data && state.currentUser?.data?.profiles && state.currentUser?.data?.profiles.length > 0 ? state.currentUser?.data?.profiles[state.activeProfileIndex] : [],
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddingToList: (passedObj, type) => dispatch(ActionTypes.addToFavoritesAsync(passedObj, type))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Row));