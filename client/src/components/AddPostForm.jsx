import React from 'react';
import {makeStyles} from "@material-ui/core";
import{
    Button,
    TextField,
    Select,
    Input,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
}
from "@material-ui/core"
import  {useForm, Controller} from "react-hook-form"//bunları bir kayıt sorgulama işlemi yapmak için kullanıyoruz. formları yönetmek için.
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers"

const useStyles = ((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    textfield :{
        marginBottom: theme.spacing(2)
    },
}))
const tags = ["fun","programming","science","health"];

const postSchema = yup.object().shape({
    title:yup.string().required(),//required: doldurulması zorunlu alanlar için kullanılır.
    subtitle:yup.string().required(),
    content:yup.string().min(20).required(),//içerik kısmı min 20 stribgten oluşacak.
    tag:yup.mixed().oneOf(tags),//yukarıda belirttiğimiz taglardan herhangi birini alacak demek
})

export const AddPostForm = ({open, handleClose}) => { //open ve handleClose appjs teki propslarım.

    const {register, handleSubmit, errors, control, reset} = useForm({//useFormdan bunları al dedik.
        resolver: yupResolver(postSchema)
    });
    const classes = useStyles();

  return (

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni Yazı Oluştur</DialogTitle>
        <DialogContent>
            <DialogContentText> 
                Yeni bir yazı eklemek için formu doldurun.
            </DialogContentText>
        </DialogContent>
       <div className= {classes.root}>
           <form noValidate autoComplete='off' onSubmit={}> {//burada form kaydetme işlemini kendi yapsamın dedik ototamamlama kapalı
           }
                <TextField 
                    id="title"
                    label="başlık"
                    name="title"
                    variant="outlined"
                    className={classes.textfield}
                    size="small"
                    inputRef={register}//postSchema ile bunu bağlıyor bir bakıma
                    error={errors.title ? true: false}
                    fullWidth
                />

           </form>
       </div>

    </Dialog>
  )
}

export default AddPostForm