//Start imports
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../database/constans");
//End imports

//Start createAccessToken function
function createAccessToken(user){
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);
    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
}
//End createAccessToken function

//Start createRefreshToken function
function createRefreshToken(user) {
    const expToken = new Date();
    expToken.getMonth(expToken.getMonth() + 1);
    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    };
    return jwt.sign(payload, JWT_SECRET_KEY);
}
//End createRefreshToken function

//Start decoded function
function decoded(token){
    return jwt.decode(token, JWT_SECRET_KEY, true);
}
//End decoded function

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded,
}