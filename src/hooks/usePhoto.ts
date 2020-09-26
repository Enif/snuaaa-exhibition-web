import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { set, select } from "../reducers/photoReducer";
import PhotoType from "../types/PhotoType";


function usePhoto() {

    const photos = useSelector((state: RootState) => state.photoReducer.photos)
    const selected = useSelector((state: RootState) => state.photoReducer.selected)
    const dispatch = useDispatch();

    const selectedPhoto = photos.filter((photo) => photo.photo_id === selected)[0]

    const setPhotos = (photos: PhotoType[]) => dispatch(set(photos));
    const selectPhoto = (photoId: number) => dispatch(select(photoId));

    return { photos, selectedPhoto, setPhotos, selectPhoto }
}

export default usePhoto;
