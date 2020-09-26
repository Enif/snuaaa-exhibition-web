import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import ceilingImg from '../assets/imgs/ceiling.png';
import AaaControls from './AaaThreeControl';
import PhotoType from '../types/PhotoType';

const SPEED = 1;
const SPEED_ROTATE = 0.005;
const HALL_HEIGHT = 80;
const HALL_SIZE_X = 400;
const HALL_SIZE_Y = 400;
const PHOTO_HEIGHT = 25;
const POINTLIGHT_INTENSITY = 0.2
const HEMISPHERELIGHT_INTENSITY = 0.3;

const SERVER_URL = process.env.REACT_APP_API_SERVER_URL;

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

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });


    const wallObjects: THREE.Mesh[] = [];
    const photoObjects: THREE.Object3D[] = [];

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    const aaaControl = new AaaControls(camera, wallObjects);
    aaaControl.yawObject.position.y = 20;

    const mouse = new THREE.Vector2();
    const stats = Stats();

    function init(targetElement: HTMLDivElement) {

        scene.background = new THREE.Color('#000e2c');
        // scene.fog = new THREE.Fog(0xffffff, 0, 750);

        const floor = makeFloor();
        const walls = makeWall();
        makeCeiling()
            .then((ceiling) => {
                scene.add(ceiling)
            })
        const lights = makeLights();

        // makePhoto(testImg, 0)
        //     .then((photoObject) => {
        //         photoObjects.push(photoObject);
        //         scene.add(photoObject);
        //     });

        scene.add(aaaControl.yawObject);
        // scene.add(camera);
        scene.add(...lights);
        scene.add(floor);
        scene.add(...walls);
        // scene.add(ceiling);

        wallObjects.push(...walls);


        //
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        targetElement.appendChild(renderer.domElement);
        //
        window.addEventListener('resize', onWindowResize, false);
        targetElement.addEventListener('mousemove', onMouseMove, false);
        targetElement.addEventListener('click', onMouseClick, false);

        targetElement.appendChild(stats.dom);

    }

    const makeFloor = function () {
        const floorGeometry = new THREE.PlaneBufferGeometry(2000, 2000);
        floorGeometry.rotateX(- Math.PI / 2);

        const floorMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#999999')
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.name = "floorMesh";

        return floor;
    }

    const makeCeiling = function () {
        return new Promise<THREE.Object3D>((resolve, reject) => {
            const loader = new THREE.ImageBitmapLoader();

            loader.loadAsync(ceilingImg)
                .then((imageBitmap) => {

                    // const frameX = imageBitmap.width / 100;
                    // const frameY = imageBitmap.height / 100;
                    let texture = new THREE.CanvasTexture(imageBitmap);
                    let ceilingGeometry = new THREE.SphereBufferGeometry(HALL_SIZE_X * 2, 32, 32, 0, 2 * Math.PI, 0, 0.5 * Math.PI);
                    // ceilingGeometry.rotateX(Math.PI / 2);

                    const ceilingMaterial = new THREE.MeshBasicMaterial({
                        map: texture,
                        side: THREE.DoubleSide
                        // vertexColors: true,
                        // color: 0xc3b292,
                    });
                    // ceilingMaterial.color.setRGB(1, 1, 1);
                    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
                    ceiling.position.set(0, 0, 0);
                    ceiling.name = "ceilingMesh";

                    resolve(ceiling)
                    // return ceiling;
                })
                .catch((err) => {
                    console.error(err)
                    reject(err);
                })
        })
    }

    const makeLights = function () {
        const lights: THREE.Light[] = [];

        const hemisphereLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, HEMISPHERELIGHT_INTENSITY);
        hemisphereLight.position.set(0, 10, 0);
        lights.push(hemisphereLight);

        // const rectLight = new THREE.RectAreaLight(0xffffff, 10, 15, 15);
        // rectLight.position.set(0, HALL_HEIGHT - 0.1, -80);
        // rectLight.rotation.set(- Math.PI / 2, 0, 0);
        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
        // lights.push(rectLight);

        const pointLights = makePointLights(HALL_SIZE_X, HALL_SIZE_Y, 100);
        // console.dir(pointLights);
        lights.push(...pointLights);


        return lights;
    }

    const makePointLights = function (spaceX: number, spaceY: number, distance: number) {


        // const mX = Math.ceil((spaceX / 2) / distance);
        // const mY = Math.ceil((spaceY / 2) / distance);

        const pointLights = [];
        // for (let i = -mX + 1; i < mX; i++) {
        //     for (let j = -mY + 1; j < mY; j++) {
        //         let pointLight = new THREE.PointLight(0xffffff, PointLightintensity, 500);
        //         pointLight.position.set(i * distance, HALL_HEIGHT, j * distance);
        //         pointLights.push(pointLight);

        //     }
        // }
        let pointLight = new THREE.PointLight(0xffffff, POINTLIGHT_INTENSITY, 500);
        pointLight.position.set(-spaceX / 6, HALL_HEIGHT / 2, -spaceY / 6);

        let pointLight2 = new THREE.PointLight(0xffffff, POINTLIGHT_INTENSITY, 500);
        pointLight2.position.set(-spaceX / 6, HALL_HEIGHT / 2, spaceY / 6);

        let pointLight3 = new THREE.PointLight(0xffffff, POINTLIGHT_INTENSITY, 500);
        pointLight3.position.set(spaceX / 6, HALL_HEIGHT / 2, -spaceY / 6);

        let pointLight4 = new THREE.PointLight(0xffffff, POINTLIGHT_INTENSITY, 500);
        pointLight4.position.set(spaceX / 6, HALL_HEIGHT / 2, spaceY / 6);

        return [pointLight, pointLight2, pointLight3, pointLight4];
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
        walls[0].name = "wall0"

        walls[1] = new THREE.Mesh(boxGeometry, boxMaterial);
        walls[1].position.set(-HALL_SIZE_X / 2, HALL_HEIGHT / 2, 0);
        walls[1].name = "wall1"

        walls[2] = new THREE.Mesh(boxGeometry, boxMaterial);
        walls[2].position.set(0, HALL_HEIGHT / 2, HALL_SIZE_X / 2);
        walls[2].rotation.set(0, Math.PI / 2, 0);
        walls[2].name = "wall2"

        walls[3] = new THREE.Mesh(boxGeometry, boxMaterial);
        walls[3].position.set(0, HALL_HEIGHT / 2, -HALL_SIZE_X / 2);
        walls[3].rotation.set(0, Math.PI / 2, 0);
        walls[3].name = "wall3"

        return walls
    }

    const makePhoto = function (photoInfo: PhotoType, onClick: (photo_id: number) => void) {

        const loader = new THREE.ImageBitmapLoader();

        // load a image resource
        loader.load(
            `${SERVER_URL}/static/${photoInfo.file_path}`,
            function (imageBitmap: ImageBitmap) {
                const photoObject = new THREE.Object3D();

                const frameX = imageBitmap.width / 100;
                const frameY = imageBitmap.height / 100;
                let texture = new THREE.CanvasTexture(imageBitmap as any);
                let material = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    map: texture
                });
                let geometry = new THREE.PlaneBufferGeometry(frameX, frameY);
                let photo = new THREE.Mesh(geometry, material);
                // let photo_id = photoInfo.photo_id
                photo.position.set(0, PHOTO_HEIGHT, 0.1);
                photo.rotation.x += Math.PI;
                photo.name = `photoMesh${photoInfo.photo_id}`
                photoObject.add(photo)
                photo.addEventListener("click", (e: THREE.Event) => {
                    onClick(photoInfo.photo_id)
                    console.log(`photoMesh${photoInfo.photo_id}`)
                })
                photo.addEventListener("mouseon", (e: THREE.Event) => {
                    lineMesh.visible = true;
                    document.body.style.cursor = "pointer"
                })
                photo.addEventListener("mouseout", (e: THREE.Event) => {
                    lineMesh.visible = false;
                    document.body.style.cursor = "grab"
                })

                const frameGeometry = makeFrameGeometry(frameX, frameY);
                const frameMesh = new THREE.Mesh(frameGeometry, new THREE.MeshPhongMaterial({
                    side: THREE.DoubleSide,
                    color: 0x333333
                }));
                frameMesh.name = "photoFrameMesh";
                frameMesh.position.set(0, PHOTO_HEIGHT, 0);
                photoObject.add(frameMesh);

                // PHOTO_POSITIONS[0].x, PHOTO_POSITIONS[0].y, PHOTO_POSITIONS[0].z
                const lineGeometry = makeFrameLineGeometry(frameX, frameY);
                const lineMaterial = new THREE.MeshBasicMaterial({
                    color: 0xaaeeff,
                    transparent: true
                });
                const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);
                lineMesh.position.set(0, PHOTO_HEIGHT, 0.5);
                lineMesh.visible = false;
                lineMesh.name = "photoLineMesh"
                photoObject.add(lineMesh);

                const spotLight = new THREE.SpotLight(0xffffff, 0.8, 130, Math.PI / 9, 1, 2);
                spotLight.position.set(0, HALL_HEIGHT - 5, +45);
                spotLight.target = photo;
                photoObject.add(spotLight);

                photoObject.position.set(photoInfo.xPos, 0, photoInfo.zPos);

                photoObjects.push(photoObject);
                scene.add(photoObject);

            },
            // onProgress callback currently not supported
            undefined,

            // onError callback
            function (err) {
                console.error(err);
            }
        );
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

    const makeFrameLineGeometry = function (frameX: number, frameY: number) {
        let frameOuterX = frameX / 2 + 1.5;
        let frameOuterY = frameY / 2 + 1.5;
        let frameinnerX = frameX / 2 + 1;
        let frameinnerY = frameY / 2 + 1;

        const frameShape = new THREE.Shape([
            new THREE.Vector2(-frameOuterX, frameOuterY),
            new THREE.Vector2(frameOuterX, frameOuterY),
            new THREE.Vector2(frameOuterX, -frameOuterY),
            new THREE.Vector2(-frameOuterX, -frameOuterY),
        ]);

        const frameHole = new THREE.Path([
            new THREE.Vector2(-frameinnerX, frameinnerY),
            new THREE.Vector2(frameinnerX, frameinnerY),
            new THREE.Vector2(frameinnerX, -frameinnerY),
            new THREE.Vector2(-frameinnerX, -frameinnerY),
        ])

        frameShape.holes = [frameHole]

        return new THREE.ShapeGeometry(frameShape);
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
            aaaControl.moveCamera(0, -SPEED);
        }
        if (Moving.getMoveRight()) {
            aaaControl.moveCamera(0, SPEED);
        }
        if (Moving.getMoveForward()) {
            aaaControl.moveCamera(SPEED, 0);
        }
        if (Moving.getMoveBackward()) {
            aaaControl.moveCamera(-SPEED, 0);
        }
        if (Moving.getRotation()) {

            let division = Moving.getRotation() > 0
                ? Math.floor(Moving.getRotation() * 9 / 10)
                : Math.ceil(Moving.getRotation() * 9 / 10);
            aaaControl.rotateCamera(0, (Moving.getRotation() - division) * SPEED_ROTATE, 0)
            Moving.setRotation(division)
        }

        stats.update();

        renderer.render(scene, camera);
    }


    function onMouseMove(event: MouseEvent) {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        const mouseRayCaster = new THREE.Raycaster();

        mouseRayCaster.setFromCamera(mouse, camera);

        let photos = photoObjects
            .map(photoObject => photoObject.children
                .filter(child => child.name.substring(0, 9) === 'photoMesh')[0])

        const intersects = mouseRayCaster.intersectObjects(
            photos
        );
        if (intersects && intersects[0]) {
            // let mesh = intersects[0].object as THREE.Mesh
            if (intersects[0].object.name.substring(0, 9) === 'photoMesh') {
                // THREE.find\
                intersects[0].object.dispatchEvent({
                    type: "mouseon"
                })
            }
        }
        else {
            photos.forEach((photo => {
                photo.dispatchEvent({
                    type: "mouseout"
                })
            }))
        }
    }


    function onMouseClick(event: MouseEvent) {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        const mouseRayCaster = new THREE.Raycaster();

        mouseRayCaster.setFromCamera(mouse, camera);

        let photos = photoObjects
            .map(photoObject => photoObject.children
                .filter(child => child.name.substring(0, 9) === 'photoMesh')[0])

        const intersects = mouseRayCaster.intersectObjects(
            photos
        );
        if (intersects && intersects[0]) {
            if (intersects[0].object.name.substring(0, 9) === 'photoMesh') {
                intersects[0].object.dispatchEvent({
                    type: "click"
                })
            }
        }
    }


    return {
        init: init,
        animate: animate,
        setMoveLeft: Moving.setMoveLeft,
        setMoveRight: Moving.setMoveRight,
        setMoveForward: Moving.setMoveForward,
        setMoveBackward: Moving.setMoveBackward,
        addRotation: Moving.addRotation,
        makePhoto: makePhoto
    }

})();

export default AaaThree;
