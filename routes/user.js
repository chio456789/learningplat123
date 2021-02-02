const express = require('express');
const {addCurso,read,userById,addPorcent,addPorcentNew, readPorcent,updateUser, updatePassword} = require('../controllers/userController');
const router = express.Router();


router.post('/addCurso/:userId',addCurso);
router.post('/porcent/:userId',addPorcent);
router.post('/porcent/new/:userId/:casa',addPorcentNew);
router.post('/update/:userId',updateUser);
router.post('/updatePassword/:userId',updatePassword);
//router.get('/porcent/new/:userId/:casa',pepito);
//router.get('/porcent/new/:userId/:casa',avanceById);

/*router.delete('/:cursoId', remove);*/
router.get('/porcent/:casa',readPorcent);
router.get('/:userId',read);
router.param("userId", userById);




module.exports = router;
