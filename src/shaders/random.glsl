#version 300 es

precision highp float;

out vec4 outColor;
uniform vec2 u_res;

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

in vec4 v_positionWithOffset;

void main() {
    float c = 0.0;
    if(random(v_positionWithOffset.xy/u_res) > 0.5){
        c = 1.0;
    }
    outColor = vec4(0, 0, 0, c);
}