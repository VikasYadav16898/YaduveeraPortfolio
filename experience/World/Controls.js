import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";

import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });

    this.circleFirst = this.experience.world.floor.circleFirst;
    this.circleSecond = this.experience.world.floor.circleSecond;
    this.circleThird = this.experience.world.floor.circleThird;

    // Scroll Trigger
    GSAP.registerPlugin(ScrollTrigger);

    document.querySelector(".page").style.overflow = "visible";

    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      ease: 0.3,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }
  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        // RESETS
        this.room.scale.set(0.09, 0.09, 0.09);
        this.rectLight.width = 0.5;
        this.rectLight.height = 1.5;

        // ! FIRST SECCTION
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0017;
          },
        });

        // ! SECOND SECCTION
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              x: () => {
                return 1;
              },
              z: () => {
                return this.sizes.height * 0.0032;
              },
            },
            "same"
          )
          .to(
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            "same"
          )
          .to(
            this.rectLight,
            {
              width: 0.5 * 4,
              height: 1.5 * 4,
            },
            "same"
          );

        // ! THIRD SECCTION
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.camera.orthoGraphicCamera.position,
            {
              y: -2.0,
              x: -4.1,
            },
            "same1"
          )
          .to(
            this.room.scale,
            {
              x: 0.3,
              y: 0.3,
              z: 0.3,
            },
            "same1"
          )
          .to(
            this.rectLight,
            {
              width: 0.5 * 3,
              height: 1.5 * 3,
            },
            "same1"
          );
      },
      // Mobiles
      "(max-width: 968px)": () => {
        // Resets
        this.room.scale.set(0.05, 0.05, 0.05);
        this.room.position.set(0, 0, 0);
        this.rectLight.width = 0.3;
        this.rectLight.height = 0.4;
        // ! FIRST SECCTION
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.room.scale, {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        });
        // ! SECOND SECCTION
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.scale,
            {
              x: 0.25,
              y: 0.25,
              z: 0.25,
            },
            "same"
          )
          .to(
            this.rectLight,
            {
              width: 0.3 * 3.4,
              height: 0.4 * 3.4,
            },
            "same"
          )
          .to(
            this.room.position,
            {
              x: 1.5,
            },
            "same"
          );
        // ! THIRD SECCTION
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .to(
            this.room.position,
            {
              z: -6.5,
            },
            "same"
          )
          .to(
            this.room.scale,
            {
              x: 0.18,
              y: 0.18,
              z: 0.18,
            },
            "same"
          );
      },

      // all
      all: () => {
        this.sections = document.querySelectorAll(".section");
        this.sections.forEach((section) => {
          this.progressWrapper = section.querySelector(".progress-wrapper");
          this.progressBar = section.querySelector(".progress-bar");

          if (section.classList.contains("right")) {
            GSAP.to(section, {
              borderTopLeftRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                // markers: true,
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomLeftRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                // markers: true,
                scrub: 0.6,
              },
            });
          } else {
            GSAP.to(section, {
              borderTopRightRadius: 10,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                // markers: true,
                scrub: 0.6,
              },
            });
            GSAP.to(section, {
              borderBottomRightRadius: 700,
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                // markers: true,
                scrub: 0.6,
              },
            });
          }

          GSAP.from(this.progressBar, {
            scaleY: 0,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              pin: this.progressWrapper,
              pinSpacing: false,
            },
          });
        });

        // Circle Animations
        // ! FIRST SECCTION
        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.circleFirst.scale, {
          x: 3,
          y: 3,
          z: 3,
        });

        // ! SECOND SECCTION
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.circleSecond.scale, {
          x: 3,
          y: 3,
          z: 3,
        });

        // ! THIRD SECCTION
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            // markers: true,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        }).to(this.circleThird.scale, {
          x: 3,
          y: 3,
          z: 3,
        });

        // Mini Floor Actions
        this.secondPartTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            // markers: true,
            start: "top top",
          },
        });

        this.room.children.forEach((child) => {
          if (child.name === "mini_floor") {
            this.first = GSAP.to(child.position, {
              x: 2.12843,
              z: 1.92552,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "mailbox") {
            this.second = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "lamp") {
            this.third = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "floorFirst") {
            this.fourth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "floorSecond") {
            this.fifth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "floorThird") {
            this.sixth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "floorFourth") {
            this.seventh = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "dirt") {
            this.eighth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "flower1") {
            this.nineth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
          if (child.name === "flower2") {
            this.tenth = GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              ease: "back.out(2)",
              duration: 0.3,
            });
          }
        });
        this.secondPartTimeline.add(this.first);
        this.secondPartTimeline.add(this.second);
        this.secondPartTimeline.add(this.third);
        this.secondPartTimeline.add(this.fourth);
        this.secondPartTimeline.add(this.fifth);
        this.secondPartTimeline.add(this.sixth);
        this.secondPartTimeline.add(this.seventh);
        this.secondPartTimeline.add(this.eighth);
        this.secondPartTimeline.add(this.nineth);
        this.secondPartTimeline.add(this.tenth);
      },
    });
  }

  resize() {}
  update() {}
}
