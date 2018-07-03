
// set up canvas 
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');


// clear function
function clear() {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )
};


// player object
const player = {
  color: "#FFF",
  x: 100,
  y: 200,
  width: 50,
  height: 25,
  draw: function() {

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};



// scrolling background
const bgImg = new Image()
bgImg.src = "https://i.imgur.com/FUwWAhe.jpg"
let bgScroll = 0
let bgSpeed = 1
let renderLoops = 0
const blockArray = []


const loadImage = () => {
  imgWidth = bgImg.width,
  imgHeight = bgImg.height;
  canvas.width = imgWidth;
  canvas.height =  imgHeight;    
  render();                
}

bgImg.onload = loadImage;

const render = () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(bgScroll >= canvas.width){
      bgScroll = 0;
}

  bgScroll += bgSpeed;                   

  ctx.drawImage(bgImg, -bgScroll, 0, imgWidth, imgHeight);
  ctx.drawImage(bgImg, canvas.width-bgScroll, 0, imgWidth, imgHeight);
  
  player.draw();
  
  // for (i = 0; i < blockArray.length; i++) {
  //   blockArray[i].push(topBlock);
  //   blockArray[i].push(bottomBlock);
  // }
  topBlock.draw();
  bottomBlock.draw();
  renderLoops++; 

  // if (renderLoops % 100 === 0) {
  //   createBlocks();
  // }

  setTimeout(function(){render();},10);
}
// animation:
// move picture to the left
// move whatever else
// clear
// repaint background
// repaint guy

//player movement
document.addEventListener('keydown', (event) => {
// up 38
  if (event.keyCode == 38) {
    player.y -= 50;
    // clear();
    // player.draw();
  }
// down 40
  if (event.keyCode == 40) {
    player.y += 50;
    // clear();
    // player.draw();
  }
// left 37
  if (event.keyCode == 37) {
    player.x -= 50;
    // clear();
    // player.draw();
  }
// right 39
  if (event.keyCode == 39) {
    player.x += 50;
    // clear();
    // player.draw();
  }

})

// obstacles

class Blocks {
constructor (x, y, height) {
  this.color = "#f00";
  this.x = x;
  this.y = y;
  this.width = 100;
  this.height = height;
 } 
  draw() {
    
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x -= 5, this.y, this.width, this.height);
 
  }
  
 }
  
//parameters for block size and location
const gapSize = 200
const topBlockHeight = Math.floor(Math.random() * (canvas.height - gapSize));
const bottomBlockStart = topBlockHeight + gapSize; 
const bottomBlockHeight = canvas.height - bottomBlockStart;
//creation of top and bottom blocks

const topBlock = new Blocks(canvas.width, 0, topBlockHeight)
const bottomBlock = new Blocks(canvas.width, bottomBlockStart, bottomBlockHeight)

  


// if (topBlock.x === 500) {
//   topBlock.draw();
//   bottomBlock.draw();

// const createBlocks = () => {
// }




// let topBlock = new Blocks(canvas.width, 0, topBlockHeight)
// let bottomBlock = new Blocks(canvas.width, bottomBlockStart, bottomBlockHeight)






























