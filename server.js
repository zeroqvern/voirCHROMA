const express = require ('express');
const mongoose = require ('mongoose');
// const mongoose = require('mongodb').MongoClient;
const bodyParser = require ('body-parser');
const path = require('path');
const config = require('config');

const app = express();
const app2 = express();

//body parser
app.use(bodyParser.urlencoded({extended: true}));


//DB config
const uri = config.get('mongoURI');

// connect to mongoDB atlas
var db = mongoose.connect(uri).then(()=> {
        console.log("Connected to database");
        mongoose.connection.db.listCollections().toArray(function(err, names){
            // console.log(names);
        })
    })
    .catch(()=> {
        console.log("Error Connected to database");
    });


const routes = require('./routes/database');

// use router on url: /api/colorItems
app.use('/', routes) ;
app.use(express.json());

const api = require('./routes/colorApi');
app.use('/', api);

const userData = require('./routes/userData');
app.use('/user', userData);




//production purposes
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const port  = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
