const { poolPromise } = require('../db/db');
const sql = require('mssql');
const queryString = require('../constants/queryConstants');

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

async function returnArray(req, res, query) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('input_parameter', sql.Int, req.query.input_parameter)
      .query(query);
    return result.recordset;
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
}

async function execUser(req, res, ID) {
  let user = await returnArray(req, res, queryString.GET_USER_BY_ID + ID);
  let playlists = await returnArray(req, res, queryString.GET_PLAYLISTS + ID);

  let data = {
    ID: user[0].ID,
    Username: user[0].Username,
    playlists:playlists
  }

  res.json(data);
}

module.exports = {
  execGet: execGet,
  execPost: execPost,
  execFile: execFile,
  execUser: execUser
}