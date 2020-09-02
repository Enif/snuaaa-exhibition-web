import React from 'react';
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

function Hall() {

    const renderer = new Three.WebGL1Renderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, -200, 100);
    camera.lookAt(0, 100, 0);

    // const points = [
    //     new Vector3(- 10, 0, 0),
    //     new Vector3(0, 10, 0),
    //     new Vector3(10, 0, 0)
    // ];

    const scene = new Three.Scene();
    const groundGeometry = new Three.PlaneBufferGeometry(300, 300);
    const material = new Three.MeshPhongMaterial({ color: 0xeeeeee });
    const ground = new Three.Mesh(groundGeometry, material);

    const wallMaterial = new Three.MeshPhongMaterial({ color: 0x887766 });
    const wallGeometry = new Three.BoxBufferGeometry(50, 10, 100);
    const wall = new Three.Mesh(wallGeometry, wallMaterial);

    const light = new Three.HemisphereLight(0x909090, 0xeeeeee);

    const controls = new PointerLockControls(camera, renderer.domElement);

    controls.unlock();
    let moveForward = false;
    let moveLeft = false;
    let moveBackward = false;
    let moveRight = false;
    let canJump = false;

    let prevTime = performance.now();
    let velocity = new Three.Vector3();
    let direction = new Three.Vector3();
    let vertex = new Three.Vector3();
    let color = new Three.Color();

    wall.position.set(0, 10, 50)
    scene.add(ground);
    scene.add(light);
    scene.add(wall)
    scene.add(controls.getObject())
    renderer.render(scene, camera);

    const onKeyDown = function (event: KeyboardEvent) {
        console.log(event.keyCode)
        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            // case 32: // space
            //     if ( canJump === true ) velocity.y += 350;
            //     canJump = false;
            //     break;

        }

    };

    const onKeyUp = function (event: KeyboardEvent) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    let raycaster = new Three.Raycaster(new Three.Vector3(), new Three.Vector3(0, - 1, 0), 0, 10);


    function animate() {

        requestAnimationFrame(animate);
        // controls.
        if (controls.isLocked === true) {

            raycaster.ray.origin.copy(controls.getObject().position);
            raycaster.ray.origin.y -= 10;

            // var intersections = raycaster.intersectObjects(objects);

            // var onObject = intersections.length > 0;

            var time = performance.now();
            var delta = (time - prevTime) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            direction.z = Number(moveForward) - Number(moveBackward);
            direction.x = Number(moveRight) - Number(moveLeft);
            direction.normalize(); // this ensures consistent movements in all directions

            if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
            if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

            // if (onObject === true) {

            //     velocity.y = Math.max(0, velocity.y);
            //     canJump = true;

            // }

            controls.moveRight(- velocity.x * delta);
            controls.moveForward(- velocity.z * delta);

            controls.getObject().position.y += (velocity.y * delta); // new behavior

            if (controls.getObject().position.y < 10) {

                velocity.y = 0;
                controls.getObject().position.y = 10;

                canJump = true;

            }
            prevTime = time;

        }
        render();

    }

    function render() {
        renderer.render(scene, camera);
    }

    animate()
    
    return (
        <div className="hall">
        </div>
    );
}

export default Hall;
