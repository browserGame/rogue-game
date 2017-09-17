'use strict';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { createStyleSheets } from '~instrumentation';

// Handle command line arguments, in this context this program is not firing up expressjs deamon

if (process.argv.length > 2) {
  const isNode = /(node(.exe)?)$/.test(process.argv[0]);
  const isJs = /\.js/i.test(process.argv[1]);
  const isSCSS = /^--scss$/i.test(process.argv[2]);
  if (isNode && isJs && isSCSS) {
    createStyleSheets()
    .then(() => console.log('scss files created'))
    .then(() => process.exit(0))
    .catch(e => {
      console.log('something went wrong', e);
      process.exit(2);
    });
  }
  console.log('Wrong commad line argument use --scss to generate scss sheets.');
  process.exit(1);
}

const app = express();

app.use(
  bodyParser.json({
    inflate: true,
    limit: '100kb',
    strict: true,
    verify: (req, buf, encoding) => {
      req;
      buf;
      encoding;
    }
  })
);

app.use(
  bodyParser.urlencoded({

    extended: true,
    inflate: true,
    limit: '100kb',
    parameterLimit: 1000,
    type: 'application/x-www-form-urlencoded',

    verify: (req, buf, encoding) => {
      req;
      buf;
      encoding;
    }
  })
);

app.use(
  bodyParser.text({
    defaultCharset: 'utf-8',
    inflate: true,
    limit: '100kb',
    type: 'text/html',
    verify: (req, buf, encoding) => {
      req;
      buf;
      encoding;
    }
  })
);

app.use(
  bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/vnd.custom-type'
  })
);

app.use('/', express.static(path.resolve('dist/client')));

const server = app.listen(8080, function listen() {
  console.log('app is listening on ', server.address().port);
});

process.on('SIGINT', () => {
  console.log('[SIGINT]');
  process.exit(1);
});

process.on('exit', () => {
  console.log('te %s', new Date().toTimeString());
});
