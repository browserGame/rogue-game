import { sizeCanvas, renderRooms, renderRoom, Room, Cell, profilerFactory, multinomial_random_sample, formatDungeon, Door } from "./map-tools";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

let profiler = profilerFactory('gaussian', { sigma: 16 });

let result: Room = formatDungeon(25, 25, 5, profiler);


console.log(result);
//console.log(selection);

function App(prop: { dungeon: Room }) {

   /* function drawRoomRecursive(ctx: CanvasRenderingContext2D, room: Room): void {
        //console.log(room.room.r,room.room.b);
        ctx.fillStyle = 'rgb(80,80,80)';
        if (!room.leftRight && !room.upDown) {
            for (let i = room.room.l + 1; i <= room.room.r - 1; i++) {
                for (let j = room.room.t + 1; j <= room.room.b - 1; j++) {
                    ctx.fillRect(1 + i * 6, 1 + j * 6, 4, 4);
                }
            }
        }

        let g: Door;
        let doors = room.entrance || [];

        for (let j = 0; j < doors.length; j++) {
            g = doors[j];
            if (g.hasDoor) {
                ctx.fillStyle = "rgb(250,40,250)";
            }
            else {
                ctx.fillStyle = "rgb(40,250,250)";
            }
            ctx.fillRect(1 + g.x * 6, 1 + g.y * 6, 4, 4);
        }
        ctx.fillStyle = 'rgb(190,80,80)'
        if (room.leftRight) {
            drawRoomRecursive(ctx, room.leftRight[0]);
            drawRoomRecursive(ctx, room.leftRight[1]);
        }
        if (room.upDown) {
            drawRoomRecursive(ctx, room.upDown[0]);
            drawRoomRecursive(ctx, room.upDown[1]);
        }
    }*/


    function drawDungeon(canvasElt: HTMLCanvasElement) {

        console.log('drawing the canvas', canvasElt.width, canvasElt.height);
        let ctx = canvasElt.getContext("2d");
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvasElt.width, canvasElt.height);
        renderRooms(ctx, prop.dungeon, 48);
        /*
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
        */
    }

    let { width, height } = sizeCanvas(prop.dungeon.room, 48);

    return (<div className="canvas-cup"><canvas width={width} height={height} ref={(canvasElt) => drawDungeon(canvasElt)}>Hello</canvas></div>);

}

window.onload = function (event) {
    ReactDOM.render(<App dungeon={result} />, document.getElementById('container-anchor'));
}