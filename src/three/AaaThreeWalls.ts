import { HALL_SIZE_X, HALL_HEIGHT } from './AaaThreeConstant';

const wallsInfo = [
    //outer
    {
        length: HALL_SIZE_X,
        xPosition: HALL_SIZE_X / 2,
        zPosition: 0,
        rotation: Math.PI / 2
    },
    {
        length: HALL_SIZE_X,
        xPosition: -HALL_SIZE_X / 2,
        zPosition: 0,
        rotation: Math.PI / 2
    },
    {
        length: HALL_SIZE_X,
        xPosition: 0,
        zPosition: HALL_SIZE_X / 2,
        rotation: 0
    },
    {
        length: HALL_SIZE_X,
        xPosition: 0,
        zPosition: -HALL_SIZE_X / 2,
        rotation: 0
    },
    // inner x shape
    {
        length: HALL_SIZE_X / 2 + 80,
        xPosition: 0,
        zPosition: -40,
        rotation: 0,
    },
    {
        length: HALL_SIZE_X / 2 + 40,
        xPosition: 0,
        zPosition: -30,
        rotation: Math.PI / 2,
    },
    // additional
    {
        length: HALL_SIZE_X / 2 - 50,
        xPosition: 120,
        zPosition: 80,
        rotation: 0,
    },
    {
        length: HALL_SIZE_X / 2 - 50,
        xPosition: -120,
        zPosition: 80,
        rotation: 0,
    },
]

export default wallsInfo