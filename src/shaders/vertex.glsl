#version 300 es
// vertex shader

in vec4 a_position;

void main() {
  gl_Position = a_position;
}