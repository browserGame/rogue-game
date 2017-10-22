
import * as React from 'react';


import { CHeroesAndMonsters } from './HeroesAndMonsters';
import { IntroPane } from './IntroPane';

export class Intro extends React.Component {

    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
        <IntroPane>
            <CHeroesAndMonsters />
        </IntroPane>
        );
    }
}

