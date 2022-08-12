#version 300 es

precision highp float;

out vec4 outColor;

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
    float c = 0.0;
    if(random(gl_PointCoord.xy) > 0.2) {
        c = 1.0;
    }

    outColor = vec4(gl_PointCoord.xy, 0, 1);
}