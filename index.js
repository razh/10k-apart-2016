/* eslint-env es6, node */

const express = require('express');
const request = require('request');
const jsdom = require('jsdom');

require('marko/express');
require('marko/node-require').install();

const getRoles = require('./modules/getRoles')

const app = express();

const templates = {
  index: require('./index.marko'),
  svg: require('./svg.marko'),
};

app.use(express.static('public'));

app.get('/svg', (req, res) => res.marko(templates.svg));

app.get('*', (req, res) => {
  const url = req.originalUrl.slice(1);
  const startTime = process.hrtime();

  request.get(url, (error, response, body) => {
    if (error) {
      res.send(error)
      return;
    }

    jsdom.env(body, (jsdomError, window) => {
      if (jsdomError) {
        res.send(jsdomError);
        return;
      }

      const roles = getRoles(window);

      const [seconds, nanoseconds] = process.hrtime(startTime);
      const time = ((seconds * 1e9) + nanoseconds) * 1e-6;

      res.marko(templates.index, {
        url,
        body,
        time,
        roles,
        text: window.document.body.textContent,
      });
    });
  });
});

app.listen(process.env.PORT || 3000);
