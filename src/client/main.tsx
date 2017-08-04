'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStyleSheets } from './Loader';

const cssRogue = require('./rogue');


function App() {
    return <div className={cssRogue['container']}>
        <div className="enemy-spritemap dragon02"></div>
        {/*<div className="enemy-spritemap boss lizard05 right"></div>
        <div className="enemy-spritemap boss death03 static zoom"></div>*/}
        </div>;
}


window.onload = () => {
    let app = document.getElementById('app');
    if (app){
        app.classList.add(cssRogue['main']);
        createStyleSheets().then(() => ReactDOM.render(<App />, app));
    }
};

