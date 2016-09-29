/* eslint-env es6, node */

const d3 = require('d3');

module.exports = (document, root) => {
  global.document = document;

  const width = 512;
  const height = 1024;
  const radius = 3;

  const el = document.createElement('div');

  const svg = d3.select(el)
    .append('svg')
      .attr('width', width)
      .attr('height', height);

  const g = svg.append('g')
    .attr('transform', `translate(${radius},${radius})`);

  const tree = d3.tree()
    .size([height - 2 * radius, width - 2 * radius]);

  root = d3.hierarchy(
    root,
    d => Array.from(d.children).filter(
      child => child.nodeType === 1
    )
  );

  tree(root);

  g.append('g')
    .attr('stroke', '#fff')
    .selectAll('.link')
      .data(root.descendants().slice(1))
      .enter()
        .append('line')
          .attr('class', 'link')
          .attr('x1', d => d.parent.y)
          .attr('y1', d => d.parent.x)
          .attr('x2', d => d.y)
          .attr('y2', d => d.x);

  const node = g.append('g')
    .attr('fill', '#fff')
    .selectAll('.node')
    .data(root.descendants())
    .enter()
      .append('g')
        .attr('transform', d => `translate(${d.y},${d.x})`);

  node.append('circle')
    .attr('r', radius);

  node.append('text')
    .attr('dy', 3)
    .attr('x', d => d.children ? 8 : -8)
    .style('text-anchor', d => d.children ? 'start' : 'end')
    .text(d => d.data.nodeName.toLowerCase());

  return el;
};
