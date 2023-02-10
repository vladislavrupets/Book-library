const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const IP = process.env.IP || 'localhost';

app.use(cors());
app.use(express.json());
app.use('/user', require('./routes/reader-routes'));

app.listen(PORT, IP, () => {
    console.log('server started on ' + IP + ':' + PORT);
})