require('dotenv').config(); // this is important!

module.exports = {

"development": {
    "username": "root",
    "password": "Bacon111",
    "database": "venReveiws_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "Bacon111",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
};

//https://stackoverflow.com/questions/38757728/using-an-enviroment-variable-for-local-sequelize-configuration