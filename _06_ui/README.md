# Emitters 06: UI

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
2. 