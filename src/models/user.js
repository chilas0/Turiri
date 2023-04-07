const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        require: [true, 'Please add a name'],
    },
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
        //select: false
    }
});

/*UserSchema.pre('save', async function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})*/
module.exports = mongoose.model('User', UserSchema);