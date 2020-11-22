import React, { useRef, useEffect, MouseEvent, TouchEvent, useState } from 'react';
import AaaThree from '../three/AaaThree';
import PhotoService from '../services/PhotoService';
import PhotoDetail from './PhotoDetail';
import usePhoto from '../hooks/usePhoto';
import './hall.scss';
import GuestBook from './GuestBook';
import BallotBox from './BallotBox';
import ToolTop from './ToolTip';

function Hall() {

    const blockerTarget = useRef<HTMLDivElement>(null);
    let isMoving = false;
    let mouseX = 0;

    const { photos, selectedPhoto, setPhotos, selectPhoto } = usePhoto();
    const [isGuestBookPop, setIsGuestBookPop] = useState(false);
    const [isBallotBoxPop, setIsBallotBoxPop] = useState(false);
    const [isToolTipPop, setIsToolTipPop] = useState(true);

    useEffect(() => {
        if (blockerTarget.current) {
            AaaThree.init(blockerTarget.current);
            AaaThree.animate();
            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false)

            PhotoService.retrieveAll()
                .then((photos) => setPhotos(photos.data))
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [])

    useEffect(() => {
        photos.forEach((photo) => {
            AaaThree.makePhoto(photo, onPhotoClick)
        })
    }, [photos])

    useEffect(() => {
        if (isGuestBookPop || isBallotBoxPop || isToolTipPop || selectedPhoto) {
            AaaThree.setBlockMove(true);
        }
        else {
            AaaThree.setBlockMove(false);
        }
    }, [isGuestBookPop, isBallotBoxPop, isToolTipPop, selectedPhoto])

    const onPhotoClick = function (photo_id: number) {
        selectPhoto(photo_id);
    }

    const onKeyDown = function (event: KeyboardEvent) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                AaaThree.setMoveForward(true);
                break;

            case 37: // left
            case 65: // a
                AaaThree.setMoveLeft(true)
                break;

            case 40: // down
            case 83: // s
                AaaThree.setMoveBackward(true)
                break;

            case 39: // right
            case 68: // d
                AaaThree.setMoveRight(true)
                break;

            default: break;
        }
    };

    const onKeyUp = function (event: KeyboardEvent) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                AaaThree.setMoveForward(false);
                break;

            case 37: // left
            case 65: // a
                AaaThree.setMoveLeft(false)
                break;

            case 40: // down
            case 83: // s
                AaaThree.setMoveBackward(false)
                break;

            case 39: // right
            case 68: // d
                AaaThree.setMoveRight(false)
                break;

            default: break;
        }
    };


    const onMouseDown = function (e: MouseEvent) {
        mouseX = e.clientX;
        isMoving = true;
    }

    const onMouseUp = function (e: MouseEvent) {
        mouseX = e.clientX;
        isMoving = false;
    }

    const onMouseMove = function (e: MouseEvent) {
        if (isMoving) {
            AaaThree.addRotation((-0.2 * e.movementX))
        }

        mouseX = e.clientX;
    }

    const onMouseOut = function () {
        isMoving = false;
    }

    const onTouchStart = function (e: TouchEvent) {
        mouseX = e.touches[0].clientX;
        isMoving = true;
    }

    const onTouchEnd = function (e: TouchEvent) {
        isMoving = false;
    }

    const onTouchMove = function (e: TouchEvent) {
        if (e.touches[0]) {
            if (isMoving) {
                AaaThree.addRotation(mouseX - e.touches[0].clientX)
            }
            mouseX = e.touches[0].clientX;
        }
    }


    return (
        <>
            <div id="blocker"
                ref={blockerTarget}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseOut={onMouseOut}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTouchMove={onTouchMove}
                onContextMenu={(e) => { e.preventDefault() }}
            >
                <div className="hall-btn-wrp">
                    <button className="btn-general" onClick={() => setIsToolTipPop(true)}>
                        <i className="ri-question-mark"></i>
                    </button>
                    <button className="btn-general" onClick={() => setIsGuestBookPop(true)}>
                        <i className="ri-draft-line"></i>
                    </button>
                    <button className="btn-general" onClick={() => setIsBallotBoxPop(true)}>
                        <i className="ri-medal-line"></i>
                    </button>
                </div>

                <div className="controls-wrapper">
                    <button
                        className="controls-btn"
                        onTouchStart={() => AaaThree.setMoveLeft(true)}
                        onTouchEnd={() => AaaThree.setMoveLeft(false)}>
                        <i className="ri-arrow-left-s-line"></i>
                    </button>
                    <div className="controls-vertical">
                        <button
                            className="controls-btn"
                            onTouchStart={() => AaaThree.setMoveForward(true)}
                            onTouchEnd={() => AaaThree.setMoveForward(false)}>
                            <i className="ri-arrow-up-s-line"></i>
                        </button>
                        <button
                            className="controls-btn"
                            onTouchStart={() => AaaThree.setMoveBackward(true)}
                            onTouchEnd={() => AaaThree.setMoveBackward(false)}>
                            <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                    <button
                        className="controls-btn"
                        onTouchStart={() => AaaThree.setMoveRight(true)}
                        onTouchEnd={() => AaaThree.setMoveRight(false)}>
                        <i className="ri-arrow-right-s-line"></i>
                    </button>
                </div>
            </div>
            {
                selectedPhoto &&
                <PhotoDetail close={() => selectPhoto(-1)} />
            }
            {
                isGuestBookPop
                &&
                <GuestBook close={() => setIsGuestBookPop(false)} />
            }
            {
                isBallotBoxPop
                &&
                <BallotBox close={() => setIsBallotBoxPop(false)} />
            }
            {
                isToolTipPop
                &&
                <ToolTop close={() => setIsToolTipPop(false)} />
            }
        </>
    )
}

export default Hall;
