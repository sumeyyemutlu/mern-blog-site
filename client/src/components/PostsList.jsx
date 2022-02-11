import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import  {useSelector} from "react-redux"
import {Grid, Button} from "@material-ui/core"
import Post from "./Post"
import grid3 from "../images/grid3.png";
import grid4 from "../images/grid4.png"
const useStyles = makeStyles((theme) => ({
    layoutShifter: {
        float: "right",
        margin: theme.spacing(2)

    }
}))

const PostList = () => {
    const posts = useSelector((state) => state.posts.posts);
    // state.posts.posts bu web sayfasındaki redux kısmındaki ilk kısım postlarımız
    //altındakin posts ise arraylerimiz onu aldık
    //useSelector mapStateToProps'ın hooklardaki kullanımı
    //buraya bir state dönderiyoruz

    const [layout, setLayout] = useState("grid3");

    const calculateMd = () => {
        return layout === "grid3" ? 4:3
    }
    const classes = useStyles()

    return (
        <> 
        {/* layout Shifter*/}
        <div className={classes.layoutShifter}>
            <Button variant="text" size='small' onClick={()=>setLayout("grid3")}>
                <img width="30px" height="30px"alt="Three columns grid icon" src={grid3} style={{background: layout==="grid3"? "#c4e2f2": "" }} />
            </Button>
            <Button variant="text" size='small' onClick={()=>setLayout("grid4")}>
                <img width="34px" height="34px" alt="Four columns grid icon" src={grid4} style={{background: layout==="grid4"? "#c4e2f2": "" }} />
            </Button>
        </div>
            <Grid container spacing={2} alignContent ="stretch">
                {posts.length > 0  && posts.map((post) =>( //eğer post varsa map ile dolaş içinde
                // alt kısımda da yan yana 3 tane post gelecek şekilde ayarladık
                    <Grid item key ={post?._id} xs ={12} md={calculateMd()}>
                        <Post {...post} />
                    </Grid>
                )
                )}
            </Grid>
        </>
    )
}
export default PostList;