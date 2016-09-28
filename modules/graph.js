/* eslint-env es6, node*/

'use strict';

const d3 = require('d3');
const graph = require('./miserables.json');

module.exports = document => {
  global.document = document;

  const width = 512;
  const height = 512;

  const el = document.createElement('div');

  const svg = d3.select(el)
    .append('svg')
      .attr('width', width)
      .attr('height', height);

  const link = svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
      .data(graph.links)
      .enter()
        .append('line');

  const node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
      .data(graph.nodes)
      .enter()
        .append('circle')
          .attr('r', 2.5);

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.id))
    .force('change', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

  simulation.nodes(graph.nodes);

  simulation.force('link')
    .links(graph.links);

  simulation.stop();

  let i = 100;
  while (i--) {
    simulation.tick();
  }

  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);

  node
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  return el;
};
