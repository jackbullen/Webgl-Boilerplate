import { createCube } from './objects.js';

const createRaysOfLight = (gl, cubeSizeFromSlider) => {
    const rays = [];
    const totalCubes = 1000;
    const cubeSize = cubeSizeFromSlider || 0.01;
    const rayLength = 0.02; // Length of the light ray

    for (let i = 0; i < totalCubes; i++) {
        const x = 0;
        const y = 0;
        const z = -1;

        // Create the source cube
        const cube = createCube(gl, cubeSize);
        cube.translation[12] = x;
        cube.translation[13] = y;
        cube.translation[14] = z;
        rays.push(cube);

        // Create the light ray
        const rayCube = createCube(gl, [cubeSize, rayLength, cubeSize]);  // Elongated cube
        rayCube.translation[12] = x;
        rayCube.translation[13] = y + rayLength/2;  // Adjust to start from the top of the source cube
        rayCube.translation[14] = z;
        rays.push(rayCube);
    }

    return rays;
}

export { createRaysOfLight };
