export const vertexShaderSource = `
    attribute vec3 aPosition;
    uniform mat4 uModelMatrix;
    uniform mat4 uViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform float uTime;

    void main(void) {
        vec3 animatedPos = aPosition;
        animatedPos.x += sin(uTime + aPosition.y * 0.1) * 0.05;  // This will give a wavy effect in the x-direction
        animatedPos.y += sin(uTime + aPosition.x * 0.1) * 0.05;  // Wavy effect in y-direction
        
        gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(animatedPos, 1.0);
    }
`;

export const fragmentShaderSource = `
    precision mediump float;
    void main(void) {
        vec2 center = vec2(0.5, 0.5);
        float dist = distance(gl_FragCoord.xy / vec2(800.0, 600.0), center);
        float gradient = smoothstep(0.0, 1.0, dist);
        
        // Use the gradient to mix between deep blue and lighter blue
        vec3 deepWaterColor = vec3(1.0, 0.0, 0.3);
        vec3 lightWaterColor = vec3(0.7, 0.8, 0.0);
        vec3 color = mix(lightWaterColor, deepWaterColor, gradient);
        
        gl_FragColor = vec4(color, 0.9); // Slightly transparent
    }
`;