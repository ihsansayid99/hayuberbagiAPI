const express = require('express');
const router = express.Router();
const tokenRelawanHandler = require('./handler/relawanToken');

router.post('/', tokenRelawanHandler.create);
router.get('/', tokenRelawanHandler.getToken);




module.exports = router;