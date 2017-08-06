const { sql, styles, ts, tslint, inliner, xml } = require('./loaders');

module.exports = {
  client: {
    rules: [styles, ts, tslint, inliner]
  },
  server: {
    rules: [sql, styles, ts, tslint, xml]
  }
};
