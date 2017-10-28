const { sql, styles, ts, tslint, non_inliner, pic_inliner, xml, fonts } = require('./loaders');

module.exports = {
  client: {
    rules: [styles, ts, tslint, non_inliner, xml, fonts]
  },
  server: {
    rules: [sql, styles, ts, tslint, xml, pic_inliner]
  }
};
