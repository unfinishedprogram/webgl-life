export function createProgram (
	gl:WebGL2RenderingContext, 
	vertexShader:WebGLShader, 
	fragmentShader:WebGLShader
) {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
	
  if (success) {
    return program;
  }
 
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export default function createShader(
	gl:WebGL2RenderingContext, 
	type:number, 
	source:string
) {
	const shader = gl.createShader(type)!;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		return shader;
	}
	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

export function resize(gl:WebGL2RenderingContext) {
  gl.canvas.width = window.innerWidth;
  gl.canvas.height = window.innerHeight;
}

export function loadTexture(
  gl:WebGL2RenderingContext, 
  width:number, height:number, 
  data:Uint8ClampedArray) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	const img = gl.texImage2D(
		gl.TEXTURE_2D,
		0, 
		gl.RGBA,
		size, size, 0,
		gl.RGBA, 
		gl.UNSIGNED_BYTE,
		randomImg(size, false)
	)

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	return texture;
}
