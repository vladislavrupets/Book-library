const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const readerRoute = require('./routes/readerRoute');

const PORT = process.env.PORT || 8000;
const IP = process.env.IP || 'localhost';

app.use(cors());
app.use(express.json());
app.use('/user', readerRoute);

app.listen(PORT, IP, () => {
    console.log('server started on ' + IP + ':' + PORT);
})