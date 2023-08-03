const express = require('express');
// require these for file uploads!
const multer = require('multer');
const upload = multer()
const songsCtrl = require('../../controllers/songs');
// /*---------- Public Routes ----------*/
// /api/posts
const router = express.Router();
router.post('/', upload.single('file'), songsCtrl.create);
router.get('/', songsCtrl.index);

module.exports = router;




// router.get('/',getPlaylists); //get all playlists
// router.get('/:id',getPlaylist) //get a playlist
// router.post('/create', addPlaylist); //add new playlist
// router.delete('/delete/:id', deletePlaylist); //delete a playlist
// router.post('/add/:id', addSongToPlaylist); //add song to playlist
// router.delete('/remove/:id', removeSongFromPlaylist); //remove song from playlist