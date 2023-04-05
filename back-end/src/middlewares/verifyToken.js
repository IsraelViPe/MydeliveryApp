import Jwt from 'jsonwebtoken';
import fs from 'fs';
import Path from 'path';
import { mapError } from '../utils/errorMap';

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) next(mapError('Token not found'));
    const secret = fs.readFileSync(Path.resolve(__dirname, '..', '..', 'jwt.evaluation.key'));
    Jwt.verify(authorization, secret, (error, decoded) => {
        if (error) next(mapError('Token inválido'));
        req.user = decoded.sub;
        next();
    });
};

export default verifyToken;