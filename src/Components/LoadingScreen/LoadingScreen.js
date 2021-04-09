import React from "react";
import Auxiliary from "../../Components/HOC/Auxiliary";
import LoadingGif from "../../Assets/images/loading.gif";
import "./LoadingScreen.scss";

const LoadingScreen = () => {
    return (
        <Auxiliary>
            <div id="loadingScreen" className="flex-column">
                <img src={LoadingGif} alt="loading"/>
            </div>
        </Auxiliary>
    )
}
export default LoadingScreen;