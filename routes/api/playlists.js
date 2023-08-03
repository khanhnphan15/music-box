const express = require ('express')
const playlistsCtrl = require("../../controllers/playlists");
const router = express.Router();
const multer = require('multer');
const upload = multer()

router.post('/', upload.single('audio'), playlistsCtrl.create);
router.get('/', playlistsCtrl.index);
// New route for fetching playlist details by ID
router.get('/:id', playlistsCtrl.getPlaylistDetail);

module.exports = router;