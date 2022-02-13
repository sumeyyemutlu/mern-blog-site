import React, {useEffect} from "react";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, Paper, Divider, Button, Chip} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import noImage from "../images/noImage.jpeg";
import {fetchSinglePost} from "../actions/post";


const useStyles = makeStyles((theme)=> ({
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(8),
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
    },
    content:{
        marginTop: theme.spacing(3),
    },
    image: {
        width: "100%",
        borderRadius: 5,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4),

    },
    chip: {
        marginTop: theme.spacing(1),
    },
}));

const PostDetails = ({match, history, location}) => { //PostDetails sayfasındaki PostDetails propslarının içinde match.params içinde id var
   
    const dispatch = useDispatch();
    const {id} = match.params;

    useEffect(()=> {
        dispatch(fetchSinglePost(id));
    },[dispatch])

    const currentPost = useSelector(state=> state.posts.currentPost)
    //action kısmında oluşturduğumuz curretnPost stateini aldık
    
  
 
    const convertRelativeTime = (date) => {//buradan bize bir date gelecek
        return moment(date).fromNow() //2 saat önce vs yazması için date döndüren bir fonk.
    }
    
    const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
        <div>
            <div className={classes.header}>
                <Typography variant="h5" gutterBottom>
                    {currentPost?.title}
                </Typography>
                <div>
                    <Button color="primary" variant="outlined" startIcon={<EditIcon />}> 
                        Düzenle
                    </Button>
                    <Button color="secondary" variant="outlined" startIcon={<DeleteIcon />}>
                        Sil
                    </Button>
                </div>
            </div>
        </div>
        <Divider />
        <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
        </Typography>
        <Typography variant="caption">
            {convertRelativeTime(currentPost?.createdAt)} by Sümeyye Mutlu
        </Typography>
        <Chip label={` #${currentPost?.tag}`} variant="outlined" className={classes.chip} />
        <div className ={classes.content}>
            <img 
            src={currentPost?.image || noImage} 
            className={classes.image} alt="Post" />

            <Typography variant="body1">
                {currentPost?.content} by Sümeyye Mutlu
            </Typography>
        </div>
    </Paper>
  )
}
export default PostDetails;