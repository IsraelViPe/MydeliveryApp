const Jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { mapError } = require('../utils/errorMap');
const { User } = require('../database/models');

const tokenverify = async (token) => {
    const tokenSecret = fs.readFileSync(path.resolve(__dirname, '..', '..', 'jwt.evaluation.key'));
    const result = Jwt.verify(token, tokenSecret, (error, decoded) => {
        if (error) return mapError('Token inválido');
        return { sub: decoded.sub };
    });

    if (result.statusCode) return result;

    const user = await User.findOne({ where: { id: result.sub } });

    return {
        name: user.name,
        email: user.email,
        role: user.role,
        token,
    };
};

module.exports = { tokenverify };