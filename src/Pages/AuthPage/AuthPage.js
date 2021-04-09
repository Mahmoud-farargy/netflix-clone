import React, { useState, useEffect, useRef } from "react";
import "./AuthPage.scss";
import Auxiliary from "../../Components/HOC/Auxiliary";
import Header from "../../Components/Header/Header";
import InputEl from "../../Components/Generic/InputEl/InputEl";
import { UpdateObject } from "../../Utilities/UpdateObject";
import Footer from "../../Components/Footer/Footer";
import { db, auth } from "../../Config/Firebase";
import { connect } from "react-redux";
import * as actionTypes from "../../Store/ActionTypes/ActionTypes";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import * as ROUTEPATHS from "../../Pages/RoutePaths";
import {ReturnDecipheredCode} from "../../Utilities/ReturnDecipheredCode";
import {generateId} from "../../Utilities/GenerateId";
import userPics from "../../Fixtures/userPics.json";

const AuthPage = (props) => {
    const _isMounted = useRef(true);
  // states
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    isRemembered: true,
  });
  const { onUserUpdate, updateSavedData } = props;
  const [ switchToSignUp, setFormType ] = useState(false);
  const [ captchaState, expandCaptcha ] = useState(false);
  //------//
  const onInputChange = (val, name) => {
    setFormState(UpdateObject(formState, { [name]: val }));
  };
  const resetForm = () => {
      setFormState(Object.keys(formState)?.map(key => {if(key !== "isRemembered"){ formState[key] = "" } }));
  }
  const decipherPassword = (pass) => {
    return (
      pass &&
      pass.split("").map((char) => {
        return char.charCodeAt(0).toString(2);
      })
    );
  };
  const formSubmission = (formType, e) => {
    e.preventDefault();
    if (formType === "login") {
      if (formState.email && formState.password) {
        auth
          .signInWithEmailAndPassword(
            formState.email.toLowerCase(),
            formState.password
          )
          .then(() => {
            auth.onAuthStateChanged((currUser) => {
              onUserUpdate(currUser);
              updateSavedData();
              localStorage.setItem(
                "netflixRememberAuth",
                JSON.stringify({ remember: formState.isRemembered })
              );
              if (formState.isRemembered) {
                localStorage.setItem(
                  "netflixUser",
                  JSON.stringify({
                    email: formState.email.toLowerCase(),
                    password: decipherPassword(formState.password),
                  })
                );
              }
            });
            // login succeed
            setTimeout(() =>{
                    props.history.push(ROUTEPATHS.PROFILES);
                    resetForm();
            },200);
           
          })
          .catch((err) => {
              // login failed
            alert(err.message);
          });
      }
    } else if (formType === "signup") {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          formState.email
        )
      ) {
        if (
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(formState.password)
        ) {
          if (
            /^(?=[a-zA-Z0-9._-]{6,18}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(
              formState.name
            )
          ) {
            if (formState.confirmPassword === formState.password) {
              auth
                .createUserWithEmailAndPassword(
                  formState.email.toLowerCase(),
                  formState.password
                )
                .then((cred) => {
                  db.collection("users").doc(cred.user.uid).set({
                    userName: formState.name,
                    uid: cred.user.uid,
                    profiles:[
                      {
                      favorites: [],
                      watchlist: [],
                      isAdult: true,
                      name: formState.name,
                      avatarUrl: userPics[Math.floor(Math.random() * 5)],
                      id: generateId()
                    } 
                  ]

                    
                  });
                  // sign up succeed
                  localStorage.setItem(
                    "netflixRememberAuth",
                    JSON.stringify({ remember: true })
                  );
                    localStorage.setItem(
                      "netflixUser",
                      JSON.stringify({
                        email: formState.email.toLowerCase(),
                        password: decipherPassword(formState.password),
                      })
                    );
                    setTimeout(() =>{
                        resetForm();
                        props.history.push(ROUTEPATHS.PROFILES);
                    },200);
                })// sign up failed
                .catch((err) => alert(err.message));
            } else {
              alert(
                "The confirmation password does not match the one above it."
              );
            }
          } else {
            alert(
              "Username should be between 6 and 18 characters with no spaces."
            );
          }
        } else {
          alert(
            "Password should be between 8 to 20 characters and contains at least one number, one lowecase letter and one uppercase letter."
          );
        }
      } else {
        alert("Please enter a valid email.");
      }
    }
  };
//   effects
  useEffect(() => {
    switchToSignUp
      ? props.history.replace("/auth/sign-up")
      : props.history.replace("/auth/sign-in");
  }, [switchToSignUp]);

  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);
  useEffect(() => {
      if(JSON.parse(localStorage.getItem("netflixRememberAuth"))?.remember && _isMounted.current){
        const savedAuth = localStorage.getItem("netflixUser");
        const {email, password} = JSON.parse(savedAuth);
        setFormState({
            ...formState,
            email,
            password: ReturnDecipheredCode(password)
        })
      }

    return () => _isMounted.current = false;
  }, []);
//   --------- //
  const isSignUpFormValid = formState.email !== "" && formState.password !== "" && formState.confirmPassword !== "" && formState.name !== "";
  const isLoginFormValid = formState?.email !== "" && formState.password !== "";
  return (
    <Auxiliary>
      <section id="authMain">
        <div className="page--boundaries">
          <Header hideListItems={true} />
          <div className="auth--body flex-column">
            <div className="auth--box flex-column">
              <div className="auth--box--inner">
                <h1>{!switchToSignUp ? "Sign In" : "Sign Up"}</h1>
                {!switchToSignUp ? (
                  //  login
                  <form
                    onSubmit={(d) => formSubmission("login", d)}
                    className="flex-column"
                  >
                    <InputEl
                      type="email"
                      val={formState.email}
                      name="email"
                      placeholder="email"
                      changeInput={(y, z) => onInputChange(y, z)}
                    />
                    <InputEl
                      type="password"
                      val={formState.password}
                      name="password"
                      placeholder="password"
                      changeInput={(y, z) => onInputChange(y, z)}
                    />
                    <input
                      disabled={!isLoginFormValid}
                      type="submit"
                      className={ !isLoginFormValid ? "auth__submit__btn default-btn disabled" : "auth__submit__btn default-btn"}
                      value="Log In"
                    />
                  </form>
                ) : (
                  // sign up
                  <form
                    onSubmit={(d) => formSubmission("signup", d)}
                    className="flex-column"
                  >
                    <InputEl
                      type="text"
                      val={formState.name}
                      name="name"
                      placeholder="User Name"
                      changeInput={(y, z) => onInputChange(y, z)}
                    />
                    <InputEl
                      type="email"
                      val={formState.email}
                      name="email"
                      placeholder="email"
                      changeInput={(y, z) => onInputChange(y, z)}
                    />
                    <InputEl
                      type="password"
                      val={formState.password}
                      name="password"
                      placeholder="password"
                      changeInput={(y, z) => onInputChange(y, z)}
                    />
                    <InputEl
                      type="password"
                      val={formState.confirmPassword}
                      name="confirmPassword"
                      placeholder="Re-type password"
                      changeInput={(y, z) => onInputChange(y, z)}
                    />
                    <input
                    disabled={!isSignUpFormValid}
                      type="submit"
                      className={ !isSignUpFormValid ? "auth__submit__btn default-btn disabled" :"auth__submit__btn default-btn"}
                      value="Sign Up"
                    />
                  </form>
                )}

                <div className="auth--bottom">
                  {!switchToSignUp ? (
                    <div>
                      <div className="auth--remember--option flex-row">
                        <div className="form-group my-2 flex-row">
                          <input
                            onChange={(k) =>
                              onInputChange(k.target.checked, "isRemembered")
                            }
                            defaultChecked={formState.isRemembered}
                            value={formState.isRemembered}
                            id="remember"
                            type="checkbox"
                          />
                          <label htmlFor="remember">Remember me</label>
                        </div>

                        <span>Need help?</span>
                      </div>
                      <h4>
                        New to Netflix?{" "}
                        <span
                          className="signup__btn"
                          onClick={() => setFormType(true)}
                        >
                          Sign up now
                        </span>
                        .
                      </h4>
                    </div>
                  ) : (
                    <h4>
                      Already have an account?{" "}
                      <span
                        className="signup__btn"
                        onClick={() => setFormType(false)}
                      >
                        Log In
                      </span>
                      .
                    </h4>
                  )}
                  <div className="">
                    <p>
                      This page is protected by Google reCAPTCHA to ensure
                      you&apos;re not a bot.{" "}
                      {!captchaState && (
                        <small onClick={() => expandCaptcha(true)}>
                          Learn more.
                        </small>
                      )}
                    </p>

                    {captchaState && (
                      <p>
                        The information collected by Google reCAPTCHA is subject
                        to the Google <small>Privacy Policy</small> and{" "}
                        <small>Terms of Service</small>, and is used for
                        providing, maintaining, and improving the reCAPTCHA
                        service and for general security purposes (it is not
                        used for personalized advertising by Google).
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer trimLinks={true} />
      </section>
    </Auxiliary>
  );
};
AuthPage.propTypes = {
  onUserUpdate: PropTypes.func.isRequired,
  updateSavedData: PropTypes.func.isRequired,
  history: PropTypes.object,
};
// const mapStateToProps = (state) => {
//   return {
//     currentUser: state?.currentUser,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    onUserUpdate: (info) =>
      dispatch({ type: actionTypes.UPDATECURRENTUSER, info }),
    updateSavedData: () => dispatch(actionTypes.updateCurrUserAsync()),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withRouter(AuthPage));
