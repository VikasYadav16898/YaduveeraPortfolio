import * as THREE from "three";
import Sizes from "./utils/Sizes";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./utils/Time";
import World from "./World/World";
import Resources from "./utils/Resources";
import assets from "./utils/assets";
import Theme from "./Theme";
import Preloader from "./Preloader";

import Controls from "./World/Controls";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    this.canvas = canvas;
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.time = new Time();
    this.resources = new Resources(assets);

    // Theme
    this.theme = new Theme();

    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    });

    this.time.on("update", () => {
      this.update();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });
  }
  update() {
    this.preloader.update();
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.world.resize();
  }
}
