var express = require('express');
var router = express.Router();
var request = require('request');

// GET /qrcode?size=150x150&data=Example
router.get('/', function (req, res, next) {
  const size = req.query.size || '150x150';
  const data = req.query.data || 'Example';

  // QR Code Generator API
  const apiUrl =
    'https://api.qrserver.com/v1/create-qr-code/?size=' +
    encodeURIComponent(size) +
    '&data=' +
    encodeURIComponent(data);

  // requestで実際にアクセスして「APIが動くこと」を確認してからURLを返す
  request.get({ url: apiUrl, encoding: null, timeout: 10000 }, function (err, response) {
    if (err) {
      return res.status(500).json({ error: 'request failed', detail: String(err) });
    }
    if (!response || response.statusCode !== 200) {
      return res.status(500).json({ error: 'bad response', status: response && response.statusCode });
    }
		
    res.json([
      {
        size: size,
        data: data,
        url: apiUrl
      }
    ]);
  });
});

module.exports = router;
