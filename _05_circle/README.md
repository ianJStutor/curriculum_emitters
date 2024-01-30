# Emitters 05: Circle

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>particles.js</code> - particle module

## Lesson notes

### 01 - Radians

1. Point out code that uses <code>Math.PI * 2</code> to draw circles on the canvas. Introduce _radians_ as an alternate unit of measuring angles and that <code>Math.PI * 2</code> radians is the equivalent of 360 degrees
2. If students can think geometrically, explain radians as a literal translation of the formula for a circle's circumference, $c=2πr$. Imagine taking a bit of wire exactly the length of a circle's radius, and bending it slightly so it fits anywhere along that circle's circumference. How many of those wires would you need end-to-end to completely surround the circle? You'd need two pi of them (approx. 6.2831853)
3. In <code>lib.js</code>, add these conversion functions:
    ```js
    export function degToRad(d) {
        return d * (Math.PI / 180);
    }

    export function radToDeg(r) {
        return r * (180 / Math.PI);
    }
    ```
    The <code>degToRad</code> function will be used in this project so that there's some experience with it, but point out that we know the radian equivalent of 360 degrees (<code>Math.PI * 2</code>) and writing that out is slightly more efficient than using the conversion function

### 02 - Polar vs. Cartesian

1. Briefly explain polar coordinates in terms of angle and radius (velocity)--or, if students are up for it, in the vector terms heading (or direction) and magnitude. What this project needs is a way to assign a random angle and a random speed to a particle then determine what its axis velocities (<code>vx</code> and <code>vy</code>) will be. This subject can be as shallow or in-depth as the students are capable of handling
2. In <code>lib.js</code>, add these conversion functions:
    ```js
    export function polarToCartesian({ a, v }) {
        return {
            x: v * Math.cos(a),
            y: v * Math.sin(a)
        };
    }

    export function cartesianToPolar({ x, y }) {
        return {
            a: Math.atan2(y, x),
            v: Math.hypot(x, y)
        };
    }
    ```
    The students do not need to comprehend all the trig involved to understand that there are formulae for these conversions. Most importantly, students need to understand that an object <code>{a, v}</code> represents _angle_ and _velocity_ while an object <code>{x, y}</code> represents axis positions and each can be easily converted to the other

### 03 - Controlling angle and speed

1. In <code>particles.js</code>, add to the dependencies:
    ```js
    //dependencies
    import { lerp, degToRad, polarToCartesian } from "./lib.js";
    ```
    The <code>radToDeg</code> and <code>cartesianToPolar</code> functions aren't used in this project
2. The settings have changed slightly:
    ```js
    //settings
    const numParticles = 250;
    const minRadius = 2;
    const maxRadius = 5;
    const minSpeed = 1;
    const maxSpeed = 1;
    const acceleration = 1;
    const opacity = 1;
    ```
    For now, the <code>minSpeed</code> and <code>maxSpeed</code> have the same value, better to demonstrate the effect
3. The <code>getParticle</code> function has also changed:
    ```js
    function getParticle({ width, height }) {
        const angle = lerp(0, degToRad(360), Math.random());
        const speed = lerp(minSpeed, maxSpeed, Math.random());
        const { x: vx, y: vy } = polarToCartesian({ a: angle, v: speed });
        return {
            x: width/2,
            y: height/2,
            r: lerp(minRadius, maxRadius, Math.random()),
            vx, vy, opacity
        };
    }
    ```
    * A random <code>angle</code> is selected between zero and 360 degrees. Point out that zero does not need to be converted to radians because zero is zero in every unit
    * For now, <code>speed</code> will always be <code>1</code> because <code>minSpeed</code> and <code>maxSpeed</code> have the same value
    * The <code>ploarToCartesian</code> function needs an object <code>{a, v}</code> representing _angle_ and _velocity_. This object is created on the fly as an argument. Also, the function returns an object <code>{x, y}</code> representing axis positions, and this object is destructured and renamed. Review syntax, if needed
4. Running the app at this point produces almost the same effect as the previous step except now the particles radiate in a circle rather than a square, and none is moving faster than <code>maxSpeed</code> (like diagonal particles from the previous step) or slower than the intended <code>minSpeed</code> (like the zero-velocity particles from the previous step)