import Experience from "./Experience";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthoGraphicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 24;
    this.perspectiveCamera.position.y = 7.5;
    this.perspectiveCamera.position.z = 4;
  }

  createOrthoGraphicCamera() {
    this.frustum = 5;
    this.orthoGraphicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustum) / 2,
      (this.sizes.aspect * this.sizes.frustum) / 2,
      this.sizes.frustum / 2,
      -this.sizes.frustum / 2,
      -10,
      50
    );
    // this.orthoGraphicCamera.position.y = 3.5;
    this.orthoGraphicCamera.position.y = 2.4;
    this.orthoGraphicCamera.position.z = 4;
    this.scene.add(this.orthoGraphicCamera);
    this.orthoGraphicCamera.rotation.x = -Math.PI / 6;

    // this.helper = new THREE.CameraHelper(this.orthoGraphicCamera);
    // this.scene.add(this.helper);

    const size = 10;
    const divisions = 10;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    // Updating both cameras on resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthoGraphicCamera.left =
      (-this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthoGraphicCamera.right =
      (this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthoGraphicCamera.top = this.sizes.frustum / 2;
    this.orthoGraphicCamera.bottom = -this.sizes.frustum / 2;
    this.orthoGraphicCamera.updateProjectionMatrix();
  }

  update() {
    // console.log(this.perspectiveCamera.position);
    this.controls.update();
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthoGraphicCamera.position);
    // this.helper.rotation.copy(this.orthoGraphicCamera.rotation);
  }
}
