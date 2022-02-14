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
import noImage from "../images/noImage.jpeg"

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
    },
    buttons: {
        justifyContent: "center",
        padding: "4px 14px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "4px",
        border: "1px solid #ff7a66",
        backgroundColor: "#ff7a66",
        borderRadius: "20px"
    },
    link: {
        color: "white"
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
            <Typography variant="h6">Sümeyye Mutlu</Typography>
            <Typography variant="body2">
                {convertRelativeTime(createdAt)}
            </Typography>
        </div>
        <CardContent>
            <Typography variant="h6" component ="p" gutterBottom>{ //component="p" ile bir alt satıra geç dedik.
            //gutterbottom ile alttan boşluk bırakıldı
            }
            {title}
            </Typography>
            <Typography variant="overline" component ="p" gutterBottom>
            {subtitle}
            </Typography>
            <Typography variant="body2" component ="p" gutterBottom>
            {content.substring(0, 250) + "..."} {// 0 ile 250 karakter arası gösterilecek geri kalan ... ile
            }
            </Typography>
            <Chip label={` #${tag}`} variant="outlined" className={classes.chip} />
        </CardContent>
        <CardActions>
            <Button size="small" className={classes.buttons} id="more-button">
                <Link id="more-link"className={classes.link} to={`/posts/${_id}` }>Daha fazla...</Link> {
                // butona tıklandığında ilgili postun olduğu linke götürecek
                }

            </Button>
        </CardActions>

    </Card>
  )
}

export default Post