# Emitters 07 (option A): Smoke

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Files

* <code>index.html</code> - Entry file for every web app
* <code>index.js</code> - JavaScript module for setting up an app
* <code>fullscreenCanvas.js</code> - JavaScript module for managing a full-screen canvas that self adjusts with browser window resizing
* <code>lib.js</code> - helper functions in one library
* <code>smoke.js</code> - particle module

## Lesson notes

### 01 - What's cooking?

1. Rename <code>particle.js</code> to <code>smoke.js</code>
2. In <code>index.js</code>, update the import source as <code>smoke.js</code>
3. In <code>smoke.js</code>, note the following settings changes:
    ```js
    const minRadius = 5;
    const maxRadius = 25;
    const acceleration = 0.95;
    ```
    * The radius range has increased. This means that there will be more overlap of particles near the emitter source point
    * The <code>acceleration</code> is slightly smaller, but small changes actually have a huge effect in this system. Lowering <code>acceleration</code> means that particles fade out and slow down sooner in their lifecycles
4. And that's it for <code>smoke.js</code>! It's amazing how much can change with just a few adjustments to the settings
5. In <code>index.html</code>, add a filter to the canvas CSS:
    ```CSS
    canvas { 
        position: absolute; 
        filter: blur(5px); 
    }
    ```
    The blur turns a stack of circles into a smoke simulation. Again, small changes can have a huge effect!