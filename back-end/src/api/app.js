const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/login.router');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use(require('../middlewares/errorHandler'));

module.exports = app;
