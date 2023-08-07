const Post = require("../models/post");

const { v4: uuidv4 } = require("uuid");

const S3 = require("aws-sdk/clients/s3");

const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  create,
  index,
};

function create(req, res) {

  if (!req.file) return res.status(400).json({ error: "Please Submit a Photo" });

  const filePath = `music-box/posts/${uuidv4()}-${req.file.originalname}`;

  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    if (err) {
      console.log("===========================================");
      console.log(
        err,
        " err from aws, either your bucket name is wrong or your keys arent correct"
      );
      console.log("===========================================");
      res.status(400).json({ error: "Error from aws, check your terminal!" });
    }

    try {
      // Use our Model to create a document in the posts collection in Mongodb
      const post = await Post.create({
        caption: req.body.caption,
        user: req.user,
        photoUrl: data.Location,
      });

      await post.populate("user"); // populating on a mongoose document! this gives us the user object
      // this response will show up in the feedPage in   const responseData = await postsApi.create(post);
      res.status(201).json({ data: post });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });
}

async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ posts });
  } catch (err) {}
}
