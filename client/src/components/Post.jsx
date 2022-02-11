import React from 'react'
import moment from "moment" //tarih işlemleri için
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActions,
    Chip,
    Button,
    CardMedia,
    CardContent,
    Typography
}from "@material-ui/core"
import noImage from "../images/"

const useStyles = makeStyles((theme)=> ({
    root: {
        maxWidth: 374,
        position: "relative",
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
        backgorundColor: "rgba(0, 0, 0, 0.5)",
        backgorundColorBlendMode: "darken",
    },
    overlay: {
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
    },
    chip:{
        marginTop: theme.spacing(1)
    }
}))
const Post = ({_id, title, subtitle, content, tag, image, createdAt}) => {//bunları PostList'ten oluşturduğumuz props ile aldık(useSelector)
    const convertRelativeTime = (date) => {//buradan bize bir date gelecek
        return moment(date).fromNow() //2 saat önce vs yazması için date döndüren bir fonk.
    }
    const classes = useStyles();
    return (
    <Card className= {classes.root}>
        <CardMedia className={classes.media} image={image || noImage} title ="Resim"/>
        <div className={classes.overlay}>
            <Typography variant="h6">Sümeyye</Typography>
            <Typography variant="body2">
                {convertRelativeTime(createdAt)}
            </Typography>
        </div>
    </Card>
  )
}

export default Post