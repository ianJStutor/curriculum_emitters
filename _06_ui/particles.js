//dependencies
import { lerp, degToRad, polarToCartesian } from "./lib.js";

//settings
const numParticles = 250;
const minRadius = 2;
const maxRadius = 5;
const minSpeed = 2;
const maxSpeed = 5;
const acceleration = 1;
const opacity = 1;

//state
const particles = [];
const emitter = { x: undefined, y: undefined };

//setup
function setupParticles(canvas) {
    const { width, height } = canvas;
    emitter.x = width/2;
    emitter.y = height/2;
    for (let i=0; i<numParticles; i++) {
        particles[i] = getParticle(canvas);
    }
}

function getParticle({ width, height }) {
    const angle = lerp(0, degToRad(360), Math.random());
    const speed = lerp(minSpeed, maxSpeed, Math.random());
    const { x: vx, y: vy } = polarToCartesian({ a: angle, v: speed });
    const { x, y } = emitter;
    return {
        r: lerp(minRadius, maxRadius, Math.random()),
        x, y, vx, vy, opacity
    };
}

function setEmitter({ x, y }) {
    emitter.x = x;
    emitter.y = y;
}

//loop functions
export function update(canvas) {
    //setup needed?
    if (!particles.length) return setupParticles(canvas);
    //update particles
    const { width, height } = canvas;
    for (let i=0; i<particles.length; i++) {
        let p = particles[i];
        //move and accelerate, change opacity
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= acceleration;
        p.vy *= acceleration;
        p.opacity = Math.min(1, p.opacity * acceleration);
        //off screen?
        if (
            p.x + p.r < 0 ||
            p.x - p.r > width ||
            p.y + p.r < 0 ||
            p.y - p.r > height
        ) particles[i] = getParticle(canvas);
    }
}

export function draw(ctx) {
    ctx.save();
    for (let { x, y, r, opacity } of particles) {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
    ctx.restore();
}