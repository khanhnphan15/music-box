const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl:{
        type: String,
        required: true,
        trim: true,
    },
    songs:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
});
module.exports = mongoose.model('Playlist', playlistSchema);
