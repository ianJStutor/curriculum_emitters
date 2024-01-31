# Emitters 07 (option B): Sparkles

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>sparkles.js</code> - particle module

## Lesson notes

### 01 - Put a ring on it
1. Rename <code>particle.js</code> to <code>sparkles.js</code>
2. In <code>index.js</code>, update the import source as <code>sparkles.js</code>
3. In <code>sparkles.js</code>, note the following settings:
    ```js
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
    ```
    * The <code>opacity</code> setting has been removed because opacity doesn't change during this animation
    * There's an <code>innerColor</code> and an <code>outerColor</code>
4. There are changes to the <code>getParticle</code> function:
    ```js
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
    ```
    * The <code>opacity</code> property has been removed because opacity doesn't change in this animation
    * The <code>r</code> variable is abstracted from the return object because it's used twice, including for the new <code>stroke</code> property
5. In the <code>update</code> function, delete the following line:
    ```js
    p.opacity *= acceleration;
    ```
    There will be no fading in or out for sparkles
6. The <code>draw</code> function has changed:
    ```js
    export function draw(ctx) {
        ctx.save();
        for (let { x, y, r, stroke, innerColor, outerColor } of particles) {
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
    ```
    * The <code>opacity</code> property has been removed because opacity doesn't change during this animation
    * The new properties <code>stroke</code>, <code>innerColor</code>, and <code>outerColor</code> are destructured from each particle
    * The line <code>ctx.globalAlpha = opacity;</code> has been removed because opacity doesn't change during this animation
    * Each circle now has a stroke, a ring around the circumference
7. Running the code at this time creates radiating particles, but they don't yet sparkle

### 02 - Like magic

1. ???

### 03 - Follow the leader

1. ???