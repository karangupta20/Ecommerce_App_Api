const User = require('../models/index').User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role=require('../models/index').roles;



const signup = async (data) => {
    const user = await User.create({
        email: data.email,
        password: data.password
    });
    const customerRole = await Role.findOne({
        where: {
            name: 'customer'
        }
    });
    user.addRole(customerRole);
    return user;
}
const addRoleToUser = async (userId, roleId) => {
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const role = await Role.findOne({
            where: {
                id: roleId
            }
        });
        user.addRole(role);
        return user;
    } catch (err) {
        console.log('something went wrong');
        console.log(err);
    }
}

const removeRoleFromUser = async (userId, roleId) => {
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const role = await Role.findOne({
            where: {
                id: roleId
            }
        });
        console.log(user, role);
        user.removeRole(role);
        return user;
    } catch (err) {
        console.log('something went wrong');
        console.log(err);
    }
}

const getRolesForUser = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        const roles = await user.getRoles();
        console.log(roles);
        return roles;
    } catch (err) {
        console.log(err);
    } 
    
}
const getUser = async (userEmail) => {
    const user = await User.findOne({
        where: {
            email: userEmail
        }
    });
    return user;
}
const getUserById =async(userId)=>{
    const user= await User.findOne({
        where: {
            id: userId
        }
    });
    return user;
}
const checkPassword = (userPassword, encryptedPassword) => {
    return bcrypt.compareSync(userPassword, encryptedPassword);
}


const createToken = (user) => {
    return jwt.sign({id: user.id, email: user.email}, 'relevel', { expiresIn: 60 * 60 });
}

const verifyToken = (token) =>{
    try{
        const response= jwt.verify(token,'relevel');
        return response;
    } catch(err){
        console.log('Token not verifed');
        console.log(err);
    }
}

module.exports = {
    signup,
    getUser,
    checkPassword,
    createToken,
    verifyToken,
    getUserById,
    addRoleToUser,
    removeRoleFromUser,
    getRolesForUser
    
}