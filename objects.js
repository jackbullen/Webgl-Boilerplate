function createCube(gl, size = 1) {
    const vertices = [
        -size, -size,  size,
         size, -size,  size,
         size,  size,  size,
        -size,  size,  size,

        -size, -size, -size,
        -size,  size, -size,
         size,  size, -size,
         size, -size, -size,

        -size,  size, -size,
        -size,  size,  size,
         size,  size,  size,
         size,  size, -size,

        -size, -size, -size,
         size, -size, -size,
         size, -size,  size,
        -size, -size,  size,

         size, -size, -size,
         size,  size, -size,
         size,  size,  size,
         size, -size,  size,

        -size, -size, -size,
        -size, -size,  size,
        -size,  size,  size,
        -size,  size, -size,
    ];

    const indices = [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ];

    const cubeVerticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const cubeIndicesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const translation = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    return {
        geometry: {
            data: vertices,
            buffer: cubeVerticesBuffer,
            indices: indices,
            indexBuffer: cubeIndicesBuffer
        },
        translation: translation
    };
}

export { createCube };
