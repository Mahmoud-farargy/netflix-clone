import React , {useEffect, useRef, useState}from 'react'
import "../../Components/Header/Header.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as ROUTEPATHS from "../../Pages/RoutePaths";
import * as actionTypes from "../../Store/ActionTypes/ActionTypes";
import netflixLogo from "../../Assets/logo.6dbba458.svg";
import PropTypes from 'prop-types';
import "./Banner.scss";
import {ImProfile} from "react-icons/im";
import {FiLogOut} from "react-icons/fi";
import {MdFavoriteBorder, MdList} from "react-icons/md";
import {auth} from "../../Config/Firebase";
import $ from "jquery";

const BannerHeader = (props) => {
    const headerRef = useRef(null);
    const _isMounted = useRef(true);
    const [openProfileModal, setProfileModal] = useState(false);
    const {currentUser, activeProfile, onCategoryChange, chosenCategory, hideCats} = props;
    console.log(activeProfile);
    useEffect(() => {
        if(_isMounted){
            window.addEventListener("scroll", () => {
                if(window.scrollY > 100 && headerRef && headerRef.current){
                    headerRef.current?.classList?.add("black__header");
                }else{
                    headerRef.current?.classList?.remove("black__header");
                }
            });  
        }
        
        return () =>{
            window.removeEventListener("scroll", ()=> {});
            _isMounted.current = false;
            headerRef.current = false;
        }
    }, []);
    useEffect(() => {
        $(document).ready(() =>{
           $("body").css("overflow", openProfileModal ? "hidden" : "auto");
        });
    },[openProfileModal]);
    return (
        <nav className="banner--nav main--header">
                     {/* Modal */}
                        {
                            openProfileModal &&
                            <div>
                                <div className="profile--options--modal">
                                    <span onClick={() =>  setProfileModal(false)} className="close--profile--modal flex-row mobile-only">&times;</span>
                                    <ul className="profile--options--inner flex-column">
                                        <Link onClick={() => setProfileModal(false)} to={ROUTEPATHS.PROFILES}><li><ImProfile /> <span>Profiles</span></li></Link>
                                        <Link onClick={() => setProfileModal(false)} to={`${ROUTEPATHS.WATCHNFAVS}/watchlist`}><li><MdList />Watchlist</li></Link>
                                        <Link onClick={() => setProfileModal(false)} to={`${ROUTEPATHS.WATCHNFAVS}/favorites`}><li><MdFavoriteBorder /> Favorites</li></Link>
                                        <Link onClick={() => {auth.signOut(); setProfileModal(false)}} to={ROUTEPATHS.AUTH}><li><FiLogOut />Log out</li></Link>
                                    </ul>
                                </div>
                                <div onClick={()=> setProfileModal(false)} className="backdrop"></div> 
                            </div>
                           
                        }
            <div className="page--boundaries">
                <div ref={headerRef} className="header--inner flex-row">

                        <div className="flex-row align-items-center">
                            <Link to={ROUTEPATHS.HOME} className="logo__main">
                                    <img className="logoImg" src={netflixLogo} alt="Netflix logo" />
                            </Link>
                          {
                              !hideCats && 
                            <div className="flex-row rows--categories">
                                <span className={`${chosenCategory === "movie" && "activeCat"}`} onClick={() =>  onCategoryChange("movie")}>Movies</span>
                                <span  className={`${chosenCategory === "tv" && "activeCat"}`} onClick={() =>  onCategoryChange("tv")}>Series</span>
                            </div>
                          } 
                        </div>
                          
                        {
                            currentUser?.info?.uid ?
                            
                            <div onClick={() => setProfileModal(true)} className="flex-row align-items-center banner--prof">
                                <img src={activeProfile?.avatarUrl} loading="lazy" alt={activeProfile?.name} />
                                <span className="desktop-only">{activeProfile?.name}</span>
                                {/* <button >logout</button> */}
                            </div>
                            :
                            null
                    }  
                    
                    </div>
            </div>
        </nav>
    )
}
BannerHeader.propTypes = {
    currentUser: PropTypes.object,
    activeProfile: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    onCategoryChange: PropTypes.func,
    chosenCategory: PropTypes.string,
    hideCats: PropTypes.bool
}
const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        activeProfile: state.currentUser?.data && state.currentUser?.data?.profiles && state.currentUser?.data?.profiles.length > 0 ? state.currentUser?.data?.profiles[state.activeProfileIndex] : [],
        chosenCategory: state.chosenCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCategoryChange: (type) => dispatch({type: actionTypes.CHANGECATEGORY, payload: type})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(BannerHeader));