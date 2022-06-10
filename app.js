const express = require('express');
const app = express();

const cors = require('cors')
app.use(express.json());
app.use(cors());

app.use("/eatDeliver", require("./routes/eatDeliver"));
app.listen("8080", (() => {
    console.log('Server listening to port 8080...');
}));
