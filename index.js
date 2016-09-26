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

function deltaTimeInMs(time) {
  const [seconds, nanoseconds] = process.hrtime(time);
  return ((seconds * 1e9) + nanoseconds) * 1e-6;
}

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

    const loadTime = deltaTimeInMs(startTime);

    jsdom.env(body, (jsdomError, window) => {
      if (jsdomError) {
        res.send(jsdomError);
        return;
      }

      const roles = getRoles(window);
      const text = window.document.body.textContent;
      const totalTime = deltaTimeInMs(startTime);

      res.marko(templates.index, {
        url,
        body,
        roles,
        text,
        loadTime,
        totalTime,
        parseTime: totalTime - loadTime,
      });
    });
  });
});

app.listen(process.env.PORT || 3000);
