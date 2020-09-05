import * as THREE from 'three';
import { BufferAttribute } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import testImg from '../assets/imgs/test.jpg';

const SPEED = 1;
const SPEED_ROTATE = 0.005;


const Moving = (function () {

    let moveLeft = false;
    let moveRight = false;
    let moveForward = false;
    let moveBackward = false;
    let rotation = 0;

    const setMoveLeft = function (isMove: boolean) {
        moveLeft = isMove;
    }
    const setMoveRight = function (isMove: boolean) {
        moveRight = isMove;
    }
    const setMoveForward = function (isMove: boolean) {
        moveForward = isMove;
    }
    const setMoveBackward = function (isMove: boolean) {
        moveBackward = isMove;
    }
    const setRotation = function (value: number) {
        rotation = value;
    }
    const addRotation = function (value: number) {
        rotation += value;
    }
    const getMoveLeft = function () {
        return moveLeft;
    }
    const getMoveRight = function () {
        return moveRight;
    }
    const getMoveForward = function () {
        return moveForward;
    }
    const getMoveBackward = function () {
        return moveBackward;
    }
    const getRotation = function () {
        return rotation;
    }

    return {
        setMoveLeft: setMoveLeft,
        setMoveRight: setMoveRight,
        setMoveForward: setMoveForward,
        setMoveBackward: setMoveBackward,
        setRotation: setRotation,
        addRotation: addRotation,
        getMoveLeft: getMoveLeft,
        getMoveRight: getMoveRight,
        getMoveForward: getMoveForward,
        getMoveBackward: getMoveBackward,
        getRotation: getRotation
    }
})()


const AaaThree = (function () {

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const pitchObject = new THREE.Object3D();
    pitchObject.add(camera);
    const yawObject = new THREE.Object3D();
    yawObject.add(pitchObject);
    yawObject.position.y = 1;

    const objects: THREE.Mesh[] = [];
    const raycaster = new THREE.Raycaster();
    const stats = Stats();

    let vertex = new THREE.Vector3();
    let color = new THREE.Color();


    function init(targetElement: HTMLDivElement) {

        camera.position.y = 20;

        scene.background = new THREE.Color(0xffffff);
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        light.position.set(0.5, 1, 0.75);

        const floor = makeFloor();
        const walls = makeWall();
        makePhotoFrame()
            .then((photoFrames) => {
                scene.add(...photoFrames);
            });

        scene.add(yawObject);
        scene.add(light);
        scene.add(floor);
        scene.add(...walls);
        // scene.add(photoFrames);
        objects.push(...walls);
        //
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        targetElement.appendChild(renderer.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);

        targetElement.appendChild(stats.dom);

    }

    const makeFloor = function () {
        let floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000, 100, 100);
        floorGeometry.rotateX(- Math.PI / 2);

        // vertex displacement

        let position = floorGeometry.attributes.position;

        for (let i = 0, l = position.count; i < l; i++) {

            vertex.fromBufferAttribute(position as BufferAttribute, i);

            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

            position.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }

        // floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

        position = floorGeometry.attributes.position;
        let colors = [];

        for (let i = 0, l = position.count; i < l; i++) {

            color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            colors.push(color.r, color.g, color.b);
        }

        floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);

        return floor;
    }

    const makeWall = function () {
        let boxGeometry = new THREE.BoxBufferGeometry(10, 40, 200);
        // boxGeometry = boxGeometry.toNonIndexed(); // ensure each face has unique vertices

        let position = boxGeometry.attributes.position;
        let colors = [];

        for (let i = 0, l = position.count; i < l; i++) {

            color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            colors.push(color.r, color.g, color.b);

        }

        boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        let boxMaterial = new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
        boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        let box1 = new THREE.Mesh(boxGeometry, boxMaterial);
        box1.position.x = 100;
        box1.position.y = 20;
        box1.position.z = 0;

        let box2 = new THREE.Mesh(boxGeometry, boxMaterial);
        box2.position.x = -100;
        box2.position.y = 20;
        box2.position.z = 0;

        let box3 = new THREE.Mesh(boxGeometry, boxMaterial);
        box3.position.x = 0;
        box3.position.y = 20;
        box3.position.z = 120;
        box3.rotation.y += Math.PI / 2;

        let box4 = new THREE.Mesh(boxGeometry, boxMaterial);
        box4.position.x = 0;
        box4.position.y = 20;
        box4.position.z = -120;
        box4.rotation.y += Math.PI / 2;

        return [box1, box2, box3, box4]
    }

    const makePhotoFrame = function () {
        return new Promise<THREE.Mesh[]>((resolve, reject) => {

            const loader = new THREE.ImageBitmapLoader();

            // load a image resource
            loader.load(
                // resource URL
                testImg,

                // onLoad callback
                function (imageBitmap: ImageBitmap) {
                    let texture = new THREE.CanvasTexture(imageBitmap as any);
                    let material = new THREE.MeshBasicMaterial({ map: texture });
                    let geometry = new THREE.PlaneBufferGeometry(imageBitmap.width / 100, imageBitmap.height / 100);
                    let photo = new THREE.Mesh(geometry, material);
                    photo.position.x = 0;
                    photo.position.y = 25;
                    photo.position.z = -114;
                    photo.rotation.z += Math.PI;

                    let frameGeometry = new THREE.RingGeometry(12, 14, 4);
                    let frameMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color('#4e2203') })
                    let frame = new THREE.Mesh(frameGeometry, frameMaterial);
                    frame.position.x = 0;
                    frame.position.y = 25;
                    frame.position.z = -114;
                    frame.rotation.z += Math.PI / 4;

                    // scene.add(photo);

                    resolve([frame, photo]);

                },
                // onProgress callback currently not supported
                undefined,

                // onError callback
                function (err) {
                    console.error(err);
                    reject(err);
                }
            );
        })
    }


    const moveCamera = function (forward: number, right: number) {

        const dx = forward * getCameraDirection().x - right * getCameraDirection().z;
        const dz = forward * getCameraDirection().z + right * getCameraDirection().x;

        const moveDirection = new THREE.Vector3(dx, 0, dz)
        raycaster.set(yawObject.position, moveDirection.normalize());
        const intersections = raycaster.intersectObjects(objects)

        if (!intersections[0] || intersections[0].distance > 20) {
            yawObject.position.x += dx;
            yawObject.position.z += dz;
        }
    }

    const rotateCamera = function (dx: number, dy: number, dz: number) {
        yawObject.rotation.y -= dy;
        pitchObject.rotation.x += dx;
    }

    const getCameraDirection = function () {
        let direction = new THREE.Vector3(0, 0, -1);
        let roatation = new THREE.Euler(0, 0, 0, 'XYZ');
        roatation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);
        direction.applyEuler(roatation);
        return direction;
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        requestAnimationFrame(animate);
        // console.log('animate')
        if (Moving.getMoveLeft()) {
            moveCamera(0, -SPEED);
        }
        if (Moving.getMoveRight()) {
            moveCamera(0, SPEED);
        }
        if (Moving.getMoveForward()) {
            moveCamera(SPEED, 0);
        }
        if (Moving.getMoveBackward()) {
            moveCamera(-SPEED, 0);
        }
        if (Moving.getRotation()) {

            let division = Moving.getRotation() > 0
                ? Math.floor(Moving.getRotation() * 9 / 10)
                : Math.ceil(Moving.getRotation() * 9 / 10);
            rotateCamera(0, (Moving.getRotation() - division) * SPEED_ROTATE, 0)
            Moving.setRotation(division)
        }
        stats.update();

        renderer.render(scene, camera);
    }

    return {
        init: init,
        animate: animate,
        setMoveLeft: Moving.setMoveLeft,
        setMoveRight: Moving.setMoveRight,
        setMoveForward: Moving.setMoveForward,
        setMoveBackward: Moving.setMoveBackward,
        addRotation: Moving.addRotation,
    }

})();

export default AaaThree;
