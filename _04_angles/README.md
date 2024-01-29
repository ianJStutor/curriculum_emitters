# Emitters 04: Angles

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>particles.js</code> - particle module

## Lesson notes

### 01 - Corner cutting

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
3. Running the code at this time shows a bunch of particles starting in the center of the canvas then moving away in all directions. Point out that all the particles clearly fill an expanding square, which is cool but not very realistic. What shape would be somewhat more realistic? A circle