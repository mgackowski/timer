/*  Template for basic handling of time, based on the code by Isaac Sukin;
	Framerate-independent, but not protected against Spiral of Death;
	Jan 2016 Mikolaj Gackowski */

// Handling the passage of time
var lastFrameTimeMs = 0,
	maxFPS = 60,
	delta = 0,	//real time (ms) passed between drawn frames
	timestep = 1000/60;	//simulated unit of time (target 1 frame)

// For the stats function
var timeStatsEnabled = true;
var frameCounter = 0;
var initialDateObj = new Date();
var initialDate = initialDateObj.getTime();
var currentDateObj;
var millisSinceLaunch;

// Use t as unit time (one frame regardless of actual FPS)
// Example: displacement = velocity * t
function update(t) {
	if (timeStatsEnabled) {displayTimeStats();}

	/// CALCULATE PROGRAM HERE
}

function draw() {

	/// DISPLAY PROGRAM HERE
}

function mainLoop(timestamp) {

	//skip extra frames above maxFPS
	if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
		requestAnimationFrame(mainLoop);
		return;
	}
	delta += timestamp - lastFrameTimeMs; //accumulate delta
	lastFrameTimeMs = timestamp;

	//run update as many times os you need per frame when on low FPS
	while (delta >= timestep) {
		update(timestep); //pass fixed timestep as simulated unit time
		delta -= timestep;
	}

	draw();
	requestAnimationFrame(mainLoop);
}

function displayTimeStats() {

	frameCounter += 1;
	currentDateObj = new Date();
	millisSinceLaunch = currentDateObj.getTime() - initialDate;
	console.log("Frame No. " + frameCounter + " / equivalent " + (frameCounter / 60).toPrecision(3) + " at 60FPS");
	console.log("  (real time elapsed: " + (millisSinceLaunch / 1000).toPrecision(3) + ")");
	console.log("   timestep + delta: " + delta.toPrecision(3) + " ms");

}

//start the loop
requestAnimationFrame(mainLoop);