const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', require('../routes/login.router'));
app.use('/register', require('../routes/register.router'));
app.use('/products', require('../routes/product.router'));
app.use(require('../middlewares/errorHandler'));

module.exports = app;
