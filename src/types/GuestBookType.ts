import ExhibitionAuthType from "./ExhibitionAuthType";

interface GuestBookType {
    guestbook_id: number;
    author_id: number;
    text: string;
    created_at: string;
    updated_at: string;
    author: ExhibitionAuthType
}

export default GuestBookType;
