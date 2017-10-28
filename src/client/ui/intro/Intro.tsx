import * as React from 'react';

import { MenuButton } from '~ui-intro-menus/MenuButton';
import { VText } from '~ui-text';
import { CHeroesAndMonsters } from './HeroesAndMonsters';
import { IntroPane } from './IntroPane';

export class Intro extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <IntroPane>
        <CHeroesAndMonsters>
          <MenuButton>
            <VText>CONTINUE</VText>
          </MenuButton>
          <MenuButton>
            <VText>NEW GAME</VText>
          </MenuButton>
          <MenuButton>
            <VText>STATS</VText>
          </MenuButton>
          <MenuButton>
            <VText>OPTIONS</VText>
          </MenuButton>
          <MenuButton>
            <VText>CREDITS</VText>
          </MenuButton>
          <MenuButton>
            <VText>EXIT</VText>
          </MenuButton>
        </CHeroesAndMonsters>
      </IntroPane>
    );
  }
}

