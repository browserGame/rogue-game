const { raw, styles, ts, tslint } = require('./loaders');

module.exports = {
  rules: [ raw, styles, tslint, ts ]
};
