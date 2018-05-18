require('dotenv').config(); // this is important!

module.exports = {

"development": {
    "username": "root",
    "password": process.env.MySQL_Database_Password,
    "database": "venReveiws_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.MySQL_Database_Password,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
    // "username": "root",
    // "password": process.env.MySQL_Database_Password,
    // "database": "database_production",
    // "host": "127.0.0.1",
    // "dialect": "mysql"
  }
};

//https://stackoverflow.com/questions/38757728/using-an-enviroment-variable-for-local-sequelize-configuration