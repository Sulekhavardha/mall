const express = require('express');
const router = express.Router();
const { getInquiries, createInquiry } = require('../controllers/conciergeController');

router.get('/', getInquiries);
router.post('/', createInquiry);

module.exports = router;

