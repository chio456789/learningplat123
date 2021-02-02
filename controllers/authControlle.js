const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.register = (req,res) => {
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((error,use)=>{
        if (error) {
            return res.status(400).json({
                message: error
            })
        }
            
            res.json({
                user
            })
        
    })
}

exports.ingresar = (req,res) =>{
const {email,password} = req.body;
User.findOne({email},(error,user)=>{
    if (error || !user) {
        return res.status(400).json({
            message: 'usuario con ese correo no coincide'
        });

    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        message: 'email no coincide con la contraseña'
      })
    }
    
    const token =jwt.sign({_id:user._id},process.env.JWT_SECRET)
    res.cookie('t',token,{expire:new Date() + 999})
    const {_id,name,email,role}=user
    return res.json({token, user: {_id,email,name}})

});
}

exports.salir =(req,res)=>{
    res.clearCookie('t')   
    res.json({
        message:"salida exitosa"
    });

}