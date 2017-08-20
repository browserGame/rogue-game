const { sql, styles, ts, tslint, non_inliner, pic_inliner, xml } = require('./loaders');

module.exports = {
  client: {
    rules: [styles, ts, tslint, non_inliner, xml]
  },
  server: {
    rules: [sql, styles, ts, tslint, xml, pic_inliner]
  }
};
