const express = require('express');
const app = express();

app.use(express.static(__dirname + '/uploads'));
app.use('/profilePictures', express.static('profilePictures'));

require('dotenv').config()

const PORT = process.env.PORT || 8080
const routesController = require('./routes/v1')()

app.listen(PORT, () => {
    console.log("Server has started and it is listening on PORT : ", PORT);
});


app.use(express.json());
app.use(express.urlencoded({  extended: true }));

app.use('/api/v1', routesController)