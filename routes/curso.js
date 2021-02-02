const express = require('express');
const {create,list,remove, cursoById, photo,read,topic,listopic} = require('../controllers/cursoController');
const router = express.Router();

router.get('/curso',list);

router.post('/create',create);
router.get('/photo/:cursoId',photo);
router.delete('/:cursoId', remove);
router.get('/:cursoId',read);

router.post('/creates/topic',topic);
router.get('/topics/list/:cursoId',listopic);
router.param("cursoId", cursoById);
//router.param(":Id", topicId);



module.exports = router;
