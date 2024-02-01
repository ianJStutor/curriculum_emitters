# Emitters 05 (option B): Sparkles

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Warning

This effect produces a sparkling, shimmery particle effect that might be problematic for some people.

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
    const minLife = 25;
    const maxLife = 75;
    const innerColor = "gold";
    const outerColor = "white";
    ```
    * The <code>opacity</code> setting has been removed because opacity doesn't change during this animation
    * The min and max values for life have been reduced. Particles now exist for fewer animation frames before respawning
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

1. In <code>sparkles.js</code>, add another setting:
    ```js
    const sparkleChance = 0.6;
    ```
    This represents the chance of the particle being drawn. If the particle is drawn in some animation frames and not others then it creates a shimmery effect. Be aware that this might be upsetting for some people
2. A new line is added to the <code>draw</code> function:
    ```js
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
    ```
    If a random value isn't less than <code>sparkeChance</code>, then the loop continues without drawing that particle. This is the source of the sparkle

### 03 - Follow the leader

1. In <code>index.js</code>, there's a change to the <code>init</code> function:
    ```js
    function init() {
        canvas.addEventListener("pointermove", setEmitter);
        canvas.addEventListener("touchmove", e => {
            const { clientX: x, clientY: y } = e.touches?.[0]; 
            setEmitter({ x, y });
        });
        update(canvas);
        requestAnimationFrame(loop);
    }
    ```
    * The <code>pointermove</code> event listener replaces the <code>click</code> event listener. Now, the sparkles become a mouse trail
    * The <code>touchmove</code> event listener is a little more complex because an array of touches can be detected and each touch event has <code>clientX</code> and <code>clientY</code> properties instead of <code>x</code> and <code>y</code> properties
    * Review events, destructuring, and optional chaining, if necessary