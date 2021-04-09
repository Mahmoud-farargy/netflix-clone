import React, {useEffect, useState} from 'react';
import Auxiliary from "../../Components/HOC/Auxiliary";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Profiles.scss";
import {connect } from "react-redux";
import PropTypes from "prop-types";
import * as ActionTypes from "../../Store/ActionTypes/ActionTypes";
import {withRouter} from "react-router-dom";
import {Picture} from "./styles";
import * as ROUTEPATHS from "../../Pages/RoutePaths.js";
import {GoPlus} from "react-icons/go";
import {Modal, Button} from "react-bootstrap";
import userPics from "../../Fixtures/userPics.json";
import InputEl from "../../Components/Generic/InputEl/InputEl";
import {UpdateObject} from "../../Utilities/UpdateObject";
import {generateId} from "../../Utilities/GenerateId";

const Profiles = (props) => {
    const { profilesArr, activeProfile, onUserChange, currentUid , onAddingProfile} = props;
    useEffect(() => {
        window.scrollTo(0,0);
    },[]);
    console.log("profile >>",activeProfile,"profiles >>",profilesArr);
    const handleUserClicking = (itemId, index) => {
        const currentIndex = profilesArr?.map(z => z.id).indexOf(itemId);
        console.log(currentIndex);
        if(currentIndex === index){
            onUserChange(currentIndex);
            props?.history.push(ROUTEPATHS.BROWSE);
        }else{
            alert("An error occurred. Please try again.");
        }
        
    }
    const [showAddModal, setAddModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const [newProfileForm, setNewProfForm] = useState({
        randomPic: "",
        name: "",
        isKid: false
    });
    console.log(newProfileForm);
   const onInputChange = (val, name) => setNewProfForm(UpdateObject(newProfileForm, {[name]: val}));
   const onSubmittingProfile = (p) => {
       p.preventDefault();
       if(newProfileForm.name){
            const newFormToSubmit = {
                isAdult: !newProfileForm.isKid,
                avatarUrl: newProfileForm.randomPic,
                name: newProfileForm.name,
                favorites: [],
                id: generateId(),
                watchlist: []
            }
        onAddingProfile(currentUid, profilesArr, newFormToSubmit);
        setNewProfForm(Object.keys(newProfileForm).map(el => newProfileForm[el] = ""));
        setAddModal(false);
       }else{
           alert("The Name field should not be empty.");
       }
        
       console.log("submitted");
   }
    return (
        <Auxiliary>
        <section id="profiles">
         <div className="page--boundaries">
            {/* Modals */}
            {/* add */}
            <Modal show={showAddModal} onShow={()=> setNewProfForm(UpdateObject(newProfileForm, {randomPic: userPics[Math.floor(Math.random() * 5)]}))} className="modal--profile" onHide={() => setAddModal(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="modal--prof--body">
                    <h1>Add Profile</h1>
                    <h4>Add a profile for another person watching Netflix.</h4>
                    <form onSubmit={(p)=> onSubmittingProfile(p)} className="modal--prof--form flex-column">
                        <div className="modal--prof--inner flex-row">
                            <img loading="lazy" src={newProfileForm.randomPic} />
                                <InputEl
                            type="text"
                            val={newProfileForm.name}
                            name="name"
                            placeholder="name"
                            changeInput={(y, z) => onInputChange(y, z)}
                            />
                            <div className="form-group checkbox--group my-2 flex-row">
                                <input
                                    onChange={(k) =>
                                    onInputChange(k.target.checked, "isKid")
                                    }
                                    defaultChecked={newProfileForm.isKid}
                                    value={newProfileForm.isKid}
                                    id="isKid"
                                    type="checkbox"
                                />
                                <label htmlFor="isKid">is Kid?</label>
                            </div>
                        </div>
                        <div className="modal--prof--footer flex-row">
                                <Button variant="secondary" className="mr-3" onClick={() => setAddModal(false)}>
                                    CANCEL
                                </Button>
                                <input className="btn btn-danger" type="submit" disabled={!newProfileForm.name} variant="danger" onClick={() => setAddModal(false)} value="CONTINUE" /> 
                        </div>
                                          
                    </form>                    
                </Modal.Body>
            </Modal>
             {/* edit */}
            <Modal show={showEditModal} className="modal--profile" onHide={() => setEditModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo,test</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => setEditModal(false)}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>


                <Header hideListItems />
                <div className="profiles--inner flex-column">
                    <h1 className="profiles__p__title">Who&apos;s watching?</h1>
                   <ul className="profiles--box flex-row">
                       {

                        profilesArr && profilesArr.length > 0 && profilesArr.map((item, i) =>(
                                <li onClick={() => handleUserClicking(item?.id, i)} key={item?.id} className="profile--item">
                                    <Picture src={item.avatarUrl} alt={item?.name} />
                                    <span>{item?.name}</span>
                                </li>
                           ) )
                        }
                        <li onClick={() => setAddModal(true)} className="add--new--profile flex-column">
                            <div className="add--prof--inner flex-column">
                                <GoPlus />
                            </div>
                            <span>Add Profile</span>
                        </li>
                   </ul>
                </div>
                <Footer />
                </div>
            </section>
        </Auxiliary>
    )
}
Profiles.propTypes = {
    activeProfile: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    profilesArr: PropTypes.array,
    onUserChange: PropTypes.func,
    history: PropTypes.object,
    currentUid: PropTypes.string,
    onAddingProfile: PropTypes.func,
}
const mapStateToProps = state => {
    console.log(state);
    return {
        currentUid: state.currentUser?.info?.uid,
        activeProfile: state.currentUser?.data && state.currentUser?.data?.profiles && state.currentUser?.data?.profiles.length > 0 ? state.currentUser?.data?.profiles[state.activeProfileIndex] : [],
        profilesArr: state.currentUser?.data?.profiles,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onUserChange: (itemId) => dispatch({type: ActionTypes.CHANGEACTIVEPROFILE, payload: itemId}),
        onAddingProfile: (uid, profiles, newProfile) => dispatch(ActionTypes.addNewProfileAsync(uid, profiles, newProfile))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profiles));