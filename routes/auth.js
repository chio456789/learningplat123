

const express = require('express');
const router = express.Router();
const { ingresar } = require('../controllers/authControlle');
const { register } = require('../controllers/authControlle');
const { salir} = require('../controllers/authControlle');

router.post('/signin',ingresar);
router.post('/signup',register);
router.get('/signout',salir);



module.exports = router;

