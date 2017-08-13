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
        <DungeonLevel level={0} scale={3} />
        {/*<div className={enemy('enemies', 'normal', 'dragon02_idle')}><div></div></div>
        <div className={enemy('enemies', 'boss', 'lizard05_idle')}><div></div></div>
        < div className={enemy('enemies', 'boss', 'death03_idle')} ><div></div></div>*/}
        <div style={
            {
                position: 'fixed',
                top: '0px',
                left: '0px',
                bottom: '0px',
                right: '0px',
                backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1), rgba(0,0,0,0.8)',
                zIndex:999999
            }
        }></div>
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

