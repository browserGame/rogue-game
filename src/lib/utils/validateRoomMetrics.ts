import { IVector } from '~math';

export function validateRoomMetrics(raw: string[][]): IVector {

        const roomMetric: IVector = { x: 0, y: 0 };
        raw.reduce((checkRoom, layer, layerIdx, arrLayers) => {
            const layerMetric: IVector = { x: 0, y: 0 };
            layer.reduce((checkLayer, line, y, arr) => {
                if (line.length === 0) {
                    throw new TypeError(`layer:${layerIdx} scanline ${y} has width 0, ${arr}`);
                }
                if (checkLayer.x === 0) checkLayer.x = line.length;
                if (checkLayer.x !== line.length) {
                    throw new TypeError(`layer:${layerIdx} envelope is not perfectly rectangular, ${arr}`);
                }
                if (y === arr.length - 1) {
                    checkLayer.y = arr.length;
                }

                return checkLayer;
            },           layerMetric);
            if (layerIdx === 0) {
                checkRoom.x = layerMetric.x;
                checkRoom.y = layerMetric.y;

                return checkRoom;
            }
            if (layerMetric.x !== checkRoom.x || layerMetric.y !== checkRoom.y) {
                throw new TypeError(`layer:${layerIdx} layout differs from Room, ${arrLayers[layerIdx]}`);
            }

            return checkRoom;
        },         roomMetric);

        return roomMetric;
    }

