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
        console.log('new con');
        conn =  mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_COLLECTION}`,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log(conn)
        return conn;
    }else{
        console.log('bad');
    }

    console.log(`Connec stabled`)
}