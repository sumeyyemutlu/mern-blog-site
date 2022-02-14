import express from "express";
import {getPosts, createPost, getSinglePost, deletePost, updatePost} from "../controllers/posts.js"

const router = express.Router(); //yönlendirme işlemlerini tek bir sayfadan yapmak istiyoruz bu yüzden de Router sınıfını kullanıyoruz.

// http://localhost:5000/posts bu linkteki işlemlerin yönlendirilmesi burada yapılıyor
//GET, POST, DELETE, UPDATE PATCH metotları olabilir.
//yani get işlemi olunca şuraya yönlendir vs gibi işlemler burada tanımlanacak

router.get("/", getPosts); //getPost veritabanındkai tüm postları getirmeye yarayan fonk.
//bunu controllers bölümünde tanımlayacağız
//burada şöyle bir link olacak:
// http:localhost:5000/posts/ ==> sonuna / gelirse getposts işlemine yönlendir demek

router.get("/:id", getSinglePost);
//http:localhost:3000/146546dwd yani sonuna id gelirse fetchSinglePost controllerına at dedik.

router.post("/", createPost); //yeni bir post işlemi gerçekleştiğinde diye tanımlama yaptık 
//yapılacak işler controllersın içinde yapılacak


router.delete("/:id", deletePost) //eğer ilgili id ye silme işlemi gelirse deletePost a gönder dedik

router.patch("/:id", updatePost) //router.patch güncelleme işlemi yapaccağımızı söyler

export default router;