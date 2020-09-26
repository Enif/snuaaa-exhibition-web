import PhotoType from "../types/PhotoType";


const SET = 'photo/SET' as const;
const SELECT = 'cart/SELECT' as const;

export const set = (photos: PhotoType[]) => ({
    type: SET,
    photos: photos
});

export const select = (photoId: number) => ({
    type: SELECT,
    selected: photoId
});

type PhotoAction = ReturnType<typeof set> | ReturnType<typeof select>;

type PhotoState = {
    photos: PhotoType[],
    selected: number
}

const initialState: PhotoState = {
    photos: [],
    selected: 0
}

function photoReducer(state: PhotoState = initialState, action: PhotoAction) {
    switch (action.type) {
        case SET:
            console.log(action)
            return {
                ...state,
                photos: action.photos
            }
        case SELECT:
            return {
                ...state,
                selected: action.selected
            }
        default:
            return state;
    }
}

export default photoReducer;
