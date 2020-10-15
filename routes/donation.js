const express = require('express');
const router = express.Router();

const donationHandler = require('./handler/donation');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, donationHandler.create);
router.delete('/:id', verifyToken, donationHandler.destroy);
router.get('/:id', verifyToken, donationHandler.getDonation);
router.put('/:id', verifyToken, donationHandler.updateStatus);



module.exports = router;