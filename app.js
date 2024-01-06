require('dotenv').config();
var expressValidator = require('express-validator');
const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const db = require('./models/database');
const models = require('./models');

const port = process.env.PORT || 5000;



const app = express();



        
app.use(cors());

app.use(morgan('dev'));




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('*/images', express.static(__dirname + '/public/images')) 

app.use('/', router);
            

db.sync({ force: true }).then(() => {

    app.listen(port, () => {
        
        console.log("Server started on port " + port);

    });

});


