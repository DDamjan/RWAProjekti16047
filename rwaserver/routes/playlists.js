var express = require('express');
var router = express.Router();
const queryString = require('../constants/queryConstants');
const query = require('../db/query');
const sha = require('sha.js');

router.post('/add', async (req, res) => {
  let name = req.body.name;
  let ownerID = req.body.ownerID;
  console.log("Name: "+name+"; ownerID: "+ownerID);
  query.execPost(req, res, queryString.ADD_PLAYLIST(name, ownerID));
});

router.get('/', async (req, res) => {
  let id = req.query.id;

  query.execUser(req, res, id);
});

router.post('/delete', async (req, res)=> {
  let id = req.body.id;

  query.execPost(req, res, queryString.DELETE_PLAYLIST+id);
});

module.exports = router;
