'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStyleSheets } from './Loader';

const cssRogue = require('./rogue');


function App() {
    return <div className={cssRogue['container']}>
        <div className="enemy-spritemap boss dragon02 right"></div>
        <div className="enemy-spritemap boss lizard05 right"></div>
        </div>;
}


window.onload = () => {
    let app = document.getElementById('app');
    if (app){
        app.classList.add(cssRogue['main']);
        createStyleSheets().then(() => ReactDOM.render(<App />, app));
    }
};

