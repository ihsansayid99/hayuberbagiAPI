const express = require('express');
const router = express.Router();

const donaturHandler = require('./handler/donatur');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', donaturHandler.register);
router.post('/login', donaturHandler.login);
router.get('/:id', verifyToken, donaturHandler.getDonatur);
router.post('/', verifyToken, donaturHandler.logout);
router.get('/', verifyToken, donaturHandler.getDonaturs);
router.put('/:id', verifyToken, donaturHandler.update);


module.exports = router;