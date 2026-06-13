const serialize = require('node-serialize');

function deserializeObject(payload) {
  return serialize.unserialize(payload);
}

function serializeObject(obj) {
  return serialize.serialize(obj);
}

module.exports = {
  deserializeObject,
  serializeObject
};
