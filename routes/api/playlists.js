const { addPlaylist,deletePlaylist,addSongToPlaylist,removeSongFromPlaylist,getPlaylists,getPlaylist } = require('../../controllers/playlists');
const express = require ('express')
const router = express.Router();
// const playlistsCtrl = require("../../controllers/users");
//
// router.get('/',getPlaylists); //get all playlists
// router.get('/:id',getPlaylist) //get a playlist
// router.post('/create', addPlaylist); //add new playlist
// router.delete('/delete/:id', deletePlaylist); //delete a playlist
// router.post('/add/:id', addSongToPlaylist); //add song to playlist
// router.delete('/remove/:id', removeSongFromPlaylist); //remove song from playlist
//
// module.exports = router;