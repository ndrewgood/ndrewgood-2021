import React from "react"
import Sketch from 'react-p5';


const HelloSketch = () => {

    //canvas
    let width = 800;
    let height = 400;

    //test circles
    const s = 70;
    const num = 4



    const setup = (p5, canvasParentRef) => {
		p5.createCanvas(width, height).parent(canvasParentRef);

        p5.noStroke();
        for(let i = 0; i < num; i++) {
            p5.fill(p5.random(255),p5.random(255),p5.random(255));
            p5.ellipse(p5.random(width), p5.random(height), s);
        }
	};

	const draw = (p5) => {
        // p5.clear();


	};

    return <Sketch setup={setup} draw={draw} />
}

export default HelloSketch