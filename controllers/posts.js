const Post = require('../models/post');

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
    create,
    index
}

function create(req, res){

   console.log(req.body, req.file, ' < req.body, req.file in posts/api create')
   res.json({data: 'working'})
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
}