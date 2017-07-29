'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

require('./Loader');

function App() {
    return <div></div>;
}


window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
};

