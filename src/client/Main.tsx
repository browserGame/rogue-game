'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


// I import { createCSSClassMapper } from '~css-tools';
import { registerOnMouseMove, registerOnResize } from '~events';
import { createStyleSheets } from '~instrumentation';
import { compileDungeon } from '~items';
import { store } from '~store';
import { App } from './ui/App';
// tslint:disable-next-line:no-import-side-effect
// tslint:disable-next-line:import-spacing

import { css as cssMain } from '~client';


window.onload = () => {
  // Add global event handlers mousemove and window resize
  // These will pump these ui-events to the redux store
  registerOnMouseMove(store);
  registerOnResize(store);
  const app = document.getElementById('app');
  if (app) {
    app.classList.add(cssMain('app-mount-point'));

    createStyleSheets(false).catch(e => console.log(e));
    compileDungeon();
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      app,
      () => {
        window.dispatchEvent(new CustomEvent('resize')); // Trigger re-size event
      }
    );
  }
};
