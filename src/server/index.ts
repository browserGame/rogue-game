'use strict';

import * as path from 'path';


import * as  express from 'express';
import * as bodyParser from 'body-parser';
import { createStyleSheets } from '../lib/Instrumentation';


if (process.argv.length > 2) {

    let isNode = /(node(.exe)?)$/.test(process.argv[0]);
    let isJs = /\.js/i.test(process.argv[1]);
    let isSCSS = /^--scss$/i.test(process.argv[2]);
    if (isNode && isJs && isSCSS) {
        createStyleSheets();
        console.log('scss files created');
        process.exit(0);
    }
    console.log('Wrong commad line argument use -scss to generate scss sheets.');
    process.exit(1);
}



let app = express();

app.use(
    bodyParser.json({
        /*type: 'application/*+json',*/
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
        type: 'application/x-www-form-urlencoded',
        extended: true,
        inflate: true,
        parameterLimit: 1000,
        limit: '100kb',
        verify: (req, buf, encoding) => {
            req;
            buf;
            encoding;
        }
    })
);

app.use(
    bodyParser.text({
        type: 'text/html',
        defaultCharset: 'utf-8',
        inflate: true,
        limit: '100kb',
        verify: (req, buf, encoding) => {
            req;
            buf;
            encoding;
        }
    })
);

app.use(bodyParser.raw({
    type: 'application/vnd.custom-type',
    inflate: true,
    limit: '100kb',
}));

app.use('/', express.static(path.resolve('dist/client')));

function init(): Promise<boolean> {
    
    app.get('/room/:width/:height', (req, resp) => {
        let width = Number.parseInt(req.params['width']);
        let height = Number.parseInt(req.params['height']);
        resp.set({ 'Content-Type': 'text/plain' });
        let grid: string[];
        grid = new Array<string>(height).fill('+').map((itm, i) => {
            itm;
            //console.log('here:', i);
            let line = new Array<string>(width);
            if (i === 0 || i === height - 1) {
                line.fill('#');
                // console.log(line);
                return line.join('');
            }
            line = new Array<string>(width).fill('.');
            line[0] = '#';
            line[width - 1] = '#';
            return line.join('');
        });
        resp.send(`width ${width}, height:${height}\n${grid.join('\n')}`);

    });
    return Promise.resolve(true);
}

init().then(() => {
    let server = app.listen(8080, function listen() {
        console.log('app is listening on ', server.address().port);
        //logger.warn('app is listening on 8080');
    });
});

process.on('exit', () => {
    console.log('te %s', new Date().toTimeString());
});

process.on('SIGINT', () => {
    process.exit(1);
    // logger.warn('Caught [SIGINT] interrupt signal');
});

