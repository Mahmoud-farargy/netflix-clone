import React, {useEffect} from 'react';
import './App.scss';
import Routes from "./Pages/Routes";
import {auth} from "./Config/Firebase";
import {connect} from "react-redux";
import * as actionTypes from "./Store/ActionTypes/ActionTypes";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import * as ROUTEPATHS from "./Pages/RoutePaths";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// import axios from "axios";
import {ReturnDecipheredCode} from "./Utilities/ReturnDecipheredCode";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
function App(props) {
  const [,loading] = useAuthState(auth);
  console.log(loading);

  useEffect(() => {
    // axios.get("https://api.themoviedb.org/3/search/bad?api_key=916bdddecbab9547088b52be0d0ef32a").then((res) => {
    //   console.log(res);
    // })
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
         props.updateUserInfo(authUser);
         props.onUserChange();
      }
    })


    return () =>{
      unsubscribe();
    }
  }, []); 


  useEffect(() => {
    if(!props.currentUser?.info && localStorage.getItem("netflixRememberAuth") && JSON.parse(localStorage.getItem("netflixRememberAuth"))?.remember){
      const savedAuth = localStorage.getItem("netflixUser");
      if(savedAuth){
        const {email, password} = JSON.parse(savedAuth);
         auth.signInWithEmailAndPassword(email, ReturnDecipheredCode(password));
      }else{
        props.history.push(ROUTEPATHS.AUTH);
      }
    }
  },[props?.location]);

  return (
    <main className="App">
        { loading && <LoadingScreen />}
        <Routes />
    </main>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onUserChange: () => dispatch(actionTypes.updateCurrUserAsync()),
    updateUserInfo: (info) => dispatch({type: actionTypes.UPDATECURRENTUSER, info})
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state?.currentUser
  }
}
App.propTypes = {
  onUserChange: PropTypes.func.isRequired,
  updateUserInfo: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  currentUser: PropTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
