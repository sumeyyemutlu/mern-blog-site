import Post from "../models/posts.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find(); //asenkron fonk. çalıştırdığımız için await dedik model'ın içine git ve find ile tüm postsları getir bul
        res.status(200).json(posts) //dönen cevap 200 ise bulduğumuz postu json formatında döndür
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        
    }
}