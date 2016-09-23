/* eslint-env es6, node */

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

require('marko/express');
require('marko/node-require').install();

const app = express();

const templates = {
  index: require('./index.marko'),
  svg: require('./svg.marko'),
};

app.use(express.static('public'));

app.get('/svg', (req, res) => res.marko(templates.svg));

app.get('*', (req, res) => {
  const url = req.originalUrl.slice(1);

  request.get(url, (error, response, body) => {
    if (error) {
      res.send(error)
      return;
    }

    const $ = cheerio.load(body);

    res.marko(templates.index, {
      url,
      body,
      text: $('body').text(),
    });
  });
});

app.listen(process.env.PORT || 3000);
