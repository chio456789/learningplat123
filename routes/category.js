const express = require('express');
const { list, create } = require('../controllers/categoryControllers');
const router = express.Router();

router.get('/categories',list);
router.post('/create',create);

module.exports = router;
