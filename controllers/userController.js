const User = require('../models/user');
const crypto = require('crypto');
const uuidv1 = require ('uuid/v1');
const formidable = require('formidable');//
const _ = require('lodash');
const fs = require('fs');


exports.addCurso = (req,res)=>
{
    User.updateOne(
        {_id:req.user.id},
        {$push:{cursos_inventory: req.body.cursos_inventory}},
        
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    }
    );
    
    
}

exports.userById = (req,res,next,id)=>
{
    User.findById(id).populate({path:"cursos_inventory",select:"name"}).exec((err, user)=>{
        if (err || !user) {
            return res.status(400).json({
                error: "usuario no encontrado"
            });
        }
        req.user= user;
        next();
    }) 
    
    
}

exports.avanceById = (req,res)=>
{
    var mm= parseInt(req.params.casa)
    return res.json(mm);
    
    
}

exports.readt = (req,res)=>
{
  
    return res.json(req.ava);
    
    
}




exports.read = (req,res)=>
{
  
    return res.json(req.user);
    
    
}


exports.addPorcent = (req,res)=>
{
    User.updateOne(
        {_id:req.user.id},
        {$addToSet:{avance:{
            idcurso:req.body.idcurso,
            porcent:req.body.porcent
            
        }
            }},
        
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    }
    );
    
    
}

exports.addPorcentNew = (req,res)=>
{
 
    var mm= req.params.casa
   User.updateOne({_id: req.user.id, 'avance.idcurso':mm}, {$inc:{'avance.$.porcent':req.body.porcent,
   'avance.$.level':req.body.level}}).exec((err,tata) => {
    if (err) {
        return res.status(400).json({
            error: "helps"
        })
    }
    res.json(tata);
})
}



exports.readPorcent = (req,res)=>
{   var mm= req.params.casa
    User.find({'avance.idcurso':mm},{'avance.$':1}).exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                error: "helps"
            })
        }
        res.json(data);
    })
    
}

exports.updateUser = (req,res)=>
{
 
   
   User.updateOne({_id: req.user.id},{    
       name:req.body.name,
       lastname:req.body.lastname
}
    ).exec((err,tata) => {
    if (err) {
        return res.status(400).json({
            error: {err}
        })
    }
    res.json(tata);
})
}


exports.updatePassword = (req,res)=>
{
  User.findById({_id: req.user.id}, function (err,est){
      if (err) {
          return res.status(400).json({
              error: "algo paso"
          });
      }
     est.hashed_password = est.encryptPassword(req.body.password);
     est.save(function (err){
         if (err) {
             return res.status(400).json({
                 error:"nene nene"
             })
         }
         res.send(est);
     });
  });
}
