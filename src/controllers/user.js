const bcrypt = require("bcryptjs")
const connectDB = require('../database/db');
const User = require("../models/user");
const { response } = require("express");

 function getMe(req, res){
     connectDB();
    const { user_id } = req.user;
    userObj =  User.findById(user_id).lean();

    if(userObj){
        return {
            statusCode:200,
            body: JSON.stringify(userObj)
        }
    }else{
        return {
            statusCode:404,
            body: JSON.stringify({error: "Requested resource is not found in the database"})
        }
    }
}



//  async function getUsers(req, res) {
//     await connectDB();
//     const { active } = req.query;
//     let response = null;
  
//     if(active == undefined){
//                 response = await User.find();
//             }else{
//                 response = await User.find({active});
//             }
//             console.log(response)
//             res.status(200).send(response)
    
// }

async function getUsers(req, res) {
    await connectDB();
    const { active } = req.query;
  
    let query = active === undefined ? await User.find() : await User.find({ active });
  
    query.lean()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}
  

function createUser(req, res){
     connectDB();
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    
    if(req.files.avatar){
        //TODO
        console.log("avatar")
    }
    const user = new User({
        ...req.body,
        active: true,
        password: hashPassword
    });

    const response =  User.create(user);
    if(!response){
        res.status(500).send({msg: "error"})
    }else{
        res.status(200).send({msg: "User created"})
    }
}

 function updateUser(req, res){
     connectDB();
    const { id } = req.params;
    const userData = req.body;

    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    }else{
        delete userData.password;
    }
    const response =  User.findOneAndUpdate({_id: id},userData, { new: true });
    if(!response){
        res.status(500).send({msg: "error"})
    }else{
        res.status(200).send({msg: "User updated"})
    }
}

async function deleteUser(req, res){
    await connectDB();
    const { id } = req.params;
    const response = await User.findByIdAndUpdate({_id: id}, {active:false});
    if(!response){
        res.status(500).send({msg: "error"})
    }else{
        res.status(200).send({msg: "User deleted"})
    }
}
module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}