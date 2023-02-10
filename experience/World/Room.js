import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((element) => {
      element.castShadow = true;
      element.receiveShadow = true;

      if (element instanceof THREE.Group) {
        element.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (element.name === "aquarium") {
        console.log(element);
        element.children[0].material = new THREE.MeshPhysicalMaterial();
        element.children[0].material.roughness = 0;
        element.children[0].material.color.set(0x549dd2);
        element.children[0].material.ior = 3;
        element.children[0].material.transmission = 1;
        element.children[0].material.opacity = 1;
      }

      if (element.name === "computer") {
        console.log(element);
        element.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (element.name === "mini_floor") {
        element.position.x = 13.3402;
        element.position.z = -9.2863;
      }

      // if (
      //   element.name === "mailbox" ||
      //   element.name === "lamp" ||
      //   element.name === "floorFirst" ||
      //   element.name === "floorSecond" ||
      //   element.name === "floorThird" ||
      //   element.name === "floorFourth" ||
      //   element.name === "dirt" ||
      //   element.name === "flower1" ||
      //   element.name === "flower2"
      // ) {
      //   element.scale.set(0, 0, 0);
      // }

      element.scale.set(0, 0, 0);
      if (element.name === "loader") {
        // element.scale.set(1, 1, 1);
        element.position.set(0, 1.5, 0);
        element.rotation.y = Math.PI / 4;
      }

      this.roomChildren[element.name.toLowerCase()] = element;
    });

    // Lighting Lamp
    const width = 0.5;
    const height = 1.5;
    const intensity = 1;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(15.4849, 10.24633, -3.25057);
    rectLight.rotation.x = -Math.PI / 2;
    rectLight.rotation.z = Math.PI / 4;
    this.actualRoom.add(rectLight);

    this.roomChildren["rectLight"] = rectLight;

    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.09, 0.09, 0.09);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    console.log("Animation", this.room.animations);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        (((e.clientX - window.innerWidth) / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}
  update() {
    this.mixer.update(this.time.delta * 0.0015);

    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
