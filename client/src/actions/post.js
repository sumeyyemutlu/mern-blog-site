import * as api from "../api/index"
import * as types from "./types"

//redux-thunk kullandık. fonk tanımladık çünkü
export const fetchPosts = () => async(dispatch) => {//burası actionCreator, action oluşturduk.
    try {//burada asenkron bir işlem yapmak istediğim için redux-thunk yapısını kullandık
        const { data } = await api.fetchPosts();
        dispatch({
            type: types.FETCH_POSTS,
            payload: data //veritabanından alacağız
        })
        
    } catch (error) {
        console.log(error)
    }
}
export const fetchSinglePost = (id) => async (dispatch) => {//iki parametre aldı.
    try {
        const {data} = await api.fetchSinglePost(id);//PostDetails ten gelen id verisini al api içindeki fetchSinglePost a gönder dedik
        dispatch({
            type: types.FETCH_SINGLE_POST,
            payload: data,
        })
    } catch (error) {
        console.log(error)
    }
   
}

export const createPost = (post) => async (dispatch) => {//iki parametre aldı.
    try {
        const {data} = await api.createPost(post);//addPostFormdan gelen post verisini al api içindeki createPost a gönder dedik
        dispatch({
            type: types.CREATE_POST,
            payload: data,
        })
    } catch (error) {
        console.log(error)
    }
   
}