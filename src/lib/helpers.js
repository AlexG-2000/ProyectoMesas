const bcrypt = require('bcryptjs');

const helpers = {};
// Encriptar contraseña
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
// Comparar contraseña encriptada para cuando la persona haga su logeo
helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch(e) {
        console.log(e);
    }
};

module.exports = helpers;