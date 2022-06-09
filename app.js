const express = require('express');
const app = express();
app.use(express.json());
app.use('/eatDeliver', require('./routes/eatDeliver'));

app.listen('8000', () => {
  console.log('Server listening to port 8000...');
});
