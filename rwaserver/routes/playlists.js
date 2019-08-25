var express = require('express');
var router = express.Router();
const queryString = require('../constants/queryConstants');
const query = require('../db/query');
const sha = require('sha.js');

router.post('/addplaylist', async (req, res) => {
  let name = req.body.name;
  let ownerID = req.body.ownerID;

  query.execPost(req, res, queryString.ADD_PLAYLIST(name, ownerID));
});

  router.get('/', async (req, res) => {
    let id = req.query.id;
  
    query.execUser(req, res, id);
  });

module.exports = router;
