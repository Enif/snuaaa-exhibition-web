import React, { useRef, useCallback, useEffect, MouseEvent, TouchEvent, useState } from 'react';
import AaaThree from '../three/AaaThree';
import PhotoType from '../types/PhotoType';
import PhotoService from '../services/PhotoService';

function Hall() {

    const blockerTarget = useRef<HTMLDivElement>(null);
    let isMoving = false;
    let mouseX = 0;

    const [photos, setPhotos] = useState<PhotoType[]>([]);

    useEffect(() => {
        if (blockerTarget.current) {
            AaaThree.init(blockerTarget.current);
            AaaThree.animate();
            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false)

            PhotoService.retrievePhotos()
            .then((photos) => setPhotos(photos.data))
        }
    }, [])

    useEffect(() => {
        photos.forEach((photo) => {
            AaaThree.makePhoto(photo)
        })
    }, [photos])

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
            AaaThree.addRotation((mouseX - e.clientX))
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
        <div id="blocker"
            ref={blockerTarget}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseOut}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onTouchMove={onTouchMove}>
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
    )
}

export default Hall;
