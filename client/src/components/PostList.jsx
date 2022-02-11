import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import  {useSelector} from "react-redux"
import {Grid, Button} from "@material-ui/core"
import Post from "./Post"

const useStyles = makeStyles((theme) => ({}))

const PostList = () => {
    const posts = useSelector((state) => state.posts.posts);
    // state.posts.posts bu web sayfasındaki redux kısmındaki ilk kısım postlarımız
    //altındakin posts ise arraylerimiz onu aldık

    const classes = useStyles()

    return <div>PostList</div>
}

export default PostList