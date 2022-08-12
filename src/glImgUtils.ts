export function genImg (w:number, h:number, noise = false) {
	const arr = Array((w*h)**2*4);
	arr.fill(0);

	for(let i = 0; i < arr.length; i+=4) {
		if(Math.random()*Number(noise) > 0.5) arr[i+3] = 255;
	}

	return new Uint8ClampedArray(arr);
}