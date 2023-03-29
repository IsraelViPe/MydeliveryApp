const codes = {
    OK: 200,
    UNAUTHORIZED: 401,
}

const errors = [
    { message: 'O "email" informado é inválido', statusCode: codes.UNAUTHORIZED }
];

const mapError = (message) => {
    const error = errors.find((err) => err.message === message);
    if(error) return error;
    return { message: 'Error not Mapped', statusCode: 403 }
}

module.exports = mapError;