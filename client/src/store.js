import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk"; //asenkron işlemler için thunk kullanıldı
//import {composeWithDevTools} from "redux-devtools-extension"; 
import rootReducer from "./reducers/rootReducer"

const store = createStore(rootReducer, {}, compose( //compose içine yazılan iki şeyi birleştirmeye yarar,middleWare ile redux toolsu birleştirmeye yarar
    applyMiddleware(thunk),
    //composeWithDevTools() deploy işlemi için kaldırdık
))
export default store;