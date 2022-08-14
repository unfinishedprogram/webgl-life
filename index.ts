import Life from "./src/life";
const life = new Life(document.querySelector("canvas")!, 512, 512);
life.setSize(window.innerWidth, window.innerHeight);
life.randomize();

// l.step();
window.addEventListener("resize", () => {
	life.setSize(window.innerWidth, window.innerHeight);
	life.randomize();
	life.draw();
})

const run = () => {
	life.step();
}

setInterval(run, 1)

const d = () => {
	requestAnimationFrame(d);
	life.draw();
}
d();
