import { HALL_SIZE_UNIT, HALL_SIZE_X, HALL_HEIGHT } from './AaaThreeConstant';

const cos36 = Math.cos(36 * Math.PI / 180);
const sin36 = Math.sin(36 * Math.PI / 180);
const cos72 = Math.cos(72 * Math.PI / 180);
const sin72 = Math.sin(72 * Math.PI / 180);

const WALL_BUFFER = 7;

const wallsInfo = [

    // Right Side
    {
        length: HALL_SIZE_UNIT - 40,
        xPosition: HALL_SIZE_UNIT * cos36 * 0.57,
        zPosition: - HALL_SIZE_UNIT * (-sin36) * 0.57,
        rotation: -36 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: HALL_SIZE_UNIT * (cos36 - cos72 / 2),
        zPosition: - HALL_SIZE_UNIT * (sin72 / 2 - sin36),
        rotation: -72 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: HALL_SIZE_UNIT * (3 * cos36 - 2 * cos72) / 2,
        zPosition: - HALL_SIZE_UNIT * (2 * sin72 - sin36) / 2,
        rotation: 36 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: HALL_SIZE_UNIT * (4 * cos36 - 2 * cos72 - 1) / 2,
        zPosition: - HALL_SIZE_UNIT * (2 * sin72) / 2,
        rotation: 0
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: HALL_SIZE_UNIT * (2 * cos36 - cos72 - 1) / 2,
        zPosition: - HALL_SIZE_UNIT * (3 * sin72) / 2,
        rotation: -72 * Math.PI / 180
    },

    // Left Side
    {
        length: HALL_SIZE_UNIT - 40,
        xPosition: - HALL_SIZE_UNIT * cos36 * 0.57,
        zPosition: - HALL_SIZE_UNIT * (-sin36) * 0.57,
        rotation: 36 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: - HALL_SIZE_UNIT * (cos36 - cos72 / 2),
        zPosition: - HALL_SIZE_UNIT * (sin72 / 2 - sin36),
        rotation: 72 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: - HALL_SIZE_UNIT * (3 * cos36 - 2 * cos72) / 2,
        zPosition: - HALL_SIZE_UNIT * (2 * sin72 - sin36) / 2,
        rotation: - 36 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: - HALL_SIZE_UNIT * (4 * cos36 - 2 * cos72 - 1) / 2,
        zPosition: - HALL_SIZE_UNIT * (2 * sin72) / 2,
        rotation: 0
    },
    {
        length: HALL_SIZE_UNIT + WALL_BUFFER,
        xPosition: - HALL_SIZE_UNIT * (2 * cos36 - cos72 - 1) / 2,
        zPosition: - HALL_SIZE_UNIT * (3 * sin72) / 2,
        rotation: 72 * Math.PI / 180
    },

    // Inner, Top
    {
        length: HALL_SIZE_UNIT * 0.382,
        xPosition: 0,
        zPosition: - HALL_SIZE_UNIT * 1.3,
        rotation: 0
    },
    {
        length: HALL_SIZE_UNIT * 0.382,
        xPosition: HALL_SIZE_UNIT * 0.73,
        zPosition: - HALL_SIZE_UNIT * 0.76,
        rotation: - 72 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT * 0.382,
        xPosition: - HALL_SIZE_UNIT * 0.73,
        zPosition: - HALL_SIZE_UNIT * 0.76,
        rotation: 72 * Math.PI / 180
    },

    // Inner, Botton
    {
        length: HALL_SIZE_UNIT * 0.6,
        xPosition: HALL_SIZE_UNIT * 0.3,
        zPosition: - HALL_SIZE_UNIT * 0.14,
        rotation: 49 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT * 0.6,
        xPosition: -HALL_SIZE_UNIT * 0.3,
        zPosition: - HALL_SIZE_UNIT * 0.14,
        rotation: -49 * Math.PI / 180
    },

    // Inner, Additional
    {
        length: HALL_SIZE_UNIT * 0.5,
        xPosition: HALL_SIZE_UNIT * 0.23,
        zPosition: - HALL_SIZE_UNIT * 0.73,
        rotation: 72 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT * 0.5,
        xPosition: -HALL_SIZE_UNIT * 0.23,
        zPosition: - HALL_SIZE_UNIT * 0.73,
        rotation: -72 * Math.PI / 180
    },
    {
        length: HALL_SIZE_UNIT * 0.45,
        xPosition: 0,
        zPosition: - HALL_SIZE_UNIT * 0.25,
        rotation: 0
    }
]

export default wallsInfo