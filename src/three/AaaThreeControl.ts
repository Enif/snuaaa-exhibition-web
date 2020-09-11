import * as THREE from 'three';

class AaaControls {
    pitchObject: THREE.Object3D;
    yawObject: THREE.Object3D;
    wallObjects: THREE.Object3D[];
    raycaster: THREE.Raycaster;

    constructor(camera: THREE.Camera, objects: THREE.Object3D[]) {
        this.pitchObject = new THREE.Object3D();
        this.yawObject = new THREE.Object3D();
        this.pitchObject.add(camera);
        this.yawObject.add(this.pitchObject);
        this.raycaster = new THREE.Raycaster();
        this.wallObjects = objects
    }    
    
    moveCamera (forward: number, right: number) {

        const dx = forward * this.getCameraDirection().x - right * this.getCameraDirection().z;
        const dz = forward * this.getCameraDirection().z + right * this.getCameraDirection().x;

        const moveDirection = new THREE.Vector3(dx, 0, dz)
        this.raycaster.set(this.yawObject.position, moveDirection.normalize());
        const intersections = this.raycaster.intersectObjects(this.wallObjects)

        if (!intersections[0] || intersections[0].distance > 20) {
            this.yawObject.position.x += dx;
            this.yawObject.position.z += dz;
        }
    }

    rotateCamera (dx: number, dy: number, dz: number) {
        this.yawObject.rotation.y -= dy;
        this.pitchObject.rotation.x += dx;
    }

    getCameraDirection() {
        let direction = new THREE.Vector3(0, 0, -1);
        let roatation = new THREE.Euler(0, 0, 0, 'XYZ');
        roatation.set(this.pitchObject.rotation.x, this.yawObject.rotation.y, 0);
        direction.applyEuler(roatation);
        return direction;
    }
} 

export default AaaControls;
