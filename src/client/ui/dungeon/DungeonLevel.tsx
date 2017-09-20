
import * as React from 'react';

import {
    gGame,
    IItem,
    Room
} from '~items';

import {
    resolverMap
} from './Css';

import {
    IVector
} from '~math';

/*
Design decisions for ReactJS,
All DungeonElements will be (mostly) div tags with a size of 24x24 pixels wide,and (position)absoluutly placed

Although visually the div elements are placed anywere ( absolute ) they still have DOM insertion order
and even with unique "key" attribute on the React component
If you generate the tags in different order React will adjust the position anyway even if they have the same key.
So we need to avoid React updating the DOM just because of re-ordering.

TO avoid this:
 The DOM will be generated like this

  <div>
   // static content

        floor tiles,
        walls,
        carpets,
        lanterns,
        skullsbones (on floor tiles),
        traps,
        other static unchangeble obstructions,
        portals
    //dynamics content
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

// GGame;

const cellDim = 24;

export interface IDungeonLevelProperties {
    level: number;
    scale: number;
}

interface IRenderProps {
    ns: string;
    zOffset?: number;
    dx?: number;
    dy?: number;
    hasShadow?: boolean;
}

const globZ = (r: Room, y: number) => (r.top + y) * 100;
const globTop = (r: Room, y: number, scale: number) => (r.top + y) * cellDim * scale;
const globLeft = (r: Room, x: number, scale: number) => (r.left + x) * cellDim * scale;

export class DungeonLevel extends React.Component<IDungeonLevelProperties> {

    private level: number;
    private _s: number;

    public constructor(props: IDungeonLevelProperties) {
        super(props);
        this.level = props.level;
        this._s = props.scale;
    }

    public render() {
        const _s = this._s;
        const fp = gGame[this.level];
        const styles = {
            height: `${fp.height * _s * cellDim}px`,
            width: `${fp.width * _s * cellDim}px`
        };
        //
        // Allwallfragments, allFloorTyles
        //
        const walls: JSX.Element[] = this.renderNameSpace({ ns: 'walls' });
        const floorTiles: JSX.Element[] = this.renderNameSpace({ ns: 'floor' });
        const carpets: JSX.Element[] = this.renderNameSpace({ ns: 'carpet' });
        const stairs: JSX.Element[] = this.renderNameSpace({ ns: 'stairs' });
        const skullBones: JSX.Element[] = this.renderNameSpace({ ns: 'skull&bones', zOffset: 1 });
        const cobWebs: JSX.Element[] = this.renderNameSpace({ ns: 'cobwebs' });
        const breakable: JSX.Element[] = this.renderNameSpace({ ns: 'breakable', zOffset: 2, hasShadow: true });
        const openable: JSX.Element[] = this.renderNameSpace({ ns: 'openable', zOffset: 4, hasShadow: true });
        const enemies: JSX.Element[] = this.renderNameSpace({ ns: 'enemy', zOffset: 7, hasShadow: true });
        const doors: JSX.Element[] = this.renderNameSpace({ ns: 'doors', zOffset: 7 });
        const floorGlyphs: JSX.Element[] = this.renderNameSpace({ ns: 'floor-glyphs', zOffset: 1 });
        const specials: JSX.Element[] = this.renderNameSpace({ ns: 'specials', zOffset: 1, hasShadow: true });
        const liquids: JSX.Element[] = this.renderLiquid();
        const drops: JSX.Element[] = this.renderNameSpace({ ns: 'drops', zOffset: 1 });
        const edible: JSX.Element[] = this.renderNameSpace({ ns: 'edible', zOffset: 1 });
        const weapons: JSX.Element[] = this.renderNameSpace({ ns: 'weapons', zOffset: 1 });
        const traps: JSX.Element[] = this.renderNameSpace({ ns: 'traps', zOffset: 1 });
        const teleport: JSX.Element[] = this.renderNameSpace({ ns: 'portal', zOffset: 4 });

        //
        // Doors;
        //
        return (<div style={styles} >
            {walls}
            {floorTiles}
            {liquids}
            {carpets}
            {stairs}
            {traps}
            {floorGlyphs}
            {skullBones}
            {cobWebs}
            {specials}
            {breakable}
            {openable}
            {enemies}
            {doors}
            {drops}
            {edible}
            {weapons}
            {teleport}
        </div>);
    }

    private renderLiquid() {
        const floorPlan = gGame[this.level];
        const roomPks = Array.from(floorPlan.rooms.keys());
        console.log(`drawing ns:${name}`);
        const elts: JSX.Element[] = [];
        roomPks.reduce((coll, id) => {
            const room = floorPlan.rooms.get(id) as Room;
            const liquids = room.getNameSpace('liquid');
            liquids.forEach(l => {
                coll.push(...this.renderLiquidRoom(room, l));
            });

            return coll;
        },             elts);

        return elts;
    }

    private renderLiquidRoom(r: Room, m: IItem): JSX.Element[] {
        const brx = (m.br as IVector).x;
        const bry = (m.br as IVector).y;
        const _s = this._s;
        const rc: JSX.Element[] = [];
        const nrCellsx = brx - m.p.x;
        const nrCellsy = bry - m.p.y;

        const resolver = resolverMap[m.tag];

        for (let i = 0; i <= nrCellsx; i++) {
            for (let j = 0; j <= nrCellsy; j++) {
                const top = globTop(r, m.p.y + j, _s);
                const left = globLeft(r, m.p.x + i, _s);
                const zIndex = globZ(r, m.p.y);

                const LiquidAnim: React.CSSProperties = {
                    left: `${left}px`,
                    position: 'absolute',
                    top: `${top}px`,
                    zIndex
                };

                rc.push(<div
                    key={`${r.pk}:${top}:${left}:${m.tag}:l`}
                    className={resolver(...m.gui.auxClassNames, ...m.gui.size, 'liquid')}
                    style={LiquidAnim} >
                    <div></div>
                </div>);

                const frame: React.CSSProperties = {
                    left: LiquidAnim.left,
                    position: 'absolute',
                    top: LiquidAnim.top,
                    zIndex: zIndex + 1
                };

                const cl = (() => {
                    // Singlespot
                    if (nrCellsx === nrCellsy && nrCellsy === 0) return 'top_single';
                    // Horizontal line 1 dim
                    if (i === 0 && nrCellsy === 0) return 'single_left';
                    if (i === nrCellsx && nrCellsy === 0) return 'single_right';
                    if (nrCellsy === 0) return 'single_horizontal';
                    // Vertical line 1 dim
                    if (j === 0 && nrCellsx === 0) return 'single_top';
                    if (j === nrCellsy && nrCellsx === 0) return 'single_bottom';
                    if (nrCellsx === 0) return 'single_vertical';
                    // Some area at leas 2x2
                    // Top line
                    if (j === 0 && i === 0) return 'top_top_left_corner';
                    if (j === 0 && i === nrCellsx) return 'top_top_right_corner';
                    if (j === 0) return 'top_top';
                    // Bottom line
                    if (j === nrCellsy && i === 0) return 'top_bottom_left_corner';
                    if (j === nrCellsy && i === nrCellsx) return 'top_bottom_right_corner';
                    if (j === nrCellsy) return 'top_bottom';
                    // Left wall
                    if (i === 0) return 'top_left';
                    // Right wall
                    if (i === nrCellsx) return 'top_right';
                    // Everything else, has no frame

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

    private renderNameSpace(props: IRenderProps) {
        /*name: string, cssResolver: (...rest: string[]) => string, zOffset: number = 0, dx: number = 0, dy: number = 0) {
          */
        const name = props.ns;

        const zOffset = props.zOffset || 0;
        const dx = props.dx || 0;
        const dy = props.dy || 0;

        const _s = this._s;
        const floorPlan = gGame[this.level];
        const roomPks = Array.from(floorPlan.rooms.keys());
        console.log(`drawing ns:${name}`);
        const elts: JSX.Element[] = [];
        roomPks.reduce((coll, id) => {
            const r = floorPlan.rooms.get(id) as Room;
            const asset = r.getNameSpace(name);
            const html = asset.filter(f => !!f.gui.size).map(itm => {
                const styles: React.CSSProperties = {
                    left: `${globLeft(r, itm.p.x, _s) + dx * _s}px`,
                    position: 'absolute',
                    top: `${globTop(r, itm.p.y, _s) + dy * _s}px`,
                    zIndex: globZ(r, itm.p.y) + zOffset
                };
                const size: string[] = (!(itm.gui.size instanceof Array) ? [itm.gui.size] : itm.gui.size) as string[];

                let select = '┗┓┛┏┃━#'.indexOf(itm.tag) >= 0 ? '#' : itm.tag;
                select = '0123'.indexOf(itm.tag) >= 0 ? 'K' : select;

                const resolver = resolverMap[select];
                const shadow = itm.gui.hasShadow === undefined ? props.hasShadow : itm.gui.hasShadow;
                const classN = resolver(...(itm.gui.auxClassNames || []), ...(size), shadow ? 'shadow' : '');

                return (<div
                    key={`${itm.tag}:${this.level}:${id}:${itm.p.x}:${itm.p.y}`}
                    style={styles}
                    className={classN}
                >
                    <div></div>
                    {shadow ? <div></div> : undefined}
                </div >);
            });
            coll.push(...html);

            return coll;
        },             elts);

        return elts;
    }

}

