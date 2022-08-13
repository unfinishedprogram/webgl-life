import stepLifeSrc from "./shaders/stepLife.glsl?raw"
import drawLifeSrc  from "./shaders/drawLife.glsl?raw"
import randomSrc  from "./shaders/random.glsl?raw"

import vertexSrc  from "./shaders/vertex.glsl?raw"

import createShader, { createProgram } from "./glUtils";

const positions = [
    -1, -1,
     1, -1,
    -1,  1,
     1,  1,
 ];

export default class Life {
    private gl:WebGL2RenderingContext;
    private p_draw!:WebGLProgram;
    private p_step!:WebGLProgram;
    private p_random!:WebGLProgram;

    private renderBuffers:WebGLRenderbuffer[] = [];
    private textures:WebGLTexture[] = [];
    private vao!:WebGLVertexArrayObject;
    // private plane:
    private bufferIndex = 0;


    constructor(canvas:HTMLCanvasElement, private width:number, private height:number) {
        this.gl = canvas.getContext("webgl2")!;
        this.createPrograms();
        this.setSize(width, height);

        // Creating Mesh Plane
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        this.vao = this.gl.createVertexArray()!;
        this.gl.bindVertexArray(this.vao);
        this.createTexBuffers();
    }

    updateUniforms() {
        const drawRes = this.gl.getUniformLocation(this.p_draw, "u_res");
        this.gl.useProgram(this.p_draw);
        this.gl.uniform2f(drawRes, this.width, this.height);

        const stepRes = this.gl.getUniformLocation(this.p_step, "u_res");
        this.gl.useProgram(this.p_step);
        this.gl.uniform2f(stepRes, this.width, this.height);

        const randRes = this.gl.getUniformLocation(this.p_random, "u_res");
        this.gl.useProgram(this.p_random);
        this.gl.uniform2f(randRes, this.width, this.height);
    }

    createPrograms() {
        const stepLifeFrag = createShader(this.gl, this.gl.FRAGMENT_SHADER, stepLifeSrc)!;
        const drawLifeFrag = createShader(this.gl, this.gl.FRAGMENT_SHADER, drawLifeSrc)!;
        const randomFrag = createShader(this.gl, this.gl.FRAGMENT_SHADER, randomSrc)!;

        const vertex = createShader(this.gl, this.gl.VERTEX_SHADER, vertexSrc)!;

        this.p_draw = createProgram(this.gl, vertex, drawLifeFrag)!;
        this.p_step = createProgram(this.gl, vertex, stepLifeFrag)!;
        this.p_random = createProgram(this.gl, vertex, randomFrag)!;
    }

    assignNewTexture() {
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0, 
            this.gl.RGBA,
            this.width, this.height, 
            0,
            this.gl.RGBA, 
            this.gl.UNSIGNED_BYTE,
            new Uint8ClampedArray(this.width * this.height * 4)
        )
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    }

    createTexBuffers() {
        const tex1 = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex1);
        this.assignNewTexture();
        
        const tex2 = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex2);
        this.assignNewTexture();

        this.textures.push(tex1!, tex2!);

        [tex1, tex2].forEach(tex => {
            const fbo = this.gl.createFramebuffer();
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);

	        this.gl.framebufferTexture2D(
                this.gl.FRAMEBUFFER, 
                this.gl.COLOR_ATTACHMENT0, 
                this.gl.TEXTURE_2D, tex, 0
            );

            this.renderBuffers.push(fbo!);
        })
    }

    setSize(width:number, height:number) {
        [this.width, this.height] = [width, height];

        this.gl.canvas.width = width;
        this.gl.canvas.height = height;
        this.gl.viewport(0, 0, width, height)

        this.textures.forEach(tex => {
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
            this.assignNewTexture();
        })

        this.updateUniforms();
    }

    randomize() {
        this.gl.useProgram(this.p_random);
        this.gl.enableVertexAttribArray(0);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.renderBuffers[(this.bufferIndex % 2)]);
	    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    step() {
        this.gl.useProgram(this.p_step);
        this.gl.enableVertexAttribArray(0);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[this.bufferIndex++ % 2]);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.renderBuffers[this.bufferIndex % 2]);
	    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    draw() {
        this.gl.useProgram(this.p_draw);
        this.gl.enableVertexAttribArray(0);
        this.gl.vertexAttribPointer(0, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[this.bufferIndex % 2]);
	    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}