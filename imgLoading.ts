const randomImg = (size:number, random = true) => {
	const arr = Array(size**2*4);
	arr.fill(0);

	for(let i = 0; i < arr.length; i+=4) {
		if(Math.random()*Number(random) > 0.5) arr[i+3] = 255;
	}

	return new Uint8ClampedArray(arr);
}

export function loadCleanTexture(gl:WebGL2RenderingContext, size:number) {
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

export function loadRandomTexture(gl:WebGL2RenderingContext, size:number) {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	const img = gl.texImage2D(
		gl.TEXTURE_2D,
		0, 
		gl.RGBA,
		size, size, 0,
		gl.RGBA, 
		gl.UNSIGNED_BYTE,
		randomImg(size)
	)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	return texture;
}
