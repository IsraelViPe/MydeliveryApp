const express = require('express');
const cors = require('cors');
const { User } = require('../database/models');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', require('../routes/login.router'));
app.use(require('../middlewares/errorHandler'));

module.exports = app;
