
export const UpdateObject = (oldState, newState) => {
    return{
    ...oldState,
    ...newState
    }
}