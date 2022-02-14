import Post from "../models/posts.js";

export const getPosts = async (req, res) => {//veritabanı ile işlem yapacağımız için asenkron tanımladık
    try {
        const posts = await Post.find(); //asenkron fonk. çalıştırdığımız için await dedik model'ın içine git ve find ile tüm postsları getir bul
        res.status(200).json(posts) //dönen cevap 200 ise bulduğumuz postları json formatında döndür
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        
    }
}
export const getSinglePost = async (req, res) => {//veritabanı ile işlem yapacağımız için asenkron tanımladık
    const {id: _id} = req.params;
    try {
        const post = await Post.findById(_id); //bize gelen id ile postu bulmamıza yarayacak.
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        
    }
}
export const createPost = async (req, res) => {//Asenkron tanımlamamızın sebebi, veritabanından alcağımız data 1snde de gelebilir 10sn de. action cevabı beklemden dönebilir, boş sayfa gelir arayüze ondan.
    const newPost = new Post(req.body) //buradki Post models/post.js içindeki oluşturduğumuz schema aslında
    //request.body içinden form verisi alır.
    //aslında routes içinden gelen post verisi buraya gelir ve şemaya uygun bir şekilde oluşturulur.
    try {
        await newPost.save() //veritabanına kaydetme işlemi 
        res.status(201).json(newPost)//otomatik olarak eklediğimiz şeyler arayüzde gösterilecek
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    };
};
export const updatePost = async (req, res) => {//veritabanı ile işlem yapacağımız için asenkron tanımladık
    const {id:_id} = req.params //paramtereler içinden id bilgisi çekildi
    const post = req.body //güncellenen postun bilgileri bodyden çekildi
    try {
      const updatedPost = await Post.findByIdAndUpdate(_id, post, {new: true}) //id bilgisi, güncellenen postun bilgisi ne bir obje aldık
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        
    }
}
export const deletePost = async (req, res) => {//veritabanı ile işlem yapacağımız için asenkron tanımladık
    const {id: _id} = req.params;//bu routes içindeki deleteposta verdiğimiz id dir. ("/:id")
    try {
       
        const deletedPost = await Post.findByIdAndRemove(_id); //bize gelen id ile postu silmemize yarayacak.
        res.json(deletedPost) //silinen postu json olarak geriye dönsün dedik
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
        
    }
}