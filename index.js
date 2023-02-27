const mongoose = require("mongoose");

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    API_VERSION,
} = require("./constans");

//Se define el puerto si no esta definido en POST se conecta al 3977

//Conexion a DB
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
  (error) => {
    if(error) throw error;

       console.log("Conecto")
});