#version 300 es
// vertex shader

in vec4 a_position;

uniform vec2 u_res;
out vec4 v_positionWithOffset;

void main() {
  gl_Position = a_position;
  v_positionWithOffset = vec4((a_position.xy / 2.0 + 0.5) * u_res, 0, 1);
}