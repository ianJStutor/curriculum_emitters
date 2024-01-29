# Emitters 04: Angles

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
4. 