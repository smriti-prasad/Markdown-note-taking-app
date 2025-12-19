const marked = require('marked');

function renderMarkdown(markdown) {
  return marked.parse(markdown);
}

module.exports = renderMarkdown;