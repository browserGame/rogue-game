'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStyleSheets } from './Loader';

function App() {
    return <div></div>;
}


window.onload = () => {
    createStyleSheets().then(() => ReactDOM.render(<App />, document.getElementById('app')));
};

