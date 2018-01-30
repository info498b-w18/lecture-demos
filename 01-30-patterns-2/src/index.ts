import * as Equation from './equations';

const canvas = $('#canvas')[0] as HTMLCanvasElement;
let canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

function generateArt() {
  //generating functions
  let redFunc = null
  let greenFunc = null
  let blueFunc = null

  const imageData = canvasContext.createImageData(canvas.width, canvas.height);
  const pixels = imageData.data;

  for(let i=0; i<canvas.width; i++){
    for(let j=0; j<canvas.height; j++){

      //scale coordinate to be between -1 and 1
      const x = ((i/canvas.width)-.5)*2;
      const y = ((j/canvas.height)-.5)*2;

      let pixelIndex = j*(canvas.width*4)+(i*4) //calc from mdn

      //evaluate at x,y, then scale back to 0-1
      // pixels[pixelIndex+0] = Math.floor(255*(redFunc.evaluate(x,y)*.5+.5));
      // pixels[pixelIndex+1] = Math.floor(255*(greenFunc.evaluate(x,y)*.5+.5));
      // pixels[pixelIndex+2] = Math.floor(255*(blueFunc.evaluate(x,y)*.5+.5));
      pixels[pixelIndex+3] = 255; //alpha
    }
  }
  canvasContext.putImageData(imageData,0,0);
}

$('#createButton').click(generateArt);
$('#saveButton').click(() => {
    const snapshot = canvas.toDataURL('image/png'); //convert to png
   
    const link = document.createElement('a'); //create a fake link
    link.href = snapshot;
    link.download = 'random_art.png'; //make it a download link  
    link.click(); //click the link!
});