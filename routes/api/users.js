const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// require these for file uploads!
const multer = require('multer');
const upload = multer()
/*---------- Public Routes ----------*/
router.post("/signup", upload.single('photo'), usersCtrl.signup);
router.post("/login", usersCtrl.login);
// this is params for the api request coming from the react side
router.get('/:username', usersCtrl.profile);
/*---------- Protected Routes ----------*/

module.exports = router;







