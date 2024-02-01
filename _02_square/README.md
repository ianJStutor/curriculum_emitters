# Emitters 02: Circles in a square

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>particles.js</code> - particle module

## Lesson notes

### 01 - Weird physics

1. The <code>warpdrive.js</code> file has been renamed to just <code>particles.js</code> to remove expectations
2. In <code>particles.js</code>, some of the settings have changed:
    ```js
    //settings
    const numParticles = 250;
    const minRadius = 2;
    const maxRadius = 5;
    const minSpeed = -1;
    const maxSpeed = 1;
    const acceleration = 1;
    const opacity = 1;
    ```
    There are many more particles and both <code>acceleration</code> and <code>opacity</code> are set to <code>1</code>. Particles will now always be fully white and never accelerate. This system is no longer intended to represent a warp drive
3. Running the code at this time shows a bunch of particles starting in the center of the canvas then moving away in all directions. When particles move off the canvas they are respawned at the center, which has become a source--or emitter--for the particles
4. Refresh the page several times in succession. Point out that all the particles clearly fill an expanding square, which is cool but not very realistic. What shape would be somewhat more realistic? A circle
5. Point out a particle moving very slowly or even not at all. A particle that stays close to the center throughout the animation is perhaps moving too slowly for a particle system; it'll just hang out without adding much to the illusion. This is because the speed range is <code>-1</code> to <code>1</code>, and <code>0</code> is a valid option in that range. A particle that is staying near the emitter managed to get a value close to zero for both its axis velocities, <code>vx</code> and <code>vy</code>. How could we prevent that? Have a minimum speed that doesn't depend on axis velocities
6. If students can think geometrically, point out that particles shooting out diagonally, toward any of the four corners of the square, are actually travelling faster than the maximum speed because the hypotenuse is longer than the edge of a right triangle, but the distance is covered in the same amount of time (velocity equals distance divided by time). Again, having a speed that doesn't depend on axis velocities will help