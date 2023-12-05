// Select audio and canvas elements
const audio = document.querySelector('audio');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Set up audio context and analyzer
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyzer = audioContext.createAnalyser();
const source = audioContext.createMediaElementSource(audio);
source.connect(analyzer);
analyzer.connect(audioContext.destination);

analyzer.fftSize = 256;
const bufferLength = analyzer.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to draw the visualizer
function draw() {
  requestAnimationFrame(draw);

  analyzer.getByteFrequencyData(dataArray);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for(let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    ctx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

// Start the animation
draw();



// In this code:

// The Web Audio API is used to create an audio context and an analyzer node.
// The analyzer gets frequency data from the audio, which is then used to create a visual effect on the canvas.
// The draw function is called repeatedly using requestAnimationFrame to update the visualizer in sync with the audio.
// To see this in action, you'll need to include an audio element and a canvas element in your HTML. Make sure your audio file is correctly linked and that the browser supports the Web Audio API.

// This example creates a basic bar visualizer. You can customize the visualizer's appearance by modifying the draw function. Keep in mind that for complex visualizations or for additional control over the audio, you might need a more advanced implementation.
