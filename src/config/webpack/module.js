const { raw, styles, ts, tslint, inliner, identity } = require('./loaders');

module.exports = {
  client: {
    rules: [styles, tslint, ts, inliner]
  },
  server: {
    rules: [/*raw,*/ styles, tslint, ts, identity]
  }
};
