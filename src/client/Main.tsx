'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStyleSheets } from '../lib/instrumentation/index';
import { compileDungeon } from '../lib/MockDungeon';
import { css } from './Css';
import { DungeonLevel } from './ui/DungeonLevel';
const cssRogue = require('./rogue');

function App() {
    return (<div className={css.general('container')}>
        <DungeonLevel level={0} scale={3} />
        {/*
        <div className={enemy('enemies', 'normal', 'dragon02_idle')}><div></div></div>
        <div className={enemy('enemies', 'boss', 'lizard05_idle')}><div></div></div>
        <div className={enemy('enemies', 'boss', 'death03_idle')} ><div></div></div>
        */}
        {
            <div style={
                {
                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1), rgba(0,0,0,0.8)',
                    bottom: '0px',
                    left: '0px',
                    pointerEvents: 'none',
                    position: 'fixed',
                    right: '0px',
                    top: '0px',
                    zIndex: 999999
                }
            }></div>
          }
    </div>);
}

window.onload = () => {
    const app = document.getElementById('app');
    if (app) {
        createStyleSheets(false);
        compileDungeon();
        app.classList.add(cssRogue['main']);
        ReactDOM.render(<App />, app);
    }
};

