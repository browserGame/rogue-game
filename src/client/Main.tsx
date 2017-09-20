'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createCSSClassMapper } from '~css-tools';
import { createStyleSheets } from '~instrumentation';
import { compileDungeon } from '~items';
import {
 //   DungeonLevel
} from '~ui-dungeon';
import { Intro } from '~ui-intro';


const css = createCSSClassMapper(require('main.scss'));

function App() {
    return (<div className={css('container')}>
        {/*<DungeonLevel level={0} scale={3} />
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
          }*/}
          <Intro />
    </div>);
}

window.onload = () => {
    const app = document.getElementById('app');
    if (app) {
        createStyleSheets(false).catch(e => console.log(e));
        compileDungeon();
        app.classList.add(css('container'));
        ReactDOM.render(<App />, app);
    }
};

