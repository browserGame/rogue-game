'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

const cssRogue = require('./rogue');



function rogue(...rest: string[]): string {
    let self = require('./rogue');
    let arr = rest.map((c) => self[c]);
    return arr.join(' ');
}

function enemy(...rest: string[]): string {
    let self = require('./dungeon/enemies');
    let arr = rest.map((c) => self[c]);
    return arr.join(' ');
}



function App() {
    return <div className={rogue('container')}>
        <div className={enemy('enemies', 'normal', 'dragon02_idle')}><div></div></div>
        <div className={enemy('enemies', 'boss', 'lizard05_idle')}><div></div></div>
        < div className={enemy('enemies', 'boss', 'death03_idle')} ><div></div></div>
    </div>;
}

window.onload = () => {
    let app = document.getElementById('app');
    if (app) {
        app.classList.add(cssRogue['main']);
        ReactDOM.render(<App />, app);
    }
};

