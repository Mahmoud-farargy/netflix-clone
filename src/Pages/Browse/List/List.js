import React, {Fragment, useState, useEffect, lazy, Suspense, useRef} from "react";
// import Row from "../../../Components/Row/Row";
// import * as TMDBCASES from "../../../Hooks/useTMDB/TMDBCases";
import "./List.scss";
import Banner from "../../../Components/Banner/Banner";
import BannerHeader from "../../../Components/Banner/BannerHeader";
import homeList from "../../../Fixtures/homeList.json";
import Footer from "../../../Components/Footer/Footer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import * as ROUTEPATHS from "../../../Pages/RoutePaths";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";
const Row = lazy(() => import("../../../Components/Row/Row"));
const List = (props) => {
    const {activeProfile = {}, chosenCategory= {}} = props;
    const [activeRow, setActiveRow] = useState(null);
    let [itemsLimit, setItemsLimit] = useState(1);
    const containerHeight = useRef(null);

    useEffect(( ) => {
        window.addEventListener("scroll", () => {
            setTimeout(() => {
               if ((window.innerHeight + window.scrollY) >= containerHeight?.current?.offsetHeight + 210){
                    setItemsLimit(homeList.length -1 >= itemsLimit ? itemsLimit +=1 : itemsLimit);
                }   
            }, 60);
        })
        return () => {
            window.removeEventListener("scroll", ()=> {});
        }
    },[]);
    
    return (
        <Fragment>
           {
               activeProfile && Object.keys(activeProfile).length > 0 ?
               <section id="browseList">
                <div className="page--boundaries">
                        <div ref={containerHeight} className="list--inner">
                        <BannerHeader />
                        <Banner />
                        {
                            homeList && homeList.length > 0 && homeList.slice(0, itemsLimit).map((item, index) => (
                                <Suspense key={item.id} fallback={() => <LoadingScreen />}>
                                    <Row title={item.title} queries={item.queries} category = {chosenCategory} isLargeRow={item.isLargeRow}  activeRow={ activeRow } currIndex={index} setActiveRow={setActiveRow} />
                                </Suspense>
                            )) 
                        }
                        </div>
                    </div>
                <Footer />
            </section>  
            :
            <Redirect from={ROUTEPATHS.BROWSE} to={ROUTEPATHS.PROFILES} />
           } 
        </Fragment>
    )
}
List.propTypes = {
    chosenCategory: PropTypes.string,
    activeProfile: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
}
const mapStateToProps = state => {
    return {
        chosenCategory: state.chosenCategory,
        activeProfile: state.currentUser?.data && state.currentUser?.data?.profiles && state.currentUser?.data?.profiles.length > 0 ? state.currentUser?.data?.profiles[state.activeProfileIndex] : [],
    }
}
export default connect(mapStateToProps)(List);