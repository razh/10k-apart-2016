/* eslint-env es6 */

const request = require('request');
const cheerio = require('cheerio');

const args = process.argv.slice(2);

const url = args[0];

request.get(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return error;
  }

  const $ = cheerio.load(body);
  console.log($.html());
});
