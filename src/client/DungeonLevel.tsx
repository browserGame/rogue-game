
import * as React from 'react';

import {
    $Room,
    getNameSpace
} from '../lib/Room';

import {
    gGame,
    // DungeonGameModel 
} from '../lib/MockDungeon';

import {
    cssFn
} from './Css';

/*
Design decisions for ReactJS,
All DungeonElements will be (mostly) div tags with a size of 24x24 pixels wide,and (position)absoluutly placed

Although visually the div elements are placed anyware ( absolute ) they still have DOM insertion order 
and even with unique "key" attribute on the React component 
If you generate the tags in different order React will adjust the position anyway even if they have the same key.

TO avoid this:
 The DOM will be generated like this

  <div> 
     { static content here, 
        floor tiles, 
        walls, 
        carpets, 
        lanterns, 
        skullsbones (on floor tiles), 
        traps, 
        other static unchangeble obstructions,
        portals,
    }
    {
       objects that change this but put enemies and monsters atthe end of this list so a large part of the generation
       remains static.  pickup items at the end of the child node list.

       ts , these can change, (openable, breakable, blood).
       coffins, 
       closets, 
       breakable table, 
       port, 
       treasure chest
        monsters that move, the hero, animated effects, game-fog (black area you cant see)
        pickup items
    }
</div>
*/

gGame;

const cellDim = 24;

export interface DungeonLevelProperties {
    level: number;
    scale: number;
}

const globZ = (r: $Room, y: number) => (r.top + y) * 100;
const globTop = (r: $Room, y: number, scale: number) => (r.top + y) * cellDim * scale;
const globLeft = (r: $Room, x: number, scale: number) => (r.left + x) * cellDim * scale;

export class DungeonLevel extends React.Component<DungeonLevelProperties, {}> {

    private level: number;
    private _s: number;

    constructor(props: DungeonLevelProperties) {
        super(props);
        this.level = props.level;
        this._s = props.scale;
    }

    private renderNameSpace(name: string, cssResolver: (...rest: string[]) => string, zOffset: number = 0, dx: number = 0, dy: number = 0) {
        let _s = this._s;
        let floorPlan = gGame[this.level];
        let roomPks = Array.from(floorPlan.rooms.keys());
        console.log(`number of rooms to drow:${roomPks.length}`);
        let walls: JSX.Element[] = [];
        roomPks.reduce((coll, id) => {
            let r = floorPlan.rooms.get(id) as $Room;
            let asset = getNameSpace(r, name);
            let htmlWall = asset.map((itm) => {
                if (!itm.gui.size) {
                    throw new Error(`[${asset}] has no gui size in room ${id} ${JSON.stringify(itm.p)}`);
                }
                let styles: React.CSSProperties = {
                    zIndex: globZ(r, itm.p.y) + zOffset,
                    top: `${globTop(r, itm.p.y, _s) + dy * _s}px`,
                    left: `${globLeft(r, itm.p.x, _s) + dx * _s}px`,
                    position: 'absolute'
                };
                let size = !(itm.gui.size instanceof Array) ? [itm.gui.size] : itm.gui.size;
                let classN = cssResolver(...(itm.gui.auxClassNames || []), ...size);
                return (<div
                    key={`${this.level}:${id}:${itm.p.x}:${itm.p.y}`}
                    style={styles}
                    className={classN}
                >
                    <div></div>
                </div >);
            });
            coll.push(...htmlWall);
            return coll;
        }, walls);
        return walls;
    }

    render() {
        let _s = this._s;
        let fp = gGame[this.level];
        let styles = {
            width: `${fp.width * _s * cellDim}px`,
            height: `${fp.height * _s * cellDim}px`
        };
        //
        // allwallfragments, allFloorTyles
        //
        let walls: JSX.Element[] = this.renderNameSpace('walls', cssFn.floor_crypt);
        let floorTiles: JSX.Element[] = this.renderNameSpace('floor', cssFn.floor_crypt);
        let carpets: JSX.Element[] = this.renderNameSpace('carpet', cssFn.common_fo);
        let stairs: JSX.Element[] = this.renderNameSpace('stairs', cssFn.floor_crypt);
        let skullBones: JSX.Element[] = this.renderNameSpace('skull&bones', cssFn.dungeon_decor_props, 1);
        let cobWebs: JSX.Element[] = this.renderNameSpace('cobwebs', cssFn.dungeon_decor_props);
        let breakable: JSX.Element[] = this.renderNameSpace('breakable', cssFn.dungeon_o, 2);
        let openable: JSX.Element[] = this.renderNameSpace('openable', cssFn.dungeon_o, 4);
        let enemies: JSX.Element[] = this.renderNameSpace('enemy', cssFn.enemies, 7);
        return (<div style={styles} >
            {walls}
            {floorTiles}
            {carpets}
            {stairs}
            {skullBones}
            {cobWebs}
            {breakable}
            {openable}
            {enemies}
        </div>);
    }


}

