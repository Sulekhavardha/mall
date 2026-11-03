const express = require('express');
const router = express.Router();
const { getStores, getStoreById, createStore } = require('../controllers/storeController');

router.get('/', getStores);
router.get('/:id', getStoreById);
router.post('/', createStore);

module.exports = router;

