import React from "react"
import Sketch from 'react-p5';

const HelloSketch = () => {

    // Variables - Canvas
    let width = 800;
    let height = 400;

    // Variables - Letters
    let letters = [];
    const word = "Hello!"

    // Variables - Time
    const counter = 200;
    let countertime = 0;

    // Ease Function
    // Referenced from https://github.com/sighack/easing-functions/blob/master/code/easing/easing.pde
    function ease(value, start1, stop1, start2, stop2) {
        let b = start2;
        let c = stop2 - start2;
        let t = value - start1;
        let d = stop1 - start1;
        let p = 0.5;
        const PI = 3.1415
      
        t /= d/2;
        if (t < 1) return c/2*t*t*t*t + b;
        t -= 2;
        return -c/2 * (t*t*t*t - 2) + b;
    }

    // Letter Class
    //
    class Letter {
        // Class variables
        constructor(p5, x, y, letter, i) {
            this.p5 = p5; // p5 reference (bcus react...)
            this.x = x; // initial x pos
            this.y = y; // initial y pos
            this.nx = this.p5.random(this.p5.constrain(((width/word.length)*i) + width/40, 0, width), this.p5.constrain(((width/word.length)*(i+1)) - width/40, 0, width)); // new x pos
            this.ny = this.p5.random(40, height-40); // new y pos
            this.cx = 0; // current x pos (for easing)
            this.cy = 0; // current y pos (for easing)
            this.tickx = 0; // linear velocity of x 
            this.ticky = 0; // linear velocity of y
            this.easex = 0; // x pos after easing
            this.easy = 0; // y pos after easing
            this.letter = letter; // letter content
            this.i = i; // array pos
        }

        // Change position
        shuffle() {
            // initial pos is new pos
            this.x = this.nx;
            this.y = this.ny;
            // current pos is new pos
            this.cx = this.nx;
            this.cy = this.ny;
            // find "random" new pos (split into overlapping columns)
            this.nx = this.p5.random(this.p5.constrain(((width/word.length)*this.i) + width/40, 0, width), this.p5.constrain(((width/word.length)*(this.i+1)) - width/40, 0, width));
            this.ny = this.p5.random(40, height-40);
            // find velocity between initial and new pos that fits in time counter
            this.tickx = (this.nx - this.x) / (counter/2);
            this.ticky = (this.ny - this.y) / (counter/2);

        }

        // Display Letter
        show() {
            // creates linear path between initial and new pos
            this.cx += this.tickx;
            this.cy += this.ticky;

            // first half of counter, moves letter to new position
            // second half of counter, letter keeps position
            if(countertime < counter/2) {
                this.easex = ease(this.cx, this.x, this.nx, this.x, this.nx);
                this.easey = ease(this.cy, this.y, this.ny, this.y, this.ny);
            } else {
                this.easex = this.nx;
                this.easey = this.ny;
            }

            // draws letter
            this.p5.fill(234,218,208);
            this.p5.ellipse(this.easex, this.easey, 40);
            // this.p5.fill(0,0,0);
            this.p5.fill(246,37,6);
            this.p5.textSize(18);
            this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
            this.p5.textFont("Courier Prime");
            this.p5.textStyle(this.p5.ITALIC);
            this.p5.text(this.letter, this.easex, this.easey);
            // this.p5.ellipse(this.easex, this.easey, s);
        }
    }

    // P5.js - Setup
    //
    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
        p5.noStroke();

        // For each letter in word, create new Letter class and shuffle their position
        for(let i = 0; i < word.length; i++) {
            letters.push(new Letter(p5, p5.random(width), p5.random(height), word.split('')[i], i));
            letters[i].shuffle();
        }
	};

    // P5.js - Draw
    //
	const draw = (p5) => {
        // makes transparent background
        p5.clear();

        // For every letter in word, draw a line between their positions
        for(let i = 0; i < word.length - 1; i++) {
            p5.stroke(246,37,6);
            p5.strokeWeight(1.5);

            // if letter is a space, dont add line before or after the letter
            if(word.split('')[i] === ' ' || word.split('')[i+1] === ' ') {
                console.log("no!");
            } else {
                p5.line(letters[i].easex, letters[i].easey, letters[i+1].easex, letters[i+1].easey);
            }
        }

        // For every letter in word, display them
        for(let i = 0; i < word.length; i++) {
            p5.noStroke();
            letters[i].show();
        }

        // Every time countertime hits the counter, reset it (manual clock)
        if(countertime == counter) {
            for(let i = 0; i < word.length; i++) {
                letters[i].shuffle();
            }  
        }

        // Clock
        if(countertime < counter) {
            countertime++;
        } else if (countertime == counter) {
            countertime = 0;
        }


	};

    return <Sketch className="hero" setup={setup} draw={draw} />
}

export default HelloSketch