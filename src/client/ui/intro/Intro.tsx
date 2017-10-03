
import * as React from 'react';

import { createMouseMoveResponse } from './createMouseMoveResponse';
import { HeroesAndMonsters } from './HeroesAndMonsters';
import { IntroPane } from './IntroPane';

export class Intro extends React.Component {

    public constructor(props: any) {
        super(props);
    }

    public render() {
        return (
        <IntroPane>
            <HeroesAndMonsters rotationMapFunction={createMouseMoveResponse(0.01)} />
        </IntroPane>
        );
    }
}

