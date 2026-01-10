var express = require('express');
var router = express.Router();

const request = require('request');

// http://localhost:3000/cat にアクセスすると猫画像URLを返す
router.get('/', function(req, res) {
  request('https://api.thecatapi.com/v1/images/search', function (err, response, body) {
    if (err) return res.status(500).send(err.toString());

    const data = JSON.parse(body);
    res.send(data[0].url);
  });
});

module.exports = router;
