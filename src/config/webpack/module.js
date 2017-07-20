const { raw, styles, ts, tslint , inliner } = require('./loaders');

module.exports = {
  rules: [ raw, styles, tslint, ts , inliner ]
};
