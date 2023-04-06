const LoginService = require('../services/login.service');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const response = await LoginService.login(email, password);
    console.log(response);
    if (response.statusCode) { 
        next(response);
        return;
    }

    return res.status(200).json(response);
};

module.exports = { login };
