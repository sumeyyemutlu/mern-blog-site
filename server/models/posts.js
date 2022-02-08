import mongoose from "mongoose";

const postSchema = mongoose.Schema({//burada aslında veritabanımız için table benzeri görünüm olşsun diye mongoose modulu içerisinden şema oluşturuyoruz.
    title: String,// model içinde yer alacak kısımlar tanımlandı.
    subtitle: String,
    content: String,
    tag: String,
    image: String,
    createdAt : {
        type: Date,
        default: new Date(),
    }
})
const Post = mongoose.model("Post", postSchema) //oluşturduğumuz modeli kullanabilmek için de model metodu kullanılır.

export default Post;