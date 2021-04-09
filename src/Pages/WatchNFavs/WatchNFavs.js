import React, {Fragment, useEffect} from "react";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import BannerHeader from "../../Components/Banner/BannerHeader";
import "../../Components/Banner/Banner.scss";
import "./WatchFavs.scss";
import Item from "./Item/Item";
import * as ActionTypes from "../../Store/ActionTypes/ActionTypes";
import { Flipper, Flipped } from 'react-flip-toolkit';

const WatchNFavs = (props) => {
    const{type} = useParams();
    const {activeProfile, profileIndex, handleDeletingListItem} = props;
    console.log(type);
        const list = type === "watchlist" || type === "favorites" ? activeProfile?.[type] : [];
        console.log(list);  
    useEffect(() => {
        window.scrollTo(0,0);
    },[]);
    return (
        <Fragment>
            <div id="watchNFavs">
                <Flipper flipKey={list}>
                {
                    (type === "watchlist" || type === "favorites") ?
                    <div className="page--boundaries">
                        <BannerHeader hideCats={true} />
                            <div className="watchlistFavs--inner">
                                <ul className="watchlistFavs--ul">

                                    {
                                        list && list.length > 0 ?
                                        list.map((item, index) => (
                                            <Flipped key={item.id}>
                                                 <Item  handleDeletingListItem={handleDeletingListItem} profileIndex={profileIndex} type={type} index={index} item={item} /> 
                                            </Flipped>
                                          
                                        ))
                                        :
                                        <h2>No items on the list</h2>
                                    }
                               
                                </ul>
                            </div>
                     </div>
                     :
                     <h2>Wrong param</h2>
                }
                </Flipper>
               
            </div>
        </Fragment>
    )
}
WatchNFavs.propTypes = {
    activeProfile: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    handleDeletingListItem: PropTypes.func,
    profileIndex: PropTypes.number
}
const mapStateToProps = state => {
    return {
        activeProfile: state.currentUser?.data && state.currentUser?.data?.profiles && state.currentUser?.data?.profiles.length > 0 ? state.currentUser?.data?.profiles[state.activeProfileIndex] : [],
        profileIndex: state?.activeProfileIndex
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleDeletingListItem: ({type, profileIndex ,itemId, index}) => dispatch(ActionTypes.deleteListItemAsync({type, profileIndex ,itemId, index}))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(WatchNFavs);