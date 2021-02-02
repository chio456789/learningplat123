const Curso = require('../models/curso');
const Topic = require('../models/topic');
const formidable = require('formidable');//
const _ = require('lodash');
const fs = require('fs');



exports.create = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err, fields, files)=>{
        if(err){
            return res.status(400).json({
                error:"Image could not be unploaded"
            })
        }
        const {name, description, category} = fields;
        let curso = new Curso(fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image so big"
                })
            }
            curso.photo.data = fs.readFileSync(files.photo.path);
            curso.photo.contentType = files.photo.type; 
        }
         curso.save((err, result) =>{
             if (err) {
                 return res.status(400).json({
                     error: "error de algun tipo"
                 })
             }
             res.json(result);
         })
         
    } )
}

exports.list = (req,res)=>{
   let order = req.query.order ? req.query.order : 'asc'
   let sortBy = req.query.sortBy ? req.query.sortBy : 'name';
   Curso.find().select("-photo").populate("category").sort([[sortBy,order]]).exec((err,cursos) => {
       if (err) {
           return res.status(400).json({
               error: "cursos not found"
           })
       }
       res.json(cursos);
   })
}

exports.remove = (req,res) => {
    let curso = req.curso
    curso.remove((err,deletedcurso) =>{
        if (err) {
            return res.status(400).json({
                error: "error en el borrado"
            })
        }
        res.json({
            message: "borrado el curso"
        })
    })

}

exports.cursoById = (req,res,next,id)=>{
    Curso.findById(id).populate("category").exec((err, curso)=>{
        if (err || !curso) {
            return res.status(400).json({
                error: "curso no encontrado"
            });
        }
        req.curso= curso;
        next();
    })
}

exports.photo = (req,res,next)=>{
    if (req.curso.photo.data) {
        res.set('Content-type',req.curso.photo.contentType);
        return res.send(req.curso.photo.data);

    }
    next();
}

exports.read = (req,res)=>
{
    req.curso.photo = undefined;
    return res.json(req.curso);
    
}
exports.topic = (req,res) => {
    const topic = new Topic(req.body)
    topic.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
       
        res.json({data});
        console.log(data);
    });
    }

exports.listopic = (req,res)=>{
        
        Topic.find({curso: req.curso._id}).exec((err,topics) => {
            if (err) {
                return res.status(400).json({
                    error: "cursos not found hahah"
                })
            }
            res.json(topics);
        })
     }
     