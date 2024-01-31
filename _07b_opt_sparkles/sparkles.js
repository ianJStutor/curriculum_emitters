//dependencies
import { lerp, degToRad, polarToCartesian } from "./lib.js";

//settings
const numParticles = 250;
const minRadius = 1;
const maxRadius = 3;
const minSpeed = 2;
const maxSpeed = 5;
const acceleration = 0.98;
const minLife = 75;
const maxLife = 125;
const innerColor = "gold";
const outerColor = "white";
const sparkleChance = 0.6;

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
    const r = lerp(minRadius, maxRadius, Math.random());
    return {
        stroke: r/2,
        r, x, y, vx, vy, innerColor, outerColor,
        life: Math.round(lerp(minLife, maxLife, Math.random()))
    };
}

export function setEmitter({ x, y }) {
    emitter.x = x;
    emitter.y = y;
}

//loop functions
export function update(canvas) {
    //setup needed?
    if (!particles.length) return setupParticles(canvas);
    //update particles
    for (let i=0; i<particles.length; i++) {
        let p = particles[i];
        //move and accelerate, change opacity, life
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= acceleration;
        p.vy *= acceleration;
        p.life--;
        //needs respawning?
        if (p.life <= 0) particles[i] = getParticle(canvas);
    }
}

export function draw(ctx) {
    ctx.save();
    for (let { x, y, r, stroke, innerColor, outerColor } of particles) {
        if (Math.random() > sparkleChance) continue;
        ctx.fillStyle = innerColor;
        ctx.strokeStyle = outerColor;
        ctx.lineWidth = stroke;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
    }
    ctx.restore();
}