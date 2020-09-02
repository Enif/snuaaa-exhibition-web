import React, { useRef, useCallback, useEffect } from 'react';
import './example.css';
import AaaThree from '../three/AaaThree';

function Example2() {

    const instructionsTarget = useRef<HTMLDivElement>(null);
    const blockerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(blockerTarget.current) {
            AaaThree.init(blockerTarget.current);
            AaaThree.animate();
            document.addEventListener('keydown', onKeyDown, false);
        }
    }, [])

    const onClickInstruction = () => {
        // if(AaaThree.controls.isLocked) {
        //     console.log('islocked')
        //     AaaThree.controls.unlock();
        // }
        // else {
        //     console.log('isUnlocked')

        //     AaaThree.controls.lock();
        // }
    }

    const onKeyDown = function (event: KeyboardEvent) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                AaaThree.moveCamera(1, 0);
                break;

            case 37: // left
            case 65: // a
                AaaThree.rotateCamera(0, -0.1, 0);
                break;

            case 40: // down
            case 83: // s
                AaaThree.moveCamera(-1, 0);
                break;

            case 39: // right
            case 68: // d
                AaaThree.rotateCamera(0, 0.1, 0);
                break;

            default: break;
        }

    };


    return (
        <div id="blocker" ref={blockerTarget}>
            {/* <div id="instructions" ref={instructionsTarget} onClick={onClickInstruction}>
                <span>Click to play</span>
                <br /><br />
                Move: WASD<br />
                Jump: SPACE<br />
                Look: MOUSE
                </div> */}
        </div>
    )
}

export default Example2;
