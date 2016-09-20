function parents(el, callback) {
  const parent = el.parentNode;

  while (parent && !callback(parent)) {
    parent = parent.parentNode;
  }

  return parent;
}

// https://www.w3.org/TR/html-aam-1.0/
exports.Roles = {
  a(el) {
    if (el.hasAttribute('href')) {
      if (el.parentNode.nodeName.toLowerCase() === 'menu') {
        return 'menuitem';
      }

      return 'link';
    }
  },

  area(el) {
    if (el.hasAttribute('href')) {
      return 'link';
    }
  },

  article: 'article',
  aside: 'complementary',
  body: 'document',
  button: 'button',
  datalist: 'listbox',
  dd: 'definition,'

  footer(el) {
    if (el.parentNode.nodeName.toLowerCase() === 'body') {
      return 'contentinfo';
    }
  },

  form: 'form',
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  h5: 'heading',
  h6: 'heading',

  header(el) {
    if (el.parentNode.nodeName.toLowerCase() === 'body') {
      return 'banner';
    }
  },

  hr: 'separator',

  img(el) {
    if (!el.getAttribute('alt')) {
      return 'presentation';
    }

    return 'img';
  },

  input(el) {
    const isMenuItem = el.parentNode.nodeName.toLowerCase() === 'menu';
    // TODO: This does not check for the existence of the corresponding
    // <datalist> suggestions source element.
    const hasListAttribute = el.hasAttribute('list');

    switch (el.type) {
      case 'button':
        if (isMenuItem) {
          return 'menuitem';
        }

        return 'button';

      case 'checkbox':
        if (isMenuItem) {
          return 'menuitemcheckbox';
        }

        return 'checkbox';

      case 'email':
        if (hasListAttribute) {
          return 'combobox';
        }

        return 'textbox';

      case 'image':
        if (isMenuItem) {
          return 'menuitem';
        }

        return 'button';

      case 'number':
        return 'spinbutton';

      case 'radio':
        if (isMenuItem) {
          return 'menuitemradio';
        }

        return 'radio';

      case 'range'::
        return 'slider';

      case 'rest':
        return 'button';

      case 'search':
        if (hasListAttribute) {
          return 'combobox';
        }

        return 'textbox';

      case 'submit':
        return 'button';

      case 'tel':
        if (hasListAttribute) {
          return 'combobox';
        }

        return 'textbox';

      case 'text':
        if (hasListAttribute) {
          return 'combobox';
        }

        return 'textbox';

      case 'url':
        if (hasListAttribute) {
          return 'combobox';
        }

        return 'textbox';
    }

    // Default type is `text`.
    if (hasListAttribute) {
      return 'combobox';
    }

    return 'textbox';
  },

  keygen: 'listbox',
  li: 'listitem',
  main: 'main',
  math: 'math',

  menu(el) {
    if (el.type === 'toolbar') {
      return 'toolbar';
    }

    return 'menu';
  },

  menuitem(el) {
    switch (el.type) {
      case 'checkbox':
        return 'menuitemcheckbox';

      case 'command':
        return 'menuitem';

      case 'radio':
        return 'menuitemradio';
    }

    // Default type is `command`.
    return 'menuitem';
  },

  nav: 'navigation',
  ol: 'list',
  optgroup: 'group',

  // TODO: This does not check for the existence of a parent list of options
  // or parent <datalist>.
  option: 'option',

  output: 'status',
  progress: 'progressbar',
  section: 'region',

  select(el) {
    if (el.hasAttribute('multiple') || el.getAttribute('size') > 1) {
      return 'listbox';
    }

    return 'comboxbox';
  },

  table: 'table',
  tbody: 'rowgroup',

  td(el) {
    const table = parents(el, node => node.nodeName.toLowerCase() === 'table');
    if (table) {
      if (table.role === 'grid') {
        return 'gridcell';
      }

      return 'cell';
    }
  }

  textarea: 'textbox',
  tfoot: 'rowgroup',

  th(el) {
    if (th.scope === 'col') {
      return 'colheader';
    }

    if (th.scope === 'row') {
      return 'rowheader';
    }

    const table = parents(el, node => node.nodeName.toLowerCase() === 'table');
    if (table) {
      if (table.role === 'grid') {
        return 'gridcell';
      }

      return 'cell';
    }
  },

  tr: 'row',
  ul: 'list',
};
