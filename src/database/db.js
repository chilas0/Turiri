const mongoose = require('mongoose');
let conn = null;

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_COLLECTION
} = require("./constans");

module.exports = connectDatabase = async() => {
    if(conn == null){
        console.log('new con');
        conn = await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_COLLECTION}`);
        console.log(conn)
        return conn;
    }else{
        console.log('bad');
    }

    console.log(`Connec stabled`)
}