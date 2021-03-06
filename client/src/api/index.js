import axios from "axios";
const apiEndpoint = "https://blogram-web-site.herokuapp.com/posts/" //apinin posts kısmına istek yapıldığında (deploy edildiği için değişti)

export const fetchPosts = async () => await axios.get(apiEndpoint)
//controller içindeki getPost ile dönen json verisini burada  fetchPost ile alıyoruz
//veritabanıa erişim sağlanacağından dolayı bekleme olmasın diye asenkron tanımladık.


export const fetchSinglePost = async (id) => await axios.get(`${apiEndpoint}${id}`)
//fetchSinglePost actionundan gelen id bilgisini burada apiEndPoint'in sonuna ekledik
//şimdi server tarafına geçeceğiz, routes ve controller tanımlanacak

export const createPost  = async (post) => await axios.post(apiEndpoint, post)//axios.post bir post işlemi yapılacak demek backenddeki server a (buradan sonra backend kısmındaki routes ve controllers a geçiyoruz)
//axios.post içindeki post ise bizim addPostFormdan gönderdiğimiz post verisi
//actionların içindeki createPost actionu içinden buraya bağlantı sağladık
//bunu da controller içindeki createPostun içinden req.bodyden yeni bir post oluşturuyor
//sonra da veri tabanına kaydediyor

export const deletePost = async (id) => await axios.delete(`${apiEndpoint}${id}`)

export const updatePost = async (id, updatedPost) => await axios.patch(`${apiEndpoint}${id}`, updatedPost)
//güncellenen post bilgisi ile id bilgisi bilgisi gönderiliyor
//id: hangi post güncellendi
//updatedPost: güncellenen kısımlar