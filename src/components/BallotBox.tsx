import React, { useEffect, useState } from 'react';
import './guestBook.scss';
import './ballotBox.scss';
import './popup.scss';

import PhotoType from '../types/PhotoType';
import usePhoto from '../hooks/usePhoto';
import PhotoService from '../services/PhotoService';
import UserService from '../services/UserService';
const SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

type BallotBoxProps = {
    close: () => void;
}
function BallotBox({ close }: BallotBoxProps) {

    const { photos } = usePhoto();
    const [didVoted, setDidVoted] = useState(false);
    const [selectedBallot, setSelectedBallot] = useState(0);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = function () {
        UserService.checkUserDidVoted()
            .then((res) => {
                setDidVoted(res.data.didVoted)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const submit = function () {
        if (!selectedBallot) {
            alert("투표할 사진을 선택해주세요.")
        }
        PhotoService.vote({
            photo_id: selectedBallot
        })
            .then(() => {
                fetch();
            })
            .catch((err) => {
                console.error(err)
            })
    }


    const makeBallotList = function (photos: PhotoType[]) {
        return photos.map((photo) => {
            return (
                <div key={photo.photo_id}
                    className={`ballot-list-unit${selectedBallot === photo.photo_id ? " selected" : ""}`}
                    onClick={() => setSelectedBallot(photo.photo_id)}>
                    <img className="blur-img" src={`${SERVER_URL}/static/${photo.thumbnail_path}`} />
                </div>
            )
        })
    }

    const filterVotablePhoto = function(photos: PhotoType[]) {
        return photos.filter(photo => photo.can_be_voted);
    }

    return (
        <>
            <div className="popup-wrp">
                <div className="popup">
                    <button className="popup-btn-close" onClick={close}>
                        <i className="ri-close-line"></i>
                    </button>
                    <h3>MVP 투표</h3>
                    {
                        didVoted ?
                            <div className="ballot-list-result">투표에 참여해 주셔서 감사합니다♥</div>
                            :
                            <>
                                <div className="ballot-list-wrp">
                                    <div className="ballot-list">
                                        {makeBallotList(filterVotablePhoto(photos))}
                                    </div>
                                </div>
                                <button className="ballot-btn-submit" onClick={() => submit()}>제출</button>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default BallotBox;
