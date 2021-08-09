const allUsers = []

const getAllUsers = () => {
    return allUsers;
}


const getUser = (email) => {
    const user = allUsers.filter((eachUser) => eachUser.email === email)

    if(user.length > 0){
        return user[0];
    } else {
        return null;
    }
}

const getUserById = (id) => {
    const user = allUsers.filter((eachUser) => eachUser.id === id)

    if(user.length > 0){
        return user[0];
    } else {
        return null;
    }
}

const generateNewUserId = () => {
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
}


const insertNewUser = (name, email, mobile, password, filename) => {
    const user = {
        id: generateNewUserId(),
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        profilePicture: filename
    }

    allUsers.push(user);

    return user.id
}


const generateHashedPassword = function (password){
    const bcrypt = require('bcrypt');

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);
    // console.log("hashedPassword ", hashedPassword);

    return hashedPassword;
}


const updateUser = (id, name, email, mobile, filename) => {
    allUsers.forEach(user => {
        if(user.id === id){
            if(name){
                user.name = name;
            }
            if(email){
                user.email = email;
            }
            if(mobile){
                user.mobile = mobile;
            }
            if(filename){
                console.log(user);
                var fs = require('fs');
                var filePath = 'F:/Quantiphi Training/Node Assignment/node-basic-user-management/uploads/profilePictures/' + user.profilePicture;
                fs.unlinkSync(filePath);

                user.profilePicture = filename;
            }
        }
    });
    return;
}


const changePassword = (id, newPassword) => {
    allUsers.forEach(user => {
        if(user.id === id){
            const bcrypt = require('bcrypt');
            var salt = bcrypt.genSaltSync(10);

            var newHashedPassword = bcrypt.hashSync(newPassword, salt);
            user.password = newHashedPassword;
        }
    });

    return;
}


module.exports = {
    getAllUsers,
    getUser,
    generateNewUserId,
    generateHashedPassword,
    insertNewUser,
    getUserById,
    updateUser,
    changePassword
}