//Start imports 
const mongoose = require('mongoose');
const validator = require('validator');
/*const bcrypt = require('bcryptjs');*/
//End imports 

//Start user model
const UserSchema = new mongoose.Schema({
    firstname:{
        type: String,
        trim: true,
        require: [true, 'Please add a name'],
    },
    lastname:{
        type: String,
        trim: true,
        require: [true, 'Please add a name'],
    },
    telephone: String,
    idCard: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Entered email is invalid..."],
    },

    password: {
        type: String,
        require: [true, 'Please set a password'],
        minLength: 6
    },
    role: String,
    active: Boolean,
    avatar: String,
});
//End user model

/*UserSchema.pre('save', async function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})*/
module.exports = mongoose.model('User', UserSchema);