//Start imports 
const bcrypt = require("bcryptjs")
const connectDB = require('../database/db');
const User = require("../models/user");
const validate = require("../validations/validate");
//End imports

//Start getMe function
async function getMe(req, res){
    await connectDB();
    const { user_id } = req.user;
    const response = await User.findById(user_id)
    if(!response){
        res.status(400).send({msg: "User not found"})
    }else{
        res.status(200).send(response)
    }
}
//End getMe function

//Start getUsers function
async function getUsers(req, res){
    await connectDB();
    const { active } = req.query;
    let response = null;
    if(active == undefined){
        response = await User.find();
    }else{
        response = await User.find({active});
    }
    res.status(200).send(response)
}
//End getUsers function

//Start createUser function
async function createUser(req, res){
    await connectDB();
    const { firstname, lastname, email, password, telephone, idCard } = req.body;

    res.status(200).send({msg: "User created"})
    //Validations 
        //If parameter is null
    if(validate.isEmpty(firstname)){
        res.status(400).send({msg: "The firstname is required"});
        return;
    } 

    if(validate.isEmpty(lastname)){
        res.status(400).send({msg: "The lastname is required"});
        return;
    }

    if(validate.isEmpty(email)){
        res.status(400).send({msg: "The email is required"});
        return;
    }

    if(validate.isEmpty(password)){
        res.status(400).send({msg: "The password is required"});
        return;
    }

    if(validate.isEmpty(telephone)){
        res.status(400).send({msg: "The telephone is required"});
        return;
    }

    if(validate.isEmpty(idCard)){
        res.status(400).send({msg: "The idCard is required"});
        return;
    }
    //End validations

    // const salt = bcrypt.genSaltSync(10);
    // const hashPassword = bcrypt.hashSync(password, salt);
    
    // if(req.files.avatar){
    //     console.log("avatar")
    // }
    // const user = new User({
    //     ...req.body,
    //     active: true,
    //     password: hashPassword
    // });
    // const response = await User.create(user);
    // if(!response){
    //     res.status(500).send({msg: "error"})
    // }else{
    //     res.status(200).send({msg: "User created"})
    // }
}
//End createUser function

//Start updateUser function
async function updateUser(req, res){
    await connectDB();
    const { id } = req.params;
    const userData = req.body;
    
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    }else{
        delete userData.password;
    }
    const response = await User.findOneAndUpdate({_id: id},userData);
    if(!response){
        res.status(500).send({msg: "error"})
    }else{
        res.status(200).send({msg: "User updated"})
    }
}
//End updateUser function

//Start deleteUser function
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
//End deleteUser function




//Exports 
module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}