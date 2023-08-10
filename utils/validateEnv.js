require('dotenv').config()
const cleanEnv = require("envalid").cleanEnv;
const validators = require("envalid/dist/validators");

module.exports = cleanEnv(process.env, {
    DB_CONNECTION: validators.str(),
    PORT: validators.port(),

});
