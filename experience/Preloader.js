import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./utils/convertDivsToSpan";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".second-sub"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.loader.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.roomChildren.loader.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      }

      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.07,
          ease: "back.out(1.2)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "same"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
    });
  }
  async secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      this.secondTimeline
        .to(
          ".intro-text .animatedis",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          },
          "same"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "same"
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomChildren.loader.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "same"
        )
        .to(
          this.roomChildren.loader.scale,
          {
            x: 10,
            y: 10,
            z: 10,
          },
          "same"
        )
        .to(
          this.camera.orthoGraphicCamera.position,
          {
            y: 3.5,
          },
          "same"
        )
        .to(
          this.roomChildren.loader.position,
          {
            x: 2.20943,
            y: 14.9184,
            z: 2.86431,
          },
          "same"
        )
        .set(
          this.roomChildren.body.scale,
          {
            x: 1,
            y: 1,
            z: 1,
          },
          "reveal"
        )
        .to(
          this.roomChildren.loader.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          "reveal"
        )
        .to(
          ".hero-main-title .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "reveal"
        )
        .to(
          ".hero-main-description .animatedis",
          {
            yPercent: 0,
            stagger: 0.01,
            ease: "back.out(1.2)",
          },
          "reveal"
        )
        .to(
          ".first-sub .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "reveal"
        )
        .to(
          ".second-sub .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "reveal"
        )
        .to(this.roomChildren.aquarium.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.5)",
          duration: 0.5,
        })
        .to(this.roomChildren.clock.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.5)",
          duration: 0.5,
        })
        .to(this.roomChildren.shelves.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.5)",
          duration: 0.5,
        })
        .to(this.roomChildren.flooritems.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.5)",
          duration: 0.5,
        })
        .to(this.roomChildren.desks.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.5)",
          duration: 0.5,
        })
        .to(this.roomChildren.tablestuff.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.5)",
          duration: 0.5,
        })
        .to(this.roomChildren.computer.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.5)",
          duration: 0.5,
        })
        .set(this.roomChildren.mini_floor.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.5,
          },
          "chair"
        )
        .to(
          this.roomChildren.chair.rotation,
          {
            y: 4 * Math.PI + Math.PI / -2,
            ease: "power2.out",
            duration: 1,
          },
          "chair"
        )
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }
  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListener();

      this.playSecondIntro();
    }
  }
  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }
  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      this.removeEventListener();
      this.playSecondIntro();
    }
    this.initialY = null;
  }

  removeEventListener() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }
  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }
  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    this.roomChildren.rectLight.width = 0;
    this.roomChildren.rectLight.height = 0;
    if (this.device === "desktop") {
      this.room.scale.set(0.11, 0.11, 0.11);
    } else {
      this.room.scale.set(0.07, 0.07, 0.07);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }
    if (this.scaleFlag) {
      this.scale();
    }
  }
}
