const connectDB = require('../database/db');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");


async function register(req, res){
    try {
        await connectDB();
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email: email.toLowerCase(), 
            password
    });

    //Encripta la contraseña 
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;
        
        const result =  await User.create(user);
        res.status(200).send({msg: result})
    } catch (error) {
        console.error(error);
        res.status(500).send({msg: "error",error})

    }
}

async function login(req, res){
    try {
        await connectDB();
        const { email, password } = req.body;

        if(!email) res.status(400).send({msg: "The email is required"});
        if(!password) res.status(400).send({msg: "The password is required"});

        const emailLowerCase = email.toLowerCase();
        const result = await User.findOne({email: emailLowerCase})
        
        if(!result){
            res.status(400).send({msg: "User not found"})
        }else{
            bcrypt.compare(password, result.password, (bcryptError, check) => {
                if(bcryptError){
                    res.status(500).send({msg: "Error del servidor"});
                    //Verrifica si la contraseña es correcta 
                }else if(!check){
                    res.status(500).send({msg: "Contraseña incorrecta"});
                    //Si el usuario no esta activado entonces arroja el error 
                }else{
                    res.status(200).send({
                        access: jwt.createAccessToken(result),
                        refresh: jwt.createRefreshToken(result),
                    });
                }
            });
        }
        
    
    } catch (error) {
        console.error(error);
        res.status(500).send({msg: "error",error})
    }
    
}   

async function refreshAccessToken(req, res){

    await connectDB();
    const { token } = req.body;
    
    if(!token){
        res.status(400).send({msg: "Token required"})
    }
    const { user_id } = jwt.decoded(token);
    console.log(user_id)
    const result =  await User.find({ _id: user_id });

    if(!result){
        res.status(500).send({msg: "Error del servidor"})
    }else{
        res.status(200).send({
            accessToken: jwt.createAccessToken(result)
        });
    }
}

module.exports = {
    register,
    login,
    refreshAccessToken,
}

