const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require ('uuid/v1');
const { ObjectId } = mongoose.Schema;

const useSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        maxlength:32
    },
    lastname:{
        type: String,
        trim:true,
        maxlength:32
    }
    ,
    email:{
        type: String,
        trim: true,
        require: true,
        unique:true

    },
    hashed_password:{
        type: String,
       require: true,
    },
    salt: String,
    cursos_inventory: [{
        type: ObjectId,
        ref: "Curso",
       
    }
    ],
    avance: [{
        
        idcurso: String,
        porcent: Number,
        level:{
            type: Number,
            default:1
        }
    }]
    

},
{timestamps:true}

);

useSchema.virtual("password").set(function(password) {
    this._password = password;
    this.salt=uuidv1();
    this.hashed_password = this.encryptPassword(password);
   
}).get(function() {
    return this._password;
});

useSchema.methods = {
    authenticate: function(plaintext) 
    {
        return this.encryptPassword(plaintext) === this.hashed_password;
    },

    encryptPassword: function(password)
     {
            if (!password) return '';
            try {
            return crypto.createHmac('sha1',this.salt).update(password).digest('hex')
            
            

            } 
            catch (err) {
            return "";
            }
    }
};

module.exports = mongoose.model("User", useSchema);