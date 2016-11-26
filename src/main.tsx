import { Room, Cell, profilerFactory, multinomial_random_sample, formatDungeon,createDoors } from "./map-tools";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

let profiler = profilerFactory('gaussian', { sigma: 16 });

let result: Room = formatDungeon(50, 50, 5, profiler);

let selection = createDoors(result);

console.log(result);
console.log(selection);

function App(prop: { dungeon: Room }) {

    function drawRoomRecursive(ctx: CanvasRenderingContext2D, room: Room): void {
         //console.log(room.room.r,room.room.b);
         for (let i= room.room.l; i <= room.room.r; i++ ){
             ctx.fillRect(1+i*6, room.room.t*6+1,4,4);
             ctx.fillRect(1+i*6, room.room.b*6+1,4,4);
         }
         for (let i= room.room.t+1; i < room.room.b; i++){
             ctx.fillRect(1+room.room.l*6,1+i*6,4,4);
             ctx.fillRect(1+room.room.r*6,1+i*6,4,4);
         }
         if (room.leftRight){
             drawRoomRecursive(ctx,room.leftRight[0]);
             drawRoomRecursive(ctx,room.leftRight[1]);
         }
         if (room.upDown){
             drawRoomRecursive(ctx,room.upDown[0]);
             drawRoomRecursive(ctx,room.upDown[1]);
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
        ctx.fillStyle = "rgb(245,247,249)";
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

ReactDOM.render(<App dungeon={result} />, document.getElementById('container-anchor'));