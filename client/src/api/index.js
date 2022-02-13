import axios from "axios";
const apiEndpoint = "http://localhost:5000/posts/" //apinin posts kısmına istek yapıldığında

export const fetchPosts = async () => await axios.get(apiEndpoint)
//controller içindeki getPost ile dönen json verisini burada  fetchPost ile alıyoruz
//veritabanıa erişim sağlanacağından dolayı bekleme olmasın diye asenkron tanımladık.


export const fetchSinglePost = async (id) => await axios.get(`${apiEndpoint}{id}`)
//fetchSinglePost actionundan gelen id bilgisini burada apiEndPoint'in sonuna ekledik
//şimdi server tarafına geçeceğiz, routes ve controller tanımlanacak

export const createPost  = async (post) => await axios.post(apiEndpoint, post)//axios.post bir post işlemi yapılacak demek backenddeki server a (buradan sonra backend kısmındaki routes ve controllers a geçiyoruz)
//axios.post içindeki post ise bizim addPostFormdan gönderdiğimiz post verisi
//actionların içindeki createPost actionu içinden buraya bağlantı sağladık
//bunu da controller içindeki createPosttın içinden req.bodyden yeni bir post oluşturuyor
//sonra da veri tabanına kaydediyor
