
interface PhotoType {
    photo_id: number,
    photograper: string,
    title: string,
    location: string,
    date: string,
    equipment: string,
    exposure: string,
    processing: string,
    story: string,
    xPos: number,
    yPos: number,
    zPos: number,
    rotation: number,
    thumbnail_path: string,
    file_path: string,
    can_be_voted: boolean,
    is_video: boolean
}

export default PhotoType;
