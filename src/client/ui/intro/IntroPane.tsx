import * as React from 'react';
import { createCSSClassMapper } from '~css-tools';

const introPane = createCSSClassMapper(require('./introPane.scss'));

export class IntroPane extends React.Component {

  public constructor(props: any) {
    super(props);
  }

  public render() {
    return <div className={introPane('main')}>{this.props.children}</div>;
  }
}
