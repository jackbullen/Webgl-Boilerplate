import { createCube } from './objects.js';

const createRaysOfLight = (gl, cubeSizeFromSlider) => {
    const rays = [];
    const totalCubes = 20;
    const cubeSize = cubeSizeFromSlider || 0.2;

    for (let i = 0; i < totalCubes; i++) {
        const x = -4.3;
        const y = 0;
        const z = 10;

        // Create the source cube
        const cube = createCube(gl, cubeSize);
        cube.translation[12] = x + i*cubeSize*2.2;
        cube.translation[13] = y + Math.sin(i);//+ i*cubeSize*2;
        cube.translation[14] = z;//+ i*cubeSize*2;
        rays.push(cube);
    }
    return rays;
}

export { createRaysOfLight };