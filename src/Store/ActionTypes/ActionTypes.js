export const UPDATECURRENTUSER = "UPDATECURRENTUSER";
export const UPDATESAVEDDATA = "UPDATESAVEDDATA";
export const CHANGEACTIVEPROFILE = "CHANGEACTIVEPROFILE";
export const ADDNEWPROFILE = "ADDNEWPROFILE";
export const CHANGECATEGORY = "CHANGECATEGORY";
export const ADDTOFAV = "ADDTOFAVORITES";
import {db} from "../../Config/Firebase";


//action creators
const updateCurrUser = (payload) => {
    return {
        type: UPDATESAVEDDATA,
        data: payload
    }
}
// const addToFavAction = (payload) => {
//     return {
//         type: ADDTOFAV,
//         payload
//     }
// }
// -------XX--------//
// async functions
export const updateCurrUserAsync = () => {
    return (dispatch, getState) => {
        db.collection("users").doc(getState().currentUser?.info?.uid).onSnapshot((data) => {
            dispatch(updateCurrUser(data.data()));
        });
    }
};

export const addNewProfileAsync = (uid, oldProfiles, newProfile) => {
    return dispatch => {
        db.collection("users").doc(uid).update({
            profiles: [...oldProfiles, newProfile]
        }).then(() => {
            dispatch(updateCurrUserAsync(uid));
        }).catch(err => {
            alert(err)
        })
    }
};

export const addToFavoritesAsync = (newObj, type) => {
    
    return (dispatch , getState)=> {
        const state = getState();
        const uid = state.currentUser?.info?.uid;
        if(type){
            console.log(type);
            const profileId = state.currentUser?.data?.profiles[state.activeProfileIndex]?.id;
            console.log(profileId);
            let profilesCopy = state.currentUser && JSON.parse(JSON.stringify(state.currentUser?.data?.profiles));
                const currProfileIndex = profilesCopy?.map(el => el.id).indexOf(profileId);
                // let favs = profilesCopy[currProfileIndex]?.favorites;
            if(profilesCopy[currProfileIndex] && profilesCopy[currProfileIndex][type]){
                profilesCopy[currProfileIndex][type].unshift(newObj);
                profilesCopy[currProfileIndex][type] = Array.from(
                    new Set(profilesCopy[currProfileIndex][type].map((itemId) => itemId.id))
                ).map((ID) => profilesCopy[currProfileIndex][type].find((el) => el.id === ID));
                db.collection("users").doc(uid).update({
                    profiles: profilesCopy
                });
                dispatch(updateCurrUserAsync(uid));
            }else{
                alert("You are not logged in. Please log in and try again.");
            }
        }else{
            alert("An error occurred.");
        }


       
    }
};

export const deleteListItemAsync = ({type, profileIndex ,itemId, index}) =>{
    return (dispatch, getState) => {
        const state = getState();
        const uid = state.currentUser?.info?.uid;
        if(itemId && type && (profileIndex || profileIndex === 0) ){
         const profilesCopy = state.currentUser && JSON.parse(JSON.stringify(state.currentUser?.data?.profiles));
         console.log(profilesCopy?.[profileIndex]?.[type].map(g => g.id).indexOf(itemId), index)
         const checkIndex = profilesCopy?.[profileIndex]?.[type].map(g => g.id).indexOf(itemId) === index;
         if(checkIndex){
            profilesCopy?.[profileIndex]?.[type].splice(index,1);
            // return async function() {
                db.collection("users").doc(uid).update({
                    profiles: profilesCopy
                });
                dispatch(updateCurrUserAsync(uid));
            // }
         }else{ 
             alert("An error occurred. Please try again.");
         }
        }else{
            alert("You are not logged in. Please log in and try again.");
        }
    }
};