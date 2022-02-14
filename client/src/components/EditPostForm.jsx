import React from 'react';
import {useState} from "react";
import {useDispatch} from "react-redux";
import FileBase64 from "react-file-base64"; //dosya ekleme kütüphanesi 
import { makeStyles } from "@material-ui/core/styles";
import{Button,TextField,Select,Input,MenuItem}from "@material-ui/core";
import  {useForm, Controller} from "react-hook-form"//bunları bir kayıt sorgulama işlemi yapmak için kullanıyoruz. formları yönetmek için.
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"//yup ile react hookform u birleştirmeye yarayan kütüphane.
import {updatePost} from "../actions/post";
import alertify  from "alertifyjs";

const useStyles = makeStyles((theme) => ({
  textfield: {
      marginBottom: theme.spacing(3)
  },
  buttons: {
      marginTop: theme.spacing(2)
  }
}))
const tags = ["fun","programming","science","health"];

const postSchema = yup.object().shape({//yup ile bir şema oluşturduk. İlgili form alanlarının kontrolunu sağlamak için 
    title: yup.string().required("Başlık bilgisi zorunludur."),//required: doldurulması zorunlu alanlar için kullanılır.
    subtitle: yup.string().required(),
    content: yup.string().min(20).required(),//içerik kısmı min 20 stribgten oluşacak.
    tag: yup.mixed().oneOf(tags),//yukarıda belirttiğimiz taglardan herhangi birini alacak demek
})

 const EditPostForm = ({post, history, closeEditMode}) => {//bunlarıPostDetails kısmında tanımlamıştık, history bu componentin propslarında var

    const dispatch = useDispatch(); //actionları bağlamamıza yarar. 
    const [file, setFile] = useState(post?.image) //postta resim varsa useStatte tutuyoruz
    const {register, handleSubmit, formState:{errors}, control, reset} = useForm({//useFormdan bunları al dedik.
        resolver: yupResolver(postSchema)//oluşturduğumuz şemayı yup kütüphaneleri ile  hookform'a  entegre ettik.
    });

    const onSubmit = (data) => {//buradaki data react-hook-formdan gelecek
        const updatedPost = {
            _id: post._id, //currentPostun idsine _id dedik
            ...data, //gelen postun kopyası alındı
            image: file,
        }
        alertify.success(data.title +" makalesi düzenlendi!",4)
        dispatch(updatePost(post._id, updatedPost))
        reset()
        setFile(null)
        closeEditMode()
    };

    const classes = useStyles();

  return (
    
       <div>
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
                    defaultValue={post?.title} //default olarak currentPostun title değeri tutulsun dedik
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
                    defaultValue={post?.subtitle}
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
                        defaultValue={post?.tag}//varsayılan olarak o anki postun tagı 
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
                    defaultValue={post?.content}
                />
                <FileBase64 multiple={false} onDone={({base64})=> setFile(base64)} /> {
                    //multiple: birden fazla dosya yükleme demek
                    // onDone: dosya çağrıldığında bunu setFile'a ata dedik.
                }
                <div className={classes.buttons}>
                <Button color="secondary" variant="outlined" onClick={closeEditMode}> {
                    //closeEditMode bir önceki ekrana dönmemizi sağlayacak
                }
                        Vazgeç
                    </Button> {" "}
                    <Button color="primary" variant="outlined" type="submit">
                        Kaydet
                    </Button>
                </div>
           </form>
       </div>
      
  );
};
export default EditPostForm;