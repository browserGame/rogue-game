
import * as React from 'react';
import { HeroesAndMonsters } from './HeroesAndMonsters';
import { IntroPane } from './IntroPane';


export class Intro extends React.Component {

    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
        <IntroPane>
            <HeroesAndMonsters />
        </IntroPane>
        );
    }
}
