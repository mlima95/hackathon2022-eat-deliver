const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

/************************************************
 *                  EXPRESS SERVER              *
 ************************************************/

/*********************** MIDDLEWARE *************************/
app.use(express.static( __dirname + '/front' ));
app.use(express.json());
app.use(cors());

/*********************** ROUTE *************************/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.use("/eatDeliver", require("./routes/eatDeliver"));

/*********************** LAUNCH SERVER***********************/
app.listen("6888", (() => {
    console.log('Server listening to port 6888...');
}));
