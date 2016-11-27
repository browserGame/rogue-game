import { Room, Cell, profilerFactory, multinomial_random_sample, formatDungeon, createDoors, GridPoint } from "./map-tools";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

let profiler = profilerFactory('gaussian', { sigma: 16 });

let result: Room = formatDungeon(50, 50, 10, profiler);
createDoors(result);

//console.log(result);
//console.log(selection);

function App(prop: { dungeon: Room }) {

    function drawRoomRecursive(ctx: CanvasRenderingContext2D, room: Room): void {
        //console.log(room.room.r,room.room.b);
        ctx.fillStyle = 'rgb(80,80,80)';
        if (!room.leftRight && !room.upDown) {
            for (let i = room.room.l + 1; i <= room.room.r - 1; i++) {
                for (let j = room.room.t + 1; j <= room.room.b - 1; j++) {
                    ctx.fillRect(1 + i * 6, 1 + j * 6, 4, 4);
                }
            }
        }
        ctx.fillStyle = 'rgb(190,80,80)'
        let g: GridPoint;
        let doors = room.entrance || [];
        for (let j = 0; j < doors.length; j++) {
            g = doors[j];
            ctx.fillRect(1 + g.x * 6, 1 + g.y * 6, 4, 4);
        }
        if (room.leftRight) {
            drawRoomRecursive(ctx, room.leftRight[0]);
            drawRoomRecursive(ctx, room.leftRight[1]);
        }
        if (room.upDown) {
            drawRoomRecursive(ctx, room.upDown[0]);
            drawRoomRecursive(ctx, room.upDown[1]);
        }
    }


    function drawDungeon(canvasElt: HTMLCanvasElement) {
        console.log('drawing the canvas');
        let ctx = canvasElt.getContext("2d");
        let canvas_width = (prop.dungeon.room.r + 1) * 6 + 2;
        let canvas_height = (prop.dungeon.room.b + 1) * 6 + 2;
        canvasElt.width = canvas_width;
        canvasElt.height = canvas_height;
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;
        ctx.lineCap = 'square';
        ctx.fillStyle = "rgb(245,247,245)";
        for (let i = 0; i <= prop.dungeon.room.r; i++) {
            for (let j = 0; j <= prop.dungeon.room.b; j++) {
                ctx.fillRect(1 + i * 6, 1 + j * 6, 4, 4);
            }
        }
        ctx.fillStyle = "rgb(0,0,0)";
        drawRoomRecursive(ctx, prop.dungeon);

    }

    return (<div className="canvas-cup"><canvas ref={(canvasElt) => drawDungeon(canvasElt)}>Hello</canvas></div>);

}

window.onload = function(event){
  ReactDOM.render(<App dungeon={result} />, document.getElementById('container-anchor'));
}