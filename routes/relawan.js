const express = require('express');
const router = express.Router();

const relawanHandler = require('./handler/relawan');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', relawanHandler.register);
// router.post('/login', relawanHandler.login);
// router.get('/:id', verifyToken, relawanHandler.getRelawan);
// router.post('/', verifyToken, relawanHandler.logout);
// router.get('/', verifyToken, relawanHandler.getRelawans);
// router.put('/:id', verifyToken, relawanHandler.update);


module.exports = router;