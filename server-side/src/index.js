if (process.env.NODE_ENV) {
    require ("dotenv").config({
        path:`./.env.${process.env.NODE_ENV}`
    })
} else require ("dotenv").config()




const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

// mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/cloudesignDB?retryWrites=true&w=majority", {useNewUrlParser: true})
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 5000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 5000))
});