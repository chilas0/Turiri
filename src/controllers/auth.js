//Start imports 
const connectDB = require('../database/db');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
//End imports

//Start register function 
/**async function register(req, res){
    try {
        await connectDB();
        const { firstname, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = new User({
            ...req.body,
            email: email.toLowerCase(), 
            password: hashPassword,
            active: true
    });
        const result =  await User.create(user);
        res.status(200).send({msg: result})
    } catch (error) {
        console.error(error);
        res.status(500).send({msg: "error",error})
    }
}*/
//End register function

//Start login function
async function login(req, res){
    try {
        await connectDB();
        const { email, password } = req.body;
        if(!email) res.status(400).send({msg: "The email is required"});
        if(!password) res.status(400).send({msg: "The password is required"});
        const emailLowerCase = email.toLowerCase();
        const result = await User.findOne({email: emailLowerCase})
        if(!result){
            //If the user not found 
            res.status(400).send({msg: "User not found"})
        }else{
            //If exist the user it compares the password
            bcrypt.compare(password, result.password, (bcryptError, check) => {
                //It has a server error
                if(bcryptError){
                    res.status(500).send({msg: "Server error"});
                //If the password is incorrect
                }else if(!check){
                    res.status(500).send({msg: "Incorrect password"});
                //If the credentials is good 
                }else{
                    //It return the jwt token 
                    res.status(200).send({
                        access: jwt.createAccessToken(result),
                        refresh: jwt.createRefreshToken(result),
                    });
                }
            });
        }
    } catch (error) {
        res.status(500).send({msg: "error",error})
    }
}  
//End login function 

//Start refreshAccessToken function
async function refreshAccessToken(req, res){
    await connectDB();
    const { token } = req.body;
    if(!token){
        res.status(400).send({msg: "Token required"})
    }
    const { user_id } = jwt.decoded(token);
    const result =  await User.find({ _id: user_id });
    if(!result){
        res.status(500).send({msg: "Error del servidor"})
    }else{
        res.status(200).send({
            accessToken: jwt.createAccessToken(result)
        });
    }
}
//End refresh access token function

//Exports
module.exports = {
    //register,
    login,
    refreshAccessToken,
}

