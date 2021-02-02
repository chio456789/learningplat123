const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cursoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true,
            maxlength: 32
        },
        shortDescription:{
            type:String,
            trim:true,
            require:true,

        },
        description: {
            type: String,
            trim: true,
            require: true,
           // maxlength: 32
        },
        category:{
            type: ObjectId,
            ref:"Category",
            required:true
        },
        teacher: {
            type: String,
            require: true,
            trim:true,
            maxlength: 32

        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    {
        timestamps: true
    }
);

module.exports= mongoose.model('Curso',cursoSchema);