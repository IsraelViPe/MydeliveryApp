const express = require('express');
const { User } = require('../database/models');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/janta', async (_req, res) => {
    const users = await User.findOne();
    res.status(200).json(users);
});

module.exports = app;
