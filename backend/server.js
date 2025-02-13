require('dotenv').config();
require('./database/mongodb')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const commentRoutes = require('./routes/commentsRoute')

const app = express();
app.use(express.json());
app.use(cors());                    

app.use('/comments', commentRoutes); // Use comments API

app.get('/', (req, res) => res.send('Portfolio Backend Running 🚀'));

app.listen(5000, '0.0.0.0', () => console.log('Backend started in 5000!'))

module.exports = app
