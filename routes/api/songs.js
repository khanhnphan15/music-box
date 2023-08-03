const express = require('express');
const router = express.Router();
const songsCtrl = require('../../controllers/songs');
// require these for file uploads!
const multer = require('multer');
const upload = multer()
// /*---------- Public Routes ----------*/
// /api/posts
router.post('/', upload.single('audio'), songsCtrl.create);
router.get('/', songsCtrl.index);

module.exports = router;




// router.get('/',getPlaylists); //get all playlists
// router.get('/:id',getPlaylist) //get a playlist
// router.post('/create', addPlaylist); //add new playlist
// router.delete('/delete/:id', deletePlaylist); //delete a playlist
// router.post('/add/:id', addSongToPlaylist); //add song to playlist
// router.delete('/remove/:id', removeSongFromPlaylist); //remove song from playlist