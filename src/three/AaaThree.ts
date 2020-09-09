import * as THREE from 'three';
import { BufferAttribute } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import testImg from '../assets/imgs/test.jpg';

const SPEED = 1;
const SPEED_ROTATE = 0.005;
const HALL_HEIGHT = 80;
const HALL_SIZE_X = 200;
const HALL_SIZE_Y = 200;

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

        scene.background = new THREE.Color('#000e2c');
        // scene.fog = new THREE.Fog(0xffffff, 0, 750);

        const floor = makeFloor();
        const walls = makeWall();
        const ceiling = makeCeiling();
        const lights = makeLights();

        makePhotoFrame()
            .then((photoFrames) => {
                scene.add(...photoFrames);
            });

        scene.add(yawObject);
        scene.add(...lights);
        scene.add(floor);
        scene.add(...walls);
        scene.add(ceiling);

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

            color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.15 + 0.75);
            // colors.push(color.r, color.g, color.b);
            colors.push(1, 1, 1);
        }

        floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const floorMaterial = new THREE.MeshPhysicalMaterial({
            vertexColors: true
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);

        return floor;
    }

    const makeCeiling = function () {
        let ceilingGeometry = new THREE.PlaneGeometry(HALL_SIZE_X, HALL_SIZE_Y);
        ceilingGeometry.rotateX(Math.PI / 2);

        const ceilingMaterial = new THREE.MeshPhysicalMaterial({
            vertexColors: true,
            color: 0xc3b292,
        });
        // ceilingMaterial.color.setRGB(1, 1, 1);
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.position.setX(0);
        ceiling.position.setY(HALL_HEIGHT);
        ceiling.position.setZ(0);

        return ceiling;
    }

    const makeLights = function () {
        const lights: THREE.Light[] = [];

        const hemisphereLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.3);
        hemisphereLight.position.set(0, 1, 0);
        lights.push(hemisphereLight);

        const rectLight = new THREE.RectAreaLight(0xffffff, 10, 15, 15);
        rectLight.position.set(0, HALL_HEIGHT - 0.1, -80);
        rectLight.rotation.set(- Math.PI / 2, 0, 0);
        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
        // lights.push(rectLight);

        const pointLights = makePointLights(200, 200, 50);
        console.dir(pointLights);
        lights.push(...pointLights);


        return lights;
    }

    const makePointLights = function (spaceX: number, spaceY: number, distance: number) {

        const PointLightintensity = 0.1

        const mX = Math.ceil((spaceX / 2) / distance);
        const mY = Math.ceil((spaceY / 2) / distance);

        const pointLights = [];
        for (let i = -mX + 1; i < mX; i++) {
            for (let j = -mY + 1; j < mY; j++) {
                let pointLight = new THREE.PointLight(0xffffff, PointLightintensity, 500);
                pointLight.position.set(i * distance, HALL_HEIGHT, j * distance);
                pointLights.push(pointLight);

            }
        }
        return pointLights;
    }

    const makeWall = function () {
        const boxGeometry = new THREE.BoxBufferGeometry(10, HALL_HEIGHT, HALL_SIZE_X);
        const boxMaterial = new THREE.MeshPhysicalMaterial({
            flatShading: true,
            dithering: true,
            color: new THREE.Color('#ffffff')
        });

        const walls = [];

        walls[0] = new THREE.Mesh(boxGeometry, boxMaterial);
        walls[0].position.set(HALL_SIZE_X / 2, HALL_HEIGHT / 2, 0);

        walls[1] = new THREE.Mesh(boxGeometry, boxMaterial);
        walls[1].position.set(-HALL_SIZE_X / 2, HALL_HEIGHT / 2, 0);

        walls[2] = new THREE.Mesh(boxGeometry, boxMaterial);
        walls[2].position.set(0, HALL_HEIGHT / 2, HALL_SIZE_X / 2);
        walls[2].rotation.set(0, Math.PI / 2, 0);

        walls[3] = new THREE.Mesh(boxGeometry, boxMaterial);
        walls[3].position.set(0, HALL_HEIGHT / 2, -HALL_SIZE_X / 2);
        walls[3].rotation.set(0, Math.PI / 2, 0);

        return walls
    }

    const makePhotoFrame = function () {
        return new Promise<(THREE.Mesh | THREE.Light)[]>((resolve, reject) => {

            const loader = new THREE.ImageBitmapLoader();

            // load a image resource
            loader.load(
                // resource URL
                testImg,

                // onLoad callback
                function (imageBitmap: ImageBitmap) {
                    const frameX = imageBitmap.width / 100;
                    const frameY = imageBitmap.height / 100;
                    let texture = new THREE.CanvasTexture(imageBitmap as any);
                    let material = new THREE.MeshBasicMaterial({ map: texture });
                    let geometry = new THREE.PlaneBufferGeometry(frameX, frameY);
                    let photo = new THREE.Mesh(geometry, material);
                    photo.position.set(0, 25, -94.9);
                    photo.rotation.z += Math.PI;

                    const frameGeometry = makeFrameGeometry(frameX, frameY);
                    const frameMesh = new THREE.Mesh(frameGeometry, new THREE.MeshPhongMaterial({
                        side: THREE.DoubleSide,
                        color: 0x333333
                    }));
                    frameMesh.position.set(0, 25, -95)

                    const spotLight = new THREE.SpotLight(0xffffff, 0.8, 130, Math.PI / 9, 1, 2);
                    spotLight.position.set(0, HALL_HEIGHT - 5, -50);
                    spotLight.target = photo;

                    resolve([photo, frameMesh, spotLight]);

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

    const makeFrameGeometry = function (frameX: number, frameY: number) {

        let frameOuterX = frameX / 2 + 1;
        let frameOuterY = frameY / 2 + 1
        let frameinnerX = frameX / 2;
        let frameinnerY = frameY / 2;
        const frameShape = new THREE.Shape([
            new THREE.Vector2(-frameOuterX, frameOuterY),
            new THREE.Vector2(frameOuterX, frameOuterY),
            new THREE.Vector2(frameOuterX, -frameOuterY),
            new THREE.Vector2(-frameOuterX, -frameOuterY)
        ]);

        const frameHole = new THREE.Path([
            new THREE.Vector2(-frameinnerX, frameinnerY),
            new THREE.Vector2(frameinnerX, frameinnerY),
            new THREE.Vector2(frameinnerX, -frameinnerY),
            new THREE.Vector2(-frameinnerX, -frameinnerY)
        ])

        frameShape.holes = [frameHole]

        const extrudeSettings = {
            amount: 0.5,
            bevelEnabled: false,
            bevelSegments: 1,
            steps: 1,
            bevelSize: 1,
            bevelThickness: 1
        };

        return new THREE.ExtrudeBufferGeometry(frameShape, extrudeSettings);
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
