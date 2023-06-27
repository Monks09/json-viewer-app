const initialState = {
    jsonData: "",
    invalid: true,
    selectedObject: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_JSON_DATA":
            return {
                ...state,
                jsonData: action.payload,
                selectedObject: action.payload,
                invalid: false,
            }
        case "SET_INVALID_TRUE":
            return {
                ...state,
                invalid: true,
                jsonData: "",
                selectedObject: "",
            }
        case "UPDATE_SELECTED_OBJECT":
            return {
                ...state,
                selectedObject: action.payload,
            }
        default:
            return state;
    }

}

export default reducer;