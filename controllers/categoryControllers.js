const Category = require('../models/category');
const {errorHandler } = require('../helpers/dberrorHandler');


exports.create = (req,res) => {
const category = new Category(req.body)
category.save((err, data) => {
    if (err) {
        return res.status(400).json({
            error: "algo paso con el servidor "
        })
    }
   
    res.json({data});
    console.log(data);
});
}

exports.list = (req, res)=>{
    Category.find().exec((err,data)=>{
        if (err) {
            return res.status(400).json({
                error: "no existen datos del servidor base de datos"
            });
        }
        res.json(data);
    })
}