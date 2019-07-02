const { poolPromise } = require('../db/db');
const sql = require('mssql');
var formidable = require('formidable');
var mv = require('mv');

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

async function execUploadPic(req, res, path) {
  var form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    var oldpath = files.filetoupload.path;
    var newpath = path + files.filetoupload.name;
    let id = files.filetoupload.name.split('.', 1);
    let name = files.filetoupload.name;
    execGet(req, res, queryString.UPDATE_PICTURE(name, id));
    mv(oldpath, newpath, function (err) {
      if (err) throw err;
    });
  });
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
  execUploadPic: execUploadPic,
  execFile: execFile
}