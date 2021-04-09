import React, { Fragment } from "react";
import { useTMDB } from "../../Hooks/useTMDB/useTMDB";
import * as TMDBCASES from "../../Hooks/useTMDB/TMDBCases";
import {baseImgURL} from "../../Config/TMDB";
import "../Banner/Banner.scss";
import {truncateText} from "../../Utilities/TruncateText";
import {generateId} from "../../Utilities/GenerateId";
import * as ActionTypes from "../../Store/ActionTypes/ActionTypes";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Banner = (props) => {
  const {activeProfileIndex, onAddingToList} = props;
  console.log(useTMDB({ type: TMDBCASES.genres }));
  const netflixOriginals = useTMDB({ type: TMDBCASES.netflix_originals });
  const resultsArr = netflixOriginals?.result?.data?.results;
  let randomItem =  netflixOriginals &&
    resultsArr &&
    resultsArr.length > 0 &&
    resultsArr[Math.floor(Math.random() * resultsArr.length -1)];
    const addToMyList = (content) => {
      if((activeProfileIndex || activeProfileIndex === 0) && content){
          onAddingToList({
          ...content,
              contentId: generateId()
          }, "favorites" );
      }else{
          alert("You are not logged in. Please log in and try again.");
      }
  }
  return (
    <Fragment>
      <header style={{
          background: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${baseImgURL + (randomItem?.backdrop_path)})`,
        }} id="listBanner">
        <div className="banner--inner">
            <h1 className="banner__title">{randomItem?.title || randomItem?.original_name}</h1>
            <div className="banner--btns--box">
            <button className="mb-2"> Play</button>
            <button onClick={()=> addToMyList(randomItem)}>Add to my list</button>
            <p className="banner__description">{truncateText(randomItem?.overview, 400)}</p>
            </div>
        </div>
        <div className="bottom--fade"></div>
      </header>
    </Fragment>
  );
};

Banner.propTypes = {
  activeProfileIndex: PropTypes.number,
  onAddingToList: PropTypes.func
};

const mapStateToProps = state => {
  return {
      activeProfileIndex: state.activeProfileIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAddingToList: (passedObj, type) => dispatch(ActionTypes.addToFavoritesAsync(passedObj, type))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Banner);
