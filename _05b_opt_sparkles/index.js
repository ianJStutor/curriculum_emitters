//dependencies
import { fullscreenCanvas } from "./fullscreenCanvas.js";
import { update, draw, setEmitter } from "./sparkles.js";

//environment
const canvas = document.querySelector("canvas");
const ctx = fullscreenCanvas(canvas, window);

//loop
function loop(t) {
    //erase
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    //particles
    update(canvas);
    draw(ctx);
    //repeat
    requestAnimationFrame(loop);
}

//init
function init() {
    canvas.addEventListener("pointermove", setEmitter);
    canvas.addEventListener("touchmove", e => {
        const { screenX: x, screenY: y } = e.touches?.[0]; 
        setEmitter({ x, y });
    });
    update(canvas);
    requestAnimationFrame(loop);
}

init();