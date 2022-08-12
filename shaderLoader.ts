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