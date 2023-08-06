const express = require ('express')
const playlistsCtrl = require("../../controllers/playlists");
const router = express.Router();
const multer = require('multer');
const upload = multer()

router.post('/', upload.single('file'), playlistsCtrl.create);
router.get('/', playlistsCtrl.index);
router.put('/:id', playlistsCtrl.update);
// New route for fetching playlist details by ID
router.get('/:id', playlistsCtrl.getPlaylistDetail);
router.delete('/:playlistId/songs/:songId', playlistsCtrl._delete);

module.exports = router;