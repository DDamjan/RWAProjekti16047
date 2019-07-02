const constants = require ('../constants/dbConnection');

const sql = require('mssql');

const config = {
    user: constants.USER_NAME,
    password: constants.PASSWORD,
    server: constants.SERVER_WEB,
    database: constants.DATABASE
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
  sql, poolPromise
}