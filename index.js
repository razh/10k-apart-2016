/* eslint-env es6, node */

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

require('marko/express');
require('marko/node-require').install();

const app = express();

const template = require('./index.marko');

app.get('*', (req, res) => {
  const url = req.originalUrl.slice(1);

  request.get(url, (error, response, body) => {
    if (error) {
      res.send(error)
      return;
    }

    const $ = cheerio.load(body);

    res.marko(template, {
      url,
      body,
      text: $('body').text(),
    });
  });
});

app.listen(process.env.PORT || 3000);
