let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

// cue ball
ctx.beginPath();
ctx.arc(150, 150, 10, 0, 2 * Math.PI);
// ctx.fillStyle = 'white';
// ctx.fill();
ctx.stroke();


// first ball
ctx.beginPath();
ctx.arc(450, 150, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

// next two
ctx.beginPath();
ctx.arc(467, 140, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

ctx.beginPath();
ctx.arc(467, 160, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

// next 3
ctx.beginPath();
ctx.arc(485, 130, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

ctx.beginPath();
ctx.arc(485, 150, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'black';
ctx.fill();

ctx.beginPath();
ctx.arc(485, 170, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

// 4 more

ctx.beginPath();
ctx.arc(503, 120, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

ctx.beginPath();
ctx.arc(503, 140, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

ctx.beginPath();
ctx.arc(503, 160, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

ctx.beginPath();
ctx.arc(503, 180, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

// the last 5

ctx.beginPath();
ctx.arc(521, 110, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

ctx.beginPath();
ctx.arc(521, 130, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

ctx.beginPath();
ctx.arc(521, 150, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();

ctx.beginPath();
ctx.arc(521, 170, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'blue';
ctx.fill();

ctx.beginPath();
ctx.arc(521, 190, 10, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();