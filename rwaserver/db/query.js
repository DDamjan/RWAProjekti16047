const { poolPromise } = require('../db/db');
const sql = require('mssql');

async function execGet(req, res, query) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('input_parameter', sql.Int, req.query.input_parameter)
      .query(query);
    res.json(result.recordset);
    res.end();
  } catch (err) {
    res.status(500);
    res.send(err.message);
    res.end();
  }
}

async function execPost(req, res, query) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('input_parameter', sql.Int, req.query.input_parameter)
      .query(query);
    res.json(req.body);
    res.end();
  } catch (err) {
    res.status(500);
    res.send(err.message);
    res.end();
  }
}

async function execFile(res, path) {
  try {
    res.sendFile(path);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
}

module.exports = {
  execGet: execGet,
  execPost: execPost,
  execFile: execFile
}