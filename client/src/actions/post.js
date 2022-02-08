import * as types from "./types"

export const fetchPosts = () => {//burası actionCreator, action oluşturduk.
    return {
        type: types.FETCH_POSTS,
        payload: [] //veritabanından alacağız
    }
}