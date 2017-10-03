import * as React from 'react';
// X import * as ReactDOM from 'react-dom';

import { createCSSClassMapper } from '~css-tools';
import { Intro } from '~ui-intro';

const css = createCSSClassMapper(require('./app.scss'));

export function App() {


      return (
        <div className={css('main')}>
          <Intro />
        </div>
      );
    }
