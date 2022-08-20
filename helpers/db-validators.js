const Role = require('../models/role');
const User = require('../models/user');

const isRole = async(role = '') => {

    const existRole = await Role.findOne({ role });
    if ( !existRole ) {
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
}

const emailExist = async( email = '' ) => {

    // Verificar si el correo existe
    const existEmail = await User.findOne({ email });
    if ( existEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const existUserById = async( id ) => {

    // Verificar si el correo existe
    const existUser = await User.findById(id);
    if ( !existUser ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    isRole,
    emailExist,
    existUserById
}
