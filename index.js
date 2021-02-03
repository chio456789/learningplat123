const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

require('dotenv').config();

//midlawares
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const connection = process.env.DATABASE;
mongoose.connect(connection, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true

}).then(()=>{
    console.log('base de datos conectada')
})
//rroutes
app.use('/api/category',require('./routes/category'));
app.use('/api/cursos',require('./routes/curso'));
app.use('/api/authentication', require('./routes/auth'));
app.use('/api/profile', require('./routes/user'));



//listen
const port= process.env.PORT || 4000

app.listen(port, ()=>{
    console.log('servidor de plataforma de aprendizaje ejecutado en el puerto 4000');
})