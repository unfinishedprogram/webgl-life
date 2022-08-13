#version 300 es

precision highp float;

uniform sampler2D tex;
uniform vec2 u_res;

in vec4 v_positionWithOffset;
out vec4 outColor;
 
void main() {
  outColor = texture(tex, v_positionWithOffset.xy/u_res);
}