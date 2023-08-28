const Song = require("../models/song");

// helps generate random numbers for
// our file names, so every file name is unique
const {v4: uuidv4} = require("uuid");
// import the s3 constructor
const S3 = require("aws-sdk/clients/s3");
// initialize the S3 constructor so we have an object to talk to aws
const s3 = new S3();

// since everyone has a unique bucket name,
// its a good use case for a .env variable
// because we don't share that outside our computer
const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
    create,
    index,
    deleteSong,
};

function create(req, res) {
    const caption = req.body.caption;
    const file = req.file; // The uploaded file, if present
    const title = req.body.title;
    const artist = req.body.artistName;
    const album = req.body.album;
    const description = req.body.description;
    // check if there is a file, if there isn't send back an error
    if (!req.file) return res.status(400).json({error: "Please provide an mp3"});

    // this is the location of where our file will stored
    // on aws s3
    const filePath = `songs/${uuidv4()}-${req.file.originalname}`;
    // create the object we want to send to aws
    const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer};

    s3.upload(params, async function (err, data) {
        if (err) {
            console.log("===========================================");
            console.log(
                err,
                " err from aws, either your bucket name is wrong or your keys arent correct"
            );
            console.log("===========================================");
            res.status(400).json({error: "Error from aws, check your terminal!"});
        }

        try {
            // Use our Model to create a document in the posts collection in Mongodb
            const song = await Song.create({
                caption: req.body.caption,
                title: req.body.title,
                artistName: req.body.artist,
                album: req.body.album,
                description: req.body.description,
                url: data.Location
            });
            // this response will show up in the feedPage in   const responseData = await postsApi.create(post);
            res.status(201).json({data: song }); // <- this is what responseData should be
        } catch (err) {
            res.status(400).json({error: err});
        }
    });
}

async function index(req, res) {
    try {
        const songsQuery = Song.find({});
        if (Object.keys(req.query).length > 0) {
            let searchConditions = [];
            for (let k of Object.keys(req.query)) {
                searchConditions.push({ [k]: { $regex: req.query[k], $options: 'i' } });
            }
            songsQuery.or(searchConditions);
        }
        let songs = await songsQuery.exec();

        res.status(200).json({songs}); // Corrected field name to 'songs'
    } catch (err) {
        console.error("Error fetching songs:", err);
        res.status(500).json({error: "Error fetching songs"});
    }
}
async function deleteSong(req, res) {
    try {
        const song = await Song.findById(req.params.id); // Find the song by ID

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        await song.remove(); // Remove the song
        res.json({ data: 'Song removed' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

