import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.Side,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
  }

  setCircles() {
    this.geometry = new THREE.CircleGeometry(5, 64);

    this.material = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
    this.material2 = new THREE.MeshStandardMaterial({ color: 0x8395cd });
    this.material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

    this.circleFirst = new THREE.Mesh(this.geometry, this.material);
    this.circleSecond = new THREE.Mesh(this.geometry, this.material2);
    this.circleThird = new THREE.Mesh(this.geometry, this.material3);

    this.circleFirst.position.y = -0.29;
    this.circleSecond.position.y = -0.28;
    this.circleThird.position.y = -0.27;

    this.circleFirst.scale.set(0, 0, 0);
    this.circleSecond.scale.set(0, 0, 0);
    this.circleThird.scale.set(0, 0, 0);

    this.circleFirst.rotation.x =
      this.circleSecond.rotation.x =
      this.circleThird.rotation.x =
        -Math.PI / 2;

    this.circleFirst.receiveShadow =
      this.circleSecond.receiveShadow =
      this.circleThird.receiveShadow =
        true;
    this.scene.add(this.circleFirst);
    this.scene.add(this.circleSecond);
    this.scene.add(this.circleThird);
  }

  resize() {}
  update() {}
}
