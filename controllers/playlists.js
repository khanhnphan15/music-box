const Playlist = require("../models/playlist");

// helps generate random numbers for
// our file names, so every file name is unique
const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");
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
    getPlaylistDetail,
    update,
    _delete,
};
async function getPlaylistDetail(req, res) {
    try {
        const playlistId = req.params.id; // Assuming you're using Express and the ID is in the URL
        const playlist = await Playlist.findById(playlistId).populate('songs').exec();

        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        // Perform any additional actions or transformations as needed

        res.status(200).json({ playlist });
    } catch (err) {
        console.error("Error fetching playlist detail:", err);
        res.status(500).json({ error: "Error fetching playlist detail" });
    }
}

async function update(req, res) {
    const playlistId = req.params.id;
    try {
        // Find the playlist by ID
        const playlist = await Playlist.findById(playlistId).populate('songs').exec();

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Update playlist fields with data from req.body
        playlist.name = req.body.name;
        playlist.imageUrl = req.body.imageUrl;
        playlist.artist = req.body.artist;

        // Update or add individual songs within the songs array
        req.body.songs.forEach(songToUpdate => {
            const existingSong = playlist.songs.find(song => song._id.equals(mongoose.Types.ObjectId(songToUpdate._id)));
            if (!existingSong) {
                playlist.songs.push(songToUpdate);
            }
        });

        // Save changes to the database
        await playlist.save();

        return res.status(200).json({ message: 'Playlist updated successfully' });
    } catch (error) {
        console.error('Error updating playlist:', error);
        res.status(500).json({ error: 'An error occurred while updating the playlist' });
    }
}

function create(req, res) {
    // check if there is a file, if there isn't send back an error
    if (!req.file) return res.status(400).json({ error: "Please Submit a Photo" });

    // this is the location of where our file will stored
    // on aws s3
    const filePath = `music-box/posts/${uuidv4()}-${req.file.originalname}`;
    // create the object we want to send to aws
    const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

    try {
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
                const post = await Playlist.create({
                    name: req.body.name,
                    imageUrl: data.Location, // data.Location comes from the callback in the s3 upload
                });

                await post.populate("user"); // populating on a mongoose document! this gives us the user object
                // this response will show up in the feedPage in   const responseData = await postsApi.create(post);
                res.status(201).json({ data: post }); // <- this is what responseData should be
            } catch (err) {
                res.status(400).json({ error: err });
            }
        });
    } catch (err) {
        debugger
    }
}

async function index(req, res) {
    try {
        const playlists = await Playlist.find({}).exec();
        res.status(200).json({ playlists }); // Corrected field name to 'songs'
    } catch (err) {
        console.error("Error fetching songs:", err);
        res.status(500).json({ error: "Error fetching songs" });
    }
}

async function _delete(req, res) {
    const playlistId = req.params.playlistId;
    const songId = req.params.songId;

    try {
        // Find the playlist by ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Remove the song from the playlist
        playlist.songs = playlist.songs.filter(song => song._id.toString() !== songId);

        // Save changes to the database
        await playlist.save();

        return res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ error: 'An error occurred while deleting the song' });
    }
}
