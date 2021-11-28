import React from "react"
import Sketch from 'react-p5';

const HelloSketch = () => {

    //canvas
    let width = 800;
    let height = 400;

    //letter variables
    let letters = [];
    const word = "Hello!"

    //time
    const counter = 200;
    let countertime = 0;

    // EASE

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


    class Letter {
        constructor(p5, x, y, letter, i) {
            this.p5 = p5;
            this.x = x;
            this.y = y;
            this.nx = this.p5.random(this.p5.constrain(((width/word.length)*i) + width/40, 0, width), this.p5.constrain(((width/word.length)*(i+1)) - width/40, 0, width));
            this.ny = this.p5.random(40, height-40);
            this.cx = 0;
            this.cy = 0;
            this.tickx = 0;
            this.ticky = 0;
            this.easex = 0;
            this.easy = 0;
            this.letter = letter;
            this.i = i;
        }

        shuffle() {
            this.x = this.nx;
            this.y = this.ny;
            this.cx = this.nx;
            this.cy = this.ny;
            this.nx = this.p5.random(this.p5.constrain(((width/word.length)*this.i) + width/40, 0, width), this.p5.constrain(((width/word.length)*(this.i+1)) - width/40, 0, width));
            this.ny = this.p5.random(40, height-40);
            this.tickx = (this.nx - this.x) / (counter/2);
            this.ticky = (this.ny - this.y) / (counter/2);

        }

        show() {

            this.cx += this.tickx;
            this.cy += this.ticky;

            if(countertime < counter/2) {
                this.easex = ease(this.cx, this.x, this.nx, this.x, this.nx);
                this.easey = ease(this.cy, this.y, this.ny, this.y, this.ny);
            } else {
                this.easex = this.nx;
                this.easey = this.ny;
            }


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


    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(width, height).parent(canvasParentRef);

        p5.noStroke();
        for(let i = 0; i < word.length; i++) {
            letters.push(new Letter(p5, p5.random(width), p5.random(height), word.split('')[i], i));
            letters[i].shuffle();
        }
	};

	const draw = (p5) => {
        p5.clear();

        for(let i = 0; i < word.length - 1; i++) {
            // p5.stroke(0);
            p5.stroke(246,37,6);
            p5.strokeWeight(1.5);
            if(word.split('')[i] === ' ' || word.split('')[i+1] === ' ') {
                console.log("no!")
            } else {
                p5.line(letters[i].easex, letters[i].easey, letters[i+1].easex, letters[i+1].easey);
            }
        }

        console.log(word.split('')[2])

        for(let i = 0; i < word.length; i++) {
            p5.noStroke();
            letters[i].show();
        }

        if(countertime == counter) {
            for(let i = 0; i < word.length; i++) {
                letters[i].shuffle();
            }  
        }




        if(countertime < counter) {
            countertime++;
        } else if (countertime == counter) {
            countertime = 0;
        }


	};

    return <Sketch className="hero" setup={setup} draw={draw} />
}

export default HelloSketch