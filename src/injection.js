const _ = require('underscore');

function buildSqlQuery(userId, tableName) {
  return 'SELECT * FROM ' + tableName + ' WHERE id = ' + userId;
}

function buildSqlSearch(keyword) {
  return "SELECT * FROM products WHERE name LIKE '%" + keyword + "%'";
}

function pollutePrototype(payload) {
  return _.extend({}, payload);
}

function mergeUnsafe(target, source) {
  const result = Object.assign({}, target);
  for (const key in source) {
    result[key] = source[key];
  }
  if (source.__proto__) {
    Object.assign(result.__proto__, source.__proto__);
  }
  return result;
}

module.exports = {
  buildSqlQuery,
  buildSqlSearch,
  pollutePrototype,
  mergeUnsafe
};
