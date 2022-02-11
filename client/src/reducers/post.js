import * as types from "../actions/types";

const initialState = {//anlık state bilgisini verdik. burasu defult state
    posts: []
}

const postReducer = (state= initialState, action)=> {
    switch (action.type) {
        case types.FETCH_POSTS:
          return {
              ...state,//default state'in kopyasını al
              posts: action.payload //ve actionun payloadını ekle
          };
          case types.CREATE_POST:
          return {
              ...state, //default state'in kopyasını al
              posts: [...state, action.payload ] ,//statteki veri aynı kalsın ve arayyin en sonuna postu ekle
          };
    
        default:
            return {
                ...state
            };
    };
};
export default postReducer;