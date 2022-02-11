import React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";
import FileBase64 from "react-file-base64"; //dosya ekleme kütüphanesi 
import { makeStyles } from "@material-ui/core/styles";
import {createPost} from "../actions/post"
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
from "@material-ui/core";
import  {useForm, Controller} from "react-hook-form"//bunları bir kayıt sorgulama işlemi yapmak için kullanıyoruz. formları yönetmek için.
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"//yup ile react hookform u birleştirmeye yarayan kütüphane

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
    textfield:{
        marginBottom: theme.spacing(2),
    },
}))
const tags = ["fun","programming","science","health"];

const postSchema = yup.object().shape({//yup ile bir şema oluşturduk.
    title: yup.string().required("Başlık bilgisi zorunludur."),//required: doldurulması zorunlu alanlar için kullanılır.
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),//içerik kısmı min 20 stribgten oluşacak.
    tag: yup.mixed().oneOf(tags),//yukarıda belirttiğimiz taglardan herhangi birini alacak demek
})

 const AddPostForm = ({open, handleClose}) => { //open ve handleClose appjs teki propslarım.

    const dispatch = useDispatch();
    const [file, setFile] = useState(null) //dosya ekleme-değiştirme-güncelleme işlemleri için oluşturulan state

    const {register, handleSubmit, formState:{errors}, control, reset} = useForm({//useFormdan bunları al dedik.
        resolver: yupResolver(postSchema)//oluşturduğumuz şemayı yup kütüphaneleri ile  hookform'a  entegre ettik.
    });

    const onSubmit = (data) => {//buradaki data react-hook-formdan gelecek
        dispatch(createPost({...data, image: file}))
        //gelen datanın bir kopyasını al ve fotoğraf olarak da file'ı al yukarıda tanımladık
        //bunları createPost(actions) a gönder
        
        clearForm();
    }
    const clearForm = () => {//formu temizle fonksiyonu
        reset();//resetlemek için fonksiyon
        setFile(null) //dosya eklediysek bunu null yapıyoruz yani kaldırdık
        handleClose();//ve yeni yazı ekle kısmı kapandı
    }
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
           <form noValidate autoComplete='off' className={classes.paper} onSubmit={handleSubmit(onSubmit)}> {//burada form doğrulama işlemini kendi yapsamın dedik ototamamlama kapalı
           }
                <TextField //başlık kısmının olduğu yer 
                    id="title"
                    label="başlık"
                    name="title"
                    variant="outlined"
                    className={classes.textfield}
                    size="small"
                    inputRef={register}//postSchema ile bunu bağlıyor bir bakıma
                    error={errors.title ? true: false}//postSchema da bir hata varsa errors.title hata var demektir.
                    fullWidth
                />
                <TextField 
                    id="subtitle"
                    label="alt başlık"
                    name="subtitle"
                    variant="outlined"
                    className={classes.textfield}
                    size="small"
                    inputRef={register}//postSchema ile bunu bağlıyor bir bakıma
                    error={errors.subtitle ? true: false}//postSchema da bir hata varsa errors.subtitle hata var demektir.
                    fullWidth
                />
                <Controller 
                    as = {
                        <Select
                            input={<Input />}
                            className={classes.textfield}
                            fullWidth 
                        >
                          {tags.map((tag, index) =>(//tagsların içinden tag ile dolaş
                              <MenuItem key={index} value={tag}>
                                  {tag} 
                              </MenuItem>
                          ))}  
                        </Select>
                    }
                        name="tag"
                        control={control}
                        error ={errors.tag ? true:false }//tag kısmında hata varsa gösterecek
                        defaultValue={tags[0]}//varsayılan olarak tagslardaki ilk eleman olan "fun" gösterilecek
                    />
                <TextField //yazıların yazıldığı kısım
                    id="content"
                    label="İçerik"
                    name="content"
                    multiline //uzun yazı yazilabilir birden fazla satır koyduk
                    rows={4}//başlangıç olarak 4 satırla başla dedik
                    variant="outlined"
                    className={classes.textfield}
                    size="small"
                    inputRef={register}//postSchema ile bunu bağlıyor bir bakıma
                    error={errors.content ? true: false}//postSchema da bir hata varsa errors.content hata var demektir.
                    fullWidth
                />
                <FileBase64 multiple={false} onDone={({base64})=> setFile(base64)} /> {
                    //multiple: birden fazla dosya yükleme demek
                    // onDone: dosya çağrıldığında bunu setFile'a ata dedik.
                }
           </form>
       </div>
       <DialogContent>
           <DialogActions>
               <Button color="inherit" onClick={clearForm}>Vazgeç</Button>
               <Button
                type="submit"
                 variant="outlined"
                 color="primary"
                 onClick={()=>handleSubmit(onSubmit) ()} // tıklandığında handleSubmit içinden onSubmit çalışacak
                 // yanındaki boş ()  butonlar formun dışında old. için formu öyle çağırıyoruz.
                  >
                    Yayınla</Button>
           </DialogActions>
       </DialogContent>
    </Dialog>
  );
};
export default AddPostForm