// import vertSrc from "./vertex.glsl?raw"
// import drawFragSrc from './frag.glsl?raw'
// import computeSrc from './compute.glsl?raw'

// import { loadCleanTexture, loadRandomTexture } from "./imgLoading";

// const canvas = document.querySelector("canvas")!;
// const gl = canvas.getContext("webgl2")!;

// const textures = [
// 	loadCleanTexture(gl, 1024),
// 	loadRandomTexture(gl, 1024),
// ];

// const frame_buffers = textures.map(tex => {
// 	const fbo = gl.createFramebuffer();
// 	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
// 	var attachmentPoint = gl.COLOR_ATTACHMENT0;
// 	gl.framebufferTexture2D(gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D, tex, 0);
// 	return fbo;
// })

// const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertSrc);
// const fragmentShaderDraw = createShader(gl, gl.FRAGMENT_SHADER, drawFragSrc);
// const computeShader = createShader(gl, gl.FRAGMENT_SHADER, computeSrc);

// const draw = createProgram(gl, vertexShader!, fragmentShaderDraw!);
// const compute = createProgram(gl, vertexShader!, computeShader!);

// const fb = gl.createFramebuffer();
// gl.bindFramebuffer(gl.FRAMEBUFFER, fb);


// gl.uniform1f(gl.getUniformLocation(draw!, "u_flipY"), 1);
// gl.uniform1f(gl.getUniformLocation(compute!, "u_flipY"), 1);

// let step = 0;

// const run = () => {
// 	gl.useProgram(compute!)
// 	gl.bindFramebuffer(gl.FRAMEBUFFER, frame_buffers[step % 2]);

// 	gl.drawArrays(gl.POINTS, 0, 1);
// 	gl.bindTexture(gl.TEXTURE_2D, textures[step % 2])

// 	gl.useProgram(draw!)
// 	gl.bindFramebuffer(gl.FRAMEBUFFER, null!);
// 	gl.drawArrays(gl.POINTS, 0, 1);

// 	step++;
// }


import Life from "./src/life";
const l = new Life(document.querySelector("canvas")!, 512, 512);
window.addEventListener("resize", () => {
	l.setSize(window.innerWidth, window.innerHeight);
	l.step();
})