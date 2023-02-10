import Experience from "../Experience";
import * as THREE from "three";

import gsap from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    // this.gui = new GUI({ container: document.querySelector(".hero-main") });

    this.obj = {
      colorObj: {
        r: 0,
        g: 0,
        b: 0,
      },
      intensity: 3,
    };

    this.setSunLight();
    // this.setGUI();

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);
  }

  setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
    });

    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity;
      this.ambientLight.intensity = this.obj.intensity;
    });
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      gsap.to(this.sunLight.color, {
        r: 0.172,
        g: 0.231,
        b: 0.686,
      });
      gsap.to(this.ambientLight.color, {
        r: 0.172,
        g: 0.231,
        b: 0.686,
      });

      gsap.to(this.sunLight, {
        intensity: 0.78,
      });
      gsap.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      gsap.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      gsap.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      gsap.to(this.sunLight, {
        intensity: 1,
      });
      gsap.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }
  resize() {}
  update() {}
}
