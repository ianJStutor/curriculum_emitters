//dependencies
import { update as particlesUpdate, draw as particlesDraw, setEmitter as particlesSetEmitter } from "./particles.js";
import { update as smokeUpdate, draw as smokeDraw, setEmitter as smokeSetEmitter } from "./smoke.js";
import { update as sparklesUpdate, draw as sparklesDraw, setEmitter as sparklesSetEmitter } from "./sparkles.js";

//environment
const width = 300;
const height = 300;
const canvases = [...document.querySelectorAll("canvas")];
const contexts = [];
canvases.forEach(c => {
    c.width = width;
    c.height = height;
    contexts.push(c.getContext("2d"));
});

//loop
function loop(t) {
    //erase
    contexts.forEach(ctx => ctx.clearRect(0, 0, width, height));
    //particles
    particlesUpdate(canvases[0]);
    particlesDraw(contexts[0]);
    smokeUpdate(canvases[1]);
    smokeDraw(contexts[1]);
    sparklesUpdate(canvases[2]);
    sparklesDraw(contexts[2]);
    //repeat
    requestAnimationFrame(loop);
}

//init
function init() {
    particlesSetEmitter({ x: 150, y: 150 });
    smokeSetEmitter({ x: 150, y: 150 });
    sparklesSetEmitter({ x: 150, y: 150 });
    requestAnimationFrame(loop);
}

init();