const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const topicSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            require: true,
            
        },
        introduction:{
            type:String,
            trim:true,
            require:true,

        },
        body: {
            type: String,
            trim: true,
            require: true,
           // maxlength: 32
        },
        conclusion:{
            type:String,
            trim:true,
            require:true,
        },
        curso:{
            type: ObjectId,
            ref:"Curso",
           
        },
        url:{
            type: String,
            trim:true,
            require:true
        }
        
    },
    {
        timestamps: true
    }
);

module.exports= mongoose.model('Topic',topicSchema);