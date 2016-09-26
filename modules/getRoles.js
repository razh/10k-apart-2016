/* eslint-env es6, node */

const { Roles } = require('./Roles');

function getRole(el) {
  const role = Roles[el.nodeName.toLowerCase()];
  if (typeof role === 'function') {
    return role(el);
  }

  return role;
}

module.exports = function getRoles(window) {
  const roles = [];

  const { document, NodeFilter } = window;
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT
  );

  while (treeWalker.nextNode()) {
    const { currentNode } = treeWalker;
    const role = getRole(currentNode);
    if (role) {
      roles.push(role);
    }
  }

  return roles;
};
