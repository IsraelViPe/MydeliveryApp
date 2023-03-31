const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/login.router');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
<<<<<<< HEAD
app.use('/login', loginRouter);
=======
app.use('/login', require('../routes/login.router'));
app.use('/register', require('../routes/register.router'));
>>>>>>> 5bafbafb17f582351aeabbb316800188ae163fa9
app.use(require('../middlewares/errorHandler'));

module.exports = app;
