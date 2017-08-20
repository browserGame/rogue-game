'use strict';

import * as path from 'path';


import * as  express from 'express';
import * as bodyParser from 'body-parser';
import { createStyleSheets } from '../lib/Instrumentation';

/** */
/*
import * as fs from 'fs';
const PNG = require('pngjs').PNG;

let png = require('../client/dungeon/common_floor_objects.png').replace(/^data:image\/[^;]+\;base64\,/, '');

const buf = new Buffer(png, 'base64');
buf;
fs.writeFileSync('./test2.png', png, 'base64');

//const rs = fs.createReadStream(png, { encoding: 'base64' });

let _png = new PNG({
    //filterType: 4
});

_png.on('metadata', function md() {
    console.log(JSON.stringify(arguments));
});

_png.on('error', function err() {
    console.log('error:' + JSON.stringify(arguments));
});

let src = PNG.sync.read(buf);
let dst = new PNG({ width: src.width, height: src.height });
//function(src, dst, srcX, srcY, width, height, deltaX, deltaY) { 
PNG.bitblt(src, dst, 0, 0, src.width, src.height, 0, 0);
//<sheet 
    //name="candles_pedestral_1" 
    //texture="common_floor_objects.png" 
    //ox="10" 
    //oy="22" 
    //x="193" 
    //y="24" 
    //width="21" 
    //height="24" 
    // />
//<sheet 
//  name="candles_pedestral_2" 
//  texture="common_floor_objects.png" 
//  ox="9" 
//  oy="22" 
//  x="218" 
//  y="24" 
//  width="19" 
//  height="24" 
// />
PNG.bitblt(src, dst, 218, 24, 19, 24, 48 + 21 / 2 - 19 / 2, 168);


for (let x = 0; x < dst.width; x++) {
    for (let y = 0; y < dst.height; y++) {
        let c = (y * dst.width + x) << 2;
        dst.data[c + 0] = 255;
        dst.data[c + 1] = 0;
        dst.data[c + 2] = 0;
        dst.data[c + 3] = 128;
    }
}

//console.log({ dst });
dst.pack().pipe(fs.createWriteStream('out.png'));




.on('parsed', function () {

    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            // invert color 
            this.data[idx] = 255 - this.data[idx];
            this.data[idx + 1] = 255 - this.data[idx + 1];
            this.data[idx + 2] = 255 - this.data[idx + 2];

            // and reduce opacity 
            this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
    }

    this.pack().pipe(fs.createWriteStream('out.png'));
});
*/




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

