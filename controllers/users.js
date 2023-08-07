const User = require('../models/user');
const Post = require('../models/post')
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const { v4: uuidv4 } = require('uuid');

const S3 = require('aws-sdk/clients/s3');

const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME

module.exports = {
  signup,
  login,
  profile
};

async function profile(req, res){
 
  try {

    const user = await User.findOne({username: req.params.username})

    if(!user) return res.status(404).json({error: 'User not found'})

    const posts = await Post.find({user: user._id}).populate("user").exec();
    res.status(200).json({posts: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}

async function signup(req, res) {

  console.log(req.body, req.file, ' req.body', 'req.file');

  if(!req.file) return res.status(400).json({error: "Please Submit a Photo"});

  const filePath = `music-box/${uuidv4()}-${req.file.originalname}`
  // create the object we want to send to aws 
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}

  s3.upload(params, async function(err, data){
    if(err){
      console.log('===============================')
      console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
      console.log('===============================')
      res.status(400).json({error: 'error from aws, check your terminal'})
    }

    // if s3 upload was successful create the user and store the file location
    req.body.photoUrl = data.Location; // data.Location is what we get back from aws of where Our file is stored
    const user = new User(req.body);
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });

    } catch (err) {
      console.log(err)
      console.log(err)
      res.status(400).json(err);
    }
  })
}
async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {

        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}
function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}
