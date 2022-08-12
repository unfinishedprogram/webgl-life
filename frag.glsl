#version 300 es

precision highp float;

uniform sampler2D tex;

out vec4 outColor;
 
void main() {
  outColor = texture(tex, gl_PointCoord.xy);
}