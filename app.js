const express = require('express');
const app = express();

const cors = require('cors')
const path = require('path');
app.use(express.json());
app.use(cors());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.use("/eatDeliver", require("./routes/eatDeliver"));
app.listen("6888", (() => {
    console.log('Server listening to port 6888...');
}));
