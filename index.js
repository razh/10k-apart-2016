/* eslint-env es6 */

const escapeHtml = require('escape-html');
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

app.get('*', (req, res) => {
  const url = req.originalUrl.slice(1);

  request.get(url, (error, response, body) => {
    if (error) {
      res.send(error)
      return;
    }

    res.send(escapeHtml(body));

    const $ = cheerio.load(body);
    console.log($('body').html());
  });
});

app.listen(process.env.PORT || 3000);
