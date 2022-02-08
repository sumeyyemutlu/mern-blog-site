import {combineReducers} from "redux";
import postReducer from "./post";

const rootReducer = combineReducers({//reducerları birleştirmeye yarar. sonra bunu store a atarız.
    posts: postReducer, // bunu direct postReducer şeklinde de yazabilirdik değişken adı aynı olsun diye
})
export default rootReducer; //store.js dosyadaki ismi
