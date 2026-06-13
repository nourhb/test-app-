const Handlebars = require('handlebars');
const ejs = require('ejs');

function renderHandlebars(template, context) {
  const compiled = Handlebars.compile(template);
  return compiled(context);
}

function renderEjs(template, context) {
  return ejs.render(template, context);
}

module.exports = {
  renderHandlebars,
  renderEjs
};
