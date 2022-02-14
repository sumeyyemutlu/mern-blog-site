import express from "express";
import bodyParser from "body-parser";
import  mongoose  from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.js"


//api ayarlarınile ilgili her şeyi app üzerinden ayarlayacağız.
const app = express()//web sunucusuna gelen istekleri yönetmek, düzenlemek, yayınlamak için kullanılan modül
dotenv.config()//.env içindeki bilgileri process.env içine atıp kullanmamızı sağlar
 
app.use(bodyParser.json({limit:"30mb", extended:true})); //json formatında gelen veriyi kabul et.
//ve limit verdik ki çok büyük veriler gelirse(img) hata vermesin
//extended:true ise uyarı mesajlarını consolde görmeyelim diye

app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));//urlencoded url ile gelen istekleri ayrıştırır.
//bunu bodyparser içinde kullanmak için de extended:true demeliyiz
app.use(cors())//uzaktaki sunucuya gönderdiğimiz http isteklerinde sorun yaşanmasın diye verdik.

app.get("/", (req, res) => {//ilk server dosyasına geldiğinde bir request bir response al
    res.json({
        author: "Sümeyye Mutlu",
        message:"blog sitesi başlangıç videosu",
    });//sonra da cevap olarak bunu gönder
})

app.use("/posts", postRoutes) // /posts un sonuna gelen her şeyle postRoutes ilgilenecek


//const CONNECTION_URL = "mongodb+srv://mernblogsite:sumeyye_123@cluster0.bomsl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
.connect(process.env.CONNECTION_URL,{ //veritabanına bağlandık
    useNewUrlParser: true,
    useUnifiedTopology: true, //bunlar consolde hata verilmesin diye eklendi.
})
.then(() => {//başarılı bir şekilde bağlandıysak 5000 port ayağa kalsın
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port:${process.env.PORT} `);
    });
})
    .catch((error) => {//bağlanamadıysak consolea hata mesajı verilsin
    console.error(error.message);
});