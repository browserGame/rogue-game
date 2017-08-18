
import * as React from 'react';

import {
    $Item,
    $Room,
    getNameSpace,
} from '../lib/Room';

import {
    gGame,
} from '../lib/MockDungeon';

import {
    // css, 
    resolverMap
} from './Css';

import {
    //toArray
} from '../lib/tools';

import {
    //LiquidType
} from '../lib/Symbols';

import {
    Vector
} from '../lib/math';


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

interface RenderProps {
    ns: string;
    zOffset?: number;
    dx?: number;
    dy?: number;
    hasShadow?: boolean;
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

    private renderLiquid() {
        let floorPlan = gGame[this.level];
        let roomPks = Array.from(floorPlan.rooms.keys());
        console.log(`drawing ns:${name}`);
        let elts: JSX.Element[] = [];
        roomPks.reduce((coll, id) => {
            let room = floorPlan.rooms.get(id) as $Room;
            let liquids = room.getNameSpace('liquid');
            liquids.forEach((l) => {
                coll.push(...this.renderLiquidRoom(room, l));
            });
            return coll;
        }, elts);
        return elts;
    }

    private renderLiquidRoom(r: $Room, m: $Item): JSX.Element[] {
        let brx = (m.br as Vector).x;
        let bry = (m.br as Vector).y;
        let _s = this._s;
        let rc: JSX.Element[] = [];
        let nrCellsx = brx - m.p.x;
        let nrCellsy = bry - m.p.y;

        let resolver = resolverMap[m.tag];

        for (let i = 0; i <= nrCellsx; i++) {
            for (let j = 0; j <= nrCellsy; j++) {
                let top = globTop(r, m.p.y + j, _s);
                let left = globLeft(r, m.p.x + i, _s);
                let zIndex = globZ(r, m.p.y);

                let LiquidAnim: React.CSSProperties = {
                    zIndex,
                    top: `${top}px`,
                    left: `${left}px`,
                    position: 'absolute'
                };

                rc.push(<div
                    key={`${r.pk}:${top}:${left}:${m.tag}:l`}
                    className={resolver(...m.gui.auxClassNames, ...m.gui.size, 'liquid')}
                    style={LiquidAnim} >
                    <div></div>
                </div>);

                let frame: React.CSSProperties = {
                    zIndex: zIndex + 1,
                    top: LiquidAnim.top,
                    left: LiquidAnim.left,
                    position: 'absolute'
                };

                let cl = (() => {
                    //singlespot
                    if (nrCellsx === nrCellsy && nrCellsy === 0) return 'top_single';
                    //horizontal line 1 dim
                    if (i === 0 && nrCellsy === 0) return 'single_left';
                    if (i === nrCellsx && nrCellsy === 0) return 'single_right';
                    if (nrCellsy === 0) return 'single_horizontal';
                    //vertical line 1 dim
                    if (j === 0 && nrCellsx === 0) return 'single_top';
                    if (j === nrCellsy && nrCellsx === 0) return 'single_bottom';
                    if (nrCellsx === 0) return 'single_vertical';
                    //some area at leas 2x2
                    //top line
                    if (j === 0 && i === 0) return 'top_top_left_corner';
                    if (j === 0 && i === nrCellsx) return 'top_top_right_corner';
                    if (j === 0) return 'top_top';
                    //bottom line
                    if (j === nrCellsy && i === 0) return 'top_bottom_left_corner';
                    if (j === nrCellsy && i === nrCellsx) return 'top_bottom_right_corner';
                    if (j === nrCellsy) return 'top_bottom';
                    //left wall
                    if (i === 0) return 'top_left';
                    //right wall
                    if (i === nrCellsx) return 'top_right';
                    // everything else, has no frame
                    return undefined;
                })();
                if (cl === undefined) continue;
                rc.push(<div
                    key={`${r.pk}:${top}:${left}:${m.tag}:f`}
                    className={resolver(...m.gui.auxClassNames, ...m.gui.size, cl)}
                    style={frame} >
                    <div></div>
                </div>);
            }
        }

        return rc;

    }


    private renderNameSpace(props: RenderProps) {
        /*name: string, cssResolver: (...rest: string[]) => string, zOffset: number = 0, dx: number = 0, dy: number = 0) {
          */
        let name = props.ns;

        let zOffset = props.zOffset || 0;
        let dx = props.dx || 0;
        let dy = props.dy || 0;
        let shadow = props.hasShadow || false;

        let _s = this._s;
        let floorPlan = gGame[this.level];
        let roomPks = Array.from(floorPlan.rooms.keys());
        console.log(`drawing ns:${name}`);
        let elts: JSX.Element[] = [];
        roomPks.reduce((coll, id) => {
            let r = floorPlan.rooms.get(id) as $Room;
            let asset = getNameSpace(r, name);
            let html = asset.filter((f) => !!f.gui.size).map((itm) => {
                let styles: React.CSSProperties = {
                    zIndex: globZ(r, itm.p.y) + zOffset,
                    top: `${globTop(r, itm.p.y, _s) + dy * _s}px`,
                    left: `${globLeft(r, itm.p.x, _s) + dx * _s}px`,
                    position: 'absolute'
                };
                let size: string[] = (!(itm.gui.size instanceof Array) ? [itm.gui.size] : itm.gui.size) as string[];

                let select = '┗┓┛┏┃━#'.indexOf(itm.tag) >= 0 ? '#' : itm.tag;
                select = '0123'.indexOf(itm.tag) >= 0 ? 'K' : select;

                let resolver = resolverMap[select];
                let classN = resolver(...(itm.gui.auxClassNames || []), ...(size));
                return (<div
                    key={`${this.level}:${id}:${itm.p.x}:${itm.p.y}`}
                    style={styles}
                    className={classN}
                >
                    <div></div>
                    {shadow ? <div></div> : undefined}
                </div >);
            });
            coll.push(...html);
            return coll;
        }, elts);
        return elts;
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
        let walls: JSX.Element[] = this.renderNameSpace({ ns: 'walls' });
        let floorTiles: JSX.Element[] = this.renderNameSpace({ ns: 'floor' });
        let carpets: JSX.Element[] = this.renderNameSpace({ ns: 'carpet' });
        let stairs: JSX.Element[] = this.renderNameSpace({ ns: 'stairs' });
        let skullBones: JSX.Element[] = this.renderNameSpace({ ns: 'skull&bones', zOffset: 1 });
        let cobWebs: JSX.Element[] = this.renderNameSpace({ ns: 'cobwebs' });
        let breakable: JSX.Element[] = this.renderNameSpace({ ns: 'breakable', zOffset: 2 });
        let openable: JSX.Element[] = this.renderNameSpace({ ns: 'openable', zOffset: 4 });
        let enemies: JSX.Element[] = this.renderNameSpace({ ns: 'enemy', zOffset: 7, hasShadow: true });
        let doors: JSX.Element[] = this.renderNameSpace({ ns: 'doors', zOffset: 7 });
        let floorGlyphs: JSX.Element[] = this.renderNameSpace({ ns: 'floor-glyphs', zOffset: 1 });
        let specials: JSX.Element[] = this.renderNameSpace({ ns: 'specials', zOffset: 1 });
        let liquids: JSX.Element[] = this.renderLiquid();

        //
        // doors;
        //
        return (<div style={styles} >
            {walls}
            {floorTiles}
            {liquids}
            {carpets}
            {stairs}
            {floorGlyphs}
            {skullBones}
            {cobWebs}
            {specials}
            {breakable}
            {openable}
            {enemies}
            {doors}
        </div>);
    }


}

