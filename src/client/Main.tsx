'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { compileDungeon } from '../lib/MockDungeon';
import { createStyleSheets } from '../lib/Instrumentation';
import { DungeonLevel } from './DungeonLevel';
import { cssFn } from './Css';
const cssRogue = require('./rogue');

function App() {
    return <div className={cssFn.general('container')}>
        <DungeonLevel level={0} scale={2.5} />
        {/*<div className={enemy('enemies', 'normal', 'dragon02_idle')}><div></div></div>
        <div className={enemy('enemies', 'boss', 'lizard05_idle')}><div></div></div>
        < div className={enemy('enemies', 'boss', 'death03_idle')} ><div></div></div>*/}
    </div>;
}

window.onload = () => {
    let app = document.getElementById('app');
    if (app) {
        createStyleSheets(false);
        compileDungeon();
        app.classList.add(cssRogue['main']);
        ReactDOM.render(<App />, app);
    }
};

