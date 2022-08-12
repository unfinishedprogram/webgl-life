#version 300 es

precision highp float;

uniform sampler2D tex;

out vec4 outColor;
 
vec2 dirs[8] = vec2[](
	vec2(1, 1),  vec2(-1, 1),
	vec2(1, -1), vec2(-1, -1),
	vec2(0, 1),  vec2(1, 0),
	vec2(0, -1), vec2(-1, 0)
); 

void main() {
	float p = 1.0/1024.0;
  	float sum = 0.0;
	vec2 cord = gl_PointCoord * vec2(1, -1);

	for(int i = 0; i < 8; i++){
		if(texture(tex, cord.xy + dirs[i]*p).a == 1.0) sum += 1.0;
	}

	float c = 0.0;

	if(texture(tex, cord.xy).a == 1.0 && sum == 2.0 || sum == 3.0) {
		c = 1.0;
	} else if (sum == 3.0) {
		c = 1.0;
	}
	
 	outColor = vec4(0, 0, 0, c);
}