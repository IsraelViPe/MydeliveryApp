const Jwt = require('jsonwebtoken');
const fs = require('fs');
const Path = require('path');
const { mapError } = require('../utils/errorMap');

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) { 
        next(mapError('Token not found'));
        return;
    }
    const secret = fs.readFileSync(Path.resolve(__dirname, '..', '..', 'jwt.evaluation.key'));
    Jwt.verify(authorization, secret, (error, decoded) => {
        if (error) {
            next(mapError('Token inválido'));
            return;
        }
        req.user = decoded.sub;
        next();
    });
};

module.exports = verifyToken;