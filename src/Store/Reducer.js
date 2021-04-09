import * as actionTypes from "./ActionTypes/ActionTypes";
// import {UpdateObject} from "../Utilities/UpdateObject";
// import {db} from "../Config/Firebase";

const initialState = {
    currentUser: {
        info: [],
        data: [],
    },
    activeProfileIndex: 0,
    chosenCategory: "movie"
}

const rootReducer = ( state = initialState, actions )=> {
    switch(actions.type) {
        case actionTypes.UPDATECURRENTUSER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    info: actions.info,
                }
            }

        case actionTypes.UPDATESAVEDDATA:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    data: actions.data
                }
            }
        case actionTypes.CHANGEACTIVEPROFILE:
            return {
                ...state,
                activeProfileIndex: actions.payload
            }
        case actionTypes.CHANGECATEGORY:
            return {
                ...state,
                chosenCategory: actions.payload
            }
        default: 
            return state;
    }
}

export default rootReducer;