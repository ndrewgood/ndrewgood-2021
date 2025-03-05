import React from "react"

let Sketch

if (typeof window !== "undefined") {
  Sketch = require("react-p5")
}

const HelloSketch = ({ color }) => {
  // Variables - Canvas/Browser
  let width = 800
  if (typeof window !== "undefined") {
    if (window.innerWidth < 820) {
      width = window.innerWidth - 40
    } else {
      width = 800
    }
  }
  let height = 450

  // Variables - Letters
  let letters = []
  const word = "Hello!"

  // Variables - Time
  const counter = 150
  const movetime = counter / 2
  let countertime = 0

  // Ease Function
  // Referenced from https://github.com/sighack/easing-functions/blob/master/code/easing/easing.pde
  function ease(value, start1, stop1, start2, stop2) {
    let b = start2
    let c = stop2 - start2
    let t = value - start1
    let d = stop1 - start1
    let p = 0.5
    const PI = 3.1415

    t /= d / 2
    if (t < 1) return (c / 2) * t * t * t * t + b
    t -= 2
    return (-c / 2) * (t * t * t * t - 2) + b
  }

  // Letter Class
  //
  class Letter {
    // Class variables
    constructor(p5, x, y, letter, i, color) {
      this.p5 = p5 // p5 reference (bcus react...)
      this.x = x // initial x pos
      this.y = y // initial y pos
      this.nx = this.p5.random(
        this.p5.constrain((width / word.length) * i + width / 40, 0, width),
        this.p5.constrain(
          (width / word.length) * (i + 1) - width / 40,
          0,
          width
        )
      ) // new x pos
      this.ny = this.p5.random(40, height - 40) // new y pos
      this.cx = 0 // current x pos (for easing)
      this.cy = 0 // current y pos (for easing)
      this.tickx = 0 // linear velocity of x
      this.ticky = 0 // linear velocity of y
      this.easex = 0 // x pos after easing
      this.easy = 0 // y pos after easing
      this.letter = letter // letter content
      this.i = i // array pos
      this.mx = 0
      this.my = 0
      this.color = color
      this.bgColors = [
        {
          // bg-tan
          r: 234,
          g: 218,
          b: 208,
          r2: 246,
          g2: 37,
          b2: 6,
        },
        {
          // bg-green
          r: 180,
          g: 219,
          b: 199,
          r2: 0,
          g2: 124,
          b2: 225,
        },
        {
          // bg-blue
          r: 176,
          g: 193,
          b: 231,
          r2: 156,
          g2: 243,
          b2: 223,
        },
        {
          // bg-purple
          r: 207,
          g: 180,
          b: 221,
          r2: 255,
          g2: 24,
          b2: 255,
        },
        {
          // bg-yellow
          r: 221,
          g: 214,
          b: 164,
          r2: 239,
          g2: 121,
          b2: 51,
        },
      ]
    }

    // Change position
    shuffle() {
      // initial pos is new pos
      this.x = this.nx
      this.y = this.ny
      // current pos is new pos
      this.cx = this.nx
      this.cy = this.ny
      // find "random" new pos (split into overlapping columns)
      if (
        this.mx > this.easex - 20 &&
        this.mx < this.easex + 20 &&
        this.my > this.easey - 20 &&
        this.my < this.easey + 20
      ) {
        this.nx = this.x + 0.1
        this.ny = this.y + 0.1
      } else {
        this.nx = this.p5.random(
          this.p5.constrain(
            (width / word.length) * this.i + width / 40,
            0,
            width
          ),
          this.p5.constrain(
            (width / word.length) * (this.i + 1) - width / 40,
            0,
            width
          )
        )
        this.ny = this.p5.random(40, height - 40)
      }
      // find velocity between initial and new pos that fits in time counter
      this.tickx = (this.nx - this.x) / movetime
      this.ticky = (this.ny - this.y) / movetime
    }

    // Display Letter
    show(mx, my) {
      // console.log(this.color);

      // creates linear path between initial and new pos
      this.cx += this.tickx
      this.cy += this.ticky

      this.mx = mx
      this.my = my

      // first half of counter, moves letter to new position
      // second half of counter, letter keeps position
      if (countertime < movetime) {
        this.easex = ease(this.cx, this.x, this.nx, this.x, this.nx)
        this.easey = ease(this.cy, this.y, this.ny, this.y, this.ny)
      } else {
        this.easex = this.nx
        this.easey = this.ny
      }

      // draws letter
      this.p5.fill(
        this.bgColors[this.color].r,
        this.bgColors[this.color].g,
        this.bgColors[this.color].b
      )
      this.p5.ellipse(this.easex, this.easey, 40)

      this.p5.textSize(18)
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER)
      this.p5.textFont("Courier Prime")
      this.p5.textStyle(this.p5.ITALIC)
      if (
        this.mx > this.easex - 20 &&
        this.mx < this.easex + 20 &&
        this.my > this.easey - 20 &&
        this.my < this.easey + 20
      ) {
        this.p5.fill(
          this.bgColors[this.color].r2,
          this.bgColors[this.color].g2,
          this.bgColors[this.color].b2
        )
      } else {
        this.p5.fill(0, 0, 0)
      }
      this.p5.text(this.letter, this.easex, this.easey)
      // this.p5.ellipse(this.easex, this.easey, s);
    }
  }

  // P5.js - Setup
  //
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.noStroke()

    // For each letter in word, create new Letter class and shuffle their position
    for (let i = 0; i < word.length; i++) {
      letters.push(
        new Letter(
          p5,
          p5.random(width),
          p5.random(height),
          word.split("")[i],
          i,
          color
        )
      )
      letters[i].shuffle()
    }
  }

  // P5.js - Draw
  //
  const draw = p5 => {
    // makes transparent background
    p5.clear()
    // Resize handler
    windowResized(p5)

    // For every letter in word, draw a line between their positions
    for (let i = 0; i < word.length - 1; i++) {
      p5.stroke(0, 0, 0)
      p5.strokeWeight(1.5)

      // if letter is a space, dont add line before or after the letter
      if (word.split("")[i] === " " || word.split("")[i + 1] === " ") {
        console.log("no!")
      } else {
        p5.line(
          letters[i].easex,
          letters[i].easey,
          letters[i + 1].easex,
          letters[i + 1].easey
        )
      }
    }

    // For every letter in word, display them
    for (let i = 0; i < word.length; i++) {
      p5.noStroke()
      letters[i].show(p5.mouseX, p5.mouseY)
    }

    // Every time countertime hits the counter, reset it (manual clock)
    if (countertime == counter) {
      for (let i = 0; i < word.length; i++) {
        letters[i].shuffle()
      }
    }

    // Clock
    if (countertime < counter) {
      countertime++
    } else if (countertime == counter) {
      countertime = 0
    }
  }

  // Resize

  const windowResized = p5 => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 820) {
        width = window.innerWidth - 40
        p5.resizeCanvas(window.innerWidth - 40, 450)
      } else {
        width = 800
        p5.resizeCanvas(800, 450)
      }
    }
  }

  if (typeof window !== "undefined") {
    return <Sketch className="hero center-margin" setup={setup} draw={draw} />
  } else {
    return null
  }
}

export default HelloSketch
