# Emitters 06: Life source

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>particles.js</code> - particle module

## Lesson notes

### 01 - Define the source

1. The previous step defined the middle of the canvas as the source of all particles. Some rewriting is needed to be able to move that source anywhere
2. In <code>particles.js</code>, add <code>emitter</code> to the "state" section:
    ```js
    const emitter = { x: undefined, y: undefined };
    ```
3. The <code>setupParticles</code> function has some additions:
    ```js
    //setup
    function setupParticles(canvas) {
        const { width, height } = canvas;
        emitter.x = width/2;
        emitter.y = height/2;
        for (let i=0; i<numParticles; i++) {
            particles[i] = getParticle(canvas);
        }
    }
    ```
    The emitter position is defined with the particle setup. By default, the emitter is in the center of the canvas, but it can move (we'll get to it)
4. The <code>getParticle</code> function has changed:
    ```js
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
    ```
    By looking up the emitter position instead of assuming it's the center of the canvas, the emitter position can move and all future particles will spawn there
5. Running the code at this time produces no obvious difference from the previous step. Next, it's time to change the emitter position

### 02 - Adding a click listener

1. Click events are fired with a mouse press and release or with a tap. A click event will define the new emitter source location
2. In <code>particle.js</code>, increase the speed range:
    ```js
    const minSpeed = 2;
    const maxSpeed = 5;
    ```
    Depending on screen size, this should produce a more continuous flow of particles
3. In the "setup" section, add a new function:
    ```js
    export function setEmitter({ x, y }) {
        emitter.x = x;
        emitter.y = y;
    }
    ```
    * The "setup" section should probably be split into "setup" and "getters and setters" (or something like that) for better long-term maintenance. If students can handle the cognitive load, feel free
    * Point out that this is an exported function, which means another module will handle the click event listening
4. In <code>index.js</code>, add <code>setEmitter</code> to the imports:
    ```js
    import { update, draw, setEmitter } from "./particles.js";
    ```
5. Add to the <code>init</code> function:
    ```js
    //init
    function init() {
        canvas.addEventListener("click", setEmitter);
        update(canvas);
        requestAnimationFrame(loop);
    }
    ```
    * Note that there isn't a <code>removeEventListener()</code> call, which means this <code>init</code> function must only be called once. For this project, that's okay, but for future, larger projects, there might need to be a one-time-only setup as well as reset functionality so that duplicate event listeners aren't stacked on top of one another
    * The click event object has <code>x</code> and <code>y</code> properties that can be sent directly to the <code>setEmitter</code> function. Note that this only works with a full-screen canvas; other properties, like <code>offsetX</code> and <code>offsetY</code> might be needed for canvases that aren't full-screen
    * Touches will trigger a click event, but note that many mobile devices might interpret touch events as an interaction with the device rather than an interaction with the web site. Often, <code>e.preventDefault()</code> works to prevent this, as does the CSS property <code>touch-events: none;</code>. But use these with caution as they might affect usability and load-time efficiency. If the latter is important, consider adding the <code>{ passive: true }</code> option as the third argument to <code>addEventListener</code>
6. Running the code at this time allows for a click to change the position of the source, the emitter. Particles emit from the location of the most recent click event (or the default canvas center)

### 03 - Burst of life

1. On very large canvases, it might take quite a lot of time for the particle to respawn. For many particle systems, a life counter might be a better option
2. In <code>particles.js</code>, add to the settings:
    ```js
    const acceleration = 0.98;
    const minLife = 75;
    const maxLife = 125;
    const color = "white";
    ```
    * We're bringing <code>acceleration</code> back, but this time it's less than one (barely). This means that speed and opacity will become a smaller and smaller number each animation frame, but never actually reaching zero
    * In this context, "life" refers to the number of animation frames before the particle needs to respawn, regardless of position
    * <code>color</color> is now defined in the settings, not in the <code>draw</code> function, which is better engineering
3. In the <code>getParticle</code> function, add to the returned particle object:
    ```js
    return {
        r: lerp(minRadius, maxRadius, Math.random()),
        x, y, vx, vy, opacity, color,
        life: Math.round(lerp(minLife, maxLife, Math.random()))
    };
    ```
    * <code>color</code> has been added to each particle
    * Point out that <code>Math.round</code> is used to keep <code>life</code> an integer
4. In the <code>update</code> function, the width and height destructuring from the <code>canvas</code> has been removed since those values are never used
5. Also, there are changes in the <code>for</code> loop:
    ```js
    for (let i=0; i<particles.length; i++) {
        let p = particles[i];
        //move and accelerate, change opacity, life
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= acceleration;
        p.vy *= acceleration;
        p.opacity *= acceleration;
        p.life--;
        //needs respawning?
        if (p.life <= 0) particles[i] = getParticle(canvas);
    }
    ```
    * <code>opacity</code> has been simplified. Since <code>acceleration</code> is less than one, <code>opacity</code> will get smaller, so there's no need to make sure it doesn't go above <code>1</code>
    * All the out-of-bounds detection has been removed
    * <code>life</code> decreases each animation frame. When its value falls to zero (or below, somehow...using such precautions, however implausible, is a good idea based on many past mistakes) then the particle is respawned
6. In the <code>draw</code> function, the <code>for...of</code> loop has changed slightly:
    ```js
    for (let { x, y, r, opacity, color } of particles) {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
    ```
    Point out that the <code>color</code> property is destructured and then applied to the context's <code>fillStyle</code>. Hardcoded values should be in settings only
7. Running the code at this time produces a burst of particles from wherever the emitter is. The particles slow down and fade out as they radiate from the emitter source point. Respawn is based on time--specifically animation frames--rather than position on or off the canvas