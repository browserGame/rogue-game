'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');



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

app.use((req,resp, next)=>{
    console.log(`req path: ${req.path}`);
    next();
});

app.use('/', express.static(path.resolve('src/client/test/')));
app.use('/css', express.static(path.resolve('src/client/dungeon/')));

let server = app.listen(8088, function listen() {
    console.log('app is listening on ', server.address().port);
});