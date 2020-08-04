import * as types from './type'
const intializeState = {
    persons: []
}

const rootReducer = (state = intializeState, action) => {
    if (action.type === types.ADD_PERSON) {
        return {
            ...state, persons: state.persons.concat(action.value)
        };
    }
    if (action.type === types.REMOVE_PERSON) {
        return {
            ...state, persons: state.persons.filter(person => action.value !== person.id)
        };
    }
    return state;
}

export default rootReducer;