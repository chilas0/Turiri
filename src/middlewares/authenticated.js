//Start imports
const jwt = require("../utils/jwt");
//End imports

//Start asureAuth function
function asureAuth(req, res, next){
    //It verifies if a user has an autorization
    if(!req.headers.authorization){
        return res.status(403).send({msg: "The petition has not authentication head"})
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const payload = jwt.decoded(token);
        const { exp } = payload;
        const currentData = new Date().getTime();
        //Token has expired
        if(exp <= currentData){
            return res.status(400).send({msg: "The token has expired"})
        }
        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({msg: "Invalid token"})
    }
}
//End asureAuth function

module.exports = {
    asureAuth,
}