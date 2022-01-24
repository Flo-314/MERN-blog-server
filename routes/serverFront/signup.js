var express = require('express');
var router = express.Router();
var controller = require("../../controller/signup")
const multer  = require('multer')
const upload = multer()

/* GET home page. */
router.get('/', function(req, res, next) {
});

router.post('/', upload.single("image"), controller.post);

module.exports = router;
