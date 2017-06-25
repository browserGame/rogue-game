'use strict';

import * as  express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { compileDungeon } from '../lib/rooms';

//import { SystemInfo } from '../lib/system';
//import { registerAuth } from '../lib/authentication';

//import Logger from '../lib/logger';

//const logger = Logger.getLogger();

/* init */
/* init */

//SystemInfo.createSystemInfo({ maxErrors: 5000, maxWarnings: 5000 });

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
    app.get('/processing', (req, resp) => {
        req;
        resp.set({ 'Content-Type': 'text/plain' });
        resp.send(compileDungeon());
    });

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

