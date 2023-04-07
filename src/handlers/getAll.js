const connectDB = require('../database/db');
const User = require('../models/user');


module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectDB();
        

        userObj =  await User.find();
        return {
            statusCode:200,
            body: JSON.stringify(userObj)
        }
    } catch (error) {
        console.error(error);
        return{
            statusCode: error.statusCode || 500,
            body: JSON.stringify({msg: error.message})
        }
    }
}

