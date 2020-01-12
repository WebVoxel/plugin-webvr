# @webvoxel/plugin-webvr
WebVR support for WebVoxel projects

## Usage
```javascript
import { Game, World } from '@webvoxel/core';
import { WebVRPlugin } from '@webvoxel/plugin-webvr';

const vr = new WebVRPlugin();

const game = new Game({
    plugins: [
        vr,
    ],
    initialWorld: new World(),
});

game.start();
```