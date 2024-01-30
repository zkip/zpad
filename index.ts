import { listen } from "./utils/event";
import { sleep } from "./utils/time";

type Environment = {
	stage: HTMLDivElement, title: string, fullscreen: HTMLDivElement, canvas: HTMLCanvasElement
}

let initialized = false
const environment: Environment = {} as Environment

listen("load", () => {
	const { stage, title, fullscreen } = setup()
	Object.assign(environment, { stage, title, fullscreen })

	setTitle("Demo")

	listen('dblclick', () => toggleFullscreen(stage)).attach(stage)
	listen('click', () => toggleFullscreen(stage)).attach(fullscreen)

	listen("fullscreenchange", () => {
		const isFullscreen = document.fullscreenElement;
		if (isFullscreen) fullscreen.classList.remove("enabled")
		else fullscreen.classList.add("enabled")
	}).attach()

	loadDemo();
}).attach()

async function loadDemo() {

	await sleep(40000);
	console.log("load completed.");


	// const resp = await fetch("assets/godot.editor.wasm");
	// console.log(resp, "++");


}

function setTitle(title: string) {
	if (!initialized) return
	environment.title = title
}

function toggleFullscreen(target: Element) {
	const isFullscreen = document.fullscreenElement
	if (isFullscreen) {
		document.exitFullscreen()
	} else {
		target.requestFullscreen()
	}
}

function setup(): Environment {
	document.querySelector('body')!.innerHTML = `
		<div class="stage"><div class="title">Demo</div><div class="fullscreen">F</div><canvas>not support canvas.</canvas></div>
	`
	const style = document.createElement("style")
	style.textContent = `
		html { height: 100%; } * { box-sizing: border-box; user-select: none; --t_color: #333333; }
		body { height: 100%; margin: 0; padding: 0; border-radius: 8px;
			display: flex; flex-direction: column; }

		.stage { max-height: 100%; margin-bottom: 0.5px; flex: 1; display: flex; flex-direction: column; position: relative;
			border-radius: 8px; border: 1px solid transparent; background: white; }
		.stage > canvas { flex: 1; min-height: 0; }
		.stage > .title { position: fixed; top: 8px; left: 16px; pointer-events: none; }

		.stage:not(:hover) .fullscreen { color: transparent; opacity: 0.1; border: 1px solid #333; background: none; }

		.fullscreen { position: fixed; right: 8px; bottom: 8px; width: 1em; height: 1em; cursor: pointer;
			border-radius: 4px; padding: 12px; font-weight: bolder; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.4); opacity: 0.4 }
		.fullscreen:hover { opacity: 1; }
		.fullscreen.enabled { opacity: 1; color: white; border: 1px solid transparent; }
		.fullscreen.hover { border-color: white; }
	`
	document.querySelector('body')?.append(style)

	const stage = document.querySelector(".stage") as HTMLDivElement
	const title = "demo"
	const fullscreen = document.querySelector(".fullscreen") as HTMLDivElement
	const canvas = stage.querySelector("canvas") as HTMLCanvasElement

	initialized = true;
	return { stage, title, fullscreen, canvas }
}
