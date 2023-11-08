//Start connection with MongoDB
const mongoose = require('mongoose');
let conn = null;

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_COLLECTION
} = require("./constans");

module.exports = connectDatabase => {
    if(conn == null){
        conn = mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_COLLECTION}`);
        return conn;
    }
}
//End connection with MongoDB