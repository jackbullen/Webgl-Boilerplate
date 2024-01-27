import { vertexShaderSource, fragmentShaderSource } from './shaders.js';
import { createRaysOfLight } from './bootstrap.js';

let gl;
let shaderProgram;
let rays;

let originalCubeSize = 0.2;
let currentCubeSize = originalCubeSize;

function initWebGL(canvas) {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    shaderProgram = createProgram(gl, vertexShader, fragmentShader);

    rays = createRaysOfLight(gl, originalCubeSize);

    render();
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
    }
    return program;
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(shaderProgram);

    let viewMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, -5,
        0, 0, 0, 1
    ]);

    let projectionMatrix = new Float32Array([
        2.41421, 0, 0, 0,
        0, 2.41421, -1, -1,
        0, 0, -1.002, 1,
        0, 0, -0.2002, 0
    ]);
    
    const uTime = gl.getUniformLocation(shaderProgram, 'uTime');
    gl.uniform1f(uTime, performance.now() * 0.001);

    const uViewMatrix = gl.getUniformLocation(shaderProgram, 'uViewMatrix');
    gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix);

    const uProjectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);

    const scale = currentCubeSize / originalCubeSize;

    for (let ray of rays) {
        gl.bindBuffer(gl.ARRAY_BUFFER, ray.geometry.buffer);
        const position = gl.getAttribLocation(shaderProgram, "aPosition");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

        const scaledTranslation = new Float32Array(ray.translation);
        // Apply the scaling factor to the cube's model matrix
        scaledTranslation[0] *= scale;
        scaledTranslation[5] *= scale;
        scaledTranslation[10] *= scale;

        const uModelMatrix = gl.getUniformLocation(shaderProgram, 'uModelMatrix');
        gl.uniformMatrix4fv(uModelMatrix, false, scaledTranslation);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ray.geometry.indexBuffer);
        gl.drawElements(gl.TRIANGLES, ray.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    requestAnimationFrame(render);
}


// Add an event listener to the slider
document.querySelector('#cubeSize').addEventListener('input', () => {
    // Update the currentCubeSize based on the slider value
    currentCubeSize = parseFloat(document.querySelector('#cubeSize').value);
    document.querySelector('#cubeSizeDisplay').textContent = currentCubeSize;
});

initWebGL(document.querySelector("#glCanvas"));
