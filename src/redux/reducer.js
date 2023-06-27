const initialState = {
    jsonData: "",
    invalid: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_JSON_DATA":
            return {
                ...state,
                jsonData: action.payload,
                invalid: false,
            }
        case "SET_INVALID_TRUE":
            return {
                ...state,
                invalid: true,
            }
        default:
            return state;
    }

}

export default reducer;