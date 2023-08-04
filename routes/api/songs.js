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
router.delete('/:id', songsCtrl.deleteSong); //delete a playlist
module.exports = router;




