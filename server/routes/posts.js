import express from "express";
import {getPosts} from "../controllers/posts.js"

const router = express.Router();

// http://localhost:5000/posts bu linkteki işlemlerin yönlendirilmesi burada yapılıyor
//GET, POST, DELETE, UPDATE PATCH mettoalrı olabilir 
//yani get işlemi olunca şuraya yönlendir vs gibi işlemler burada tanımlanacak

router.get("/", getPosts) //getPost veritabanındkai tüm postları getirmeye yarayan fonk.
//bunu controllers bölümünde tanımlayacağız
//burada şöyle bir link olacak:
// http:localhost:5000/posts/    sonuna / gelirse getposts işlemine yönlendir demek


export default router;