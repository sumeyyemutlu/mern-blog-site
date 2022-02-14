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
export const deletePost = (id) => async (dispatch) => {//iki parametre aldı.
    try {
        const {data} = await api.deletePost(id);//servera axios ile deletePost(id) gönderecesğiz ve server da bunu kaldıracak.
        dispatch({
            type: types.DELETE_POST,
            payload: data._id, //silinenpostun idsini gönder döndür dedik.
        })
    } catch (error) {
        console.log(error)
    }
}
export const updatePost = (id, post) => async (dispatch) => {//iki parametre aldı. biri güncellenen postun idsi diğeri de post içeriği
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({
            type: types.UPDATE_POST,
            payload: data,
        })
    } catch (error) {
        console.log(error)
    }
}
   