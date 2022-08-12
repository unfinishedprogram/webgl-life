#version 300 es

precision highp float;

uniform sampler2D tex;

out vec4 outColor;
 
void main() {
	float p = 1.0/1024.0;
  float sum = 0.0;
	
	vec2 cord = gl_PointCoord * vec2(1, -1);

  if(texture(tex, cord.xy + vec2(1, 1)*p).a == 1.0) sum += 1.0;
  if(texture(tex, cord.xy + vec2(-1, 1)*p).a == 1.0) sum += 1.0;
  if(texture(tex, cord.xy + vec2(1, -1)*p).a == 1.0) sum += 1.0;
  if(texture(tex, cord.xy + vec2(-1, -1)*p).a == 1.0) sum += 1.0;
  if(texture(tex, cord.xy + vec2(0, 1)*p).a == 1.0) sum += 1.0;
  if(texture(tex, cord.xy + vec2(1, 0)*p).a == 1.0) sum += 1.0;
  if(texture(tex, cord.xy + vec2(0, -1)*p).a == 1.0) sum += 1.0;
  if(texture(tex, cord.xy + vec2(-1, 0)*p).a == 1.0) sum += 1.0;
	
	float c = 0.0;
	if(texture(tex, cord.xy).a == 1.0) {
		if(sum < 2.0 || sum > 3.0) {
			c = 0.0;
		} else {
			c = 1.0;
		}
	} else {
		if(sum == 3.0){
			c = 1.0;
		} else {
			c = 0.0;
		}
	}

  outColor = vec4(0, 0, 0, c);
}