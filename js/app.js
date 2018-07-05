
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



// // scrolling background
// const bgImg = new Image()
// bgImg.src = "https://i.imgur.com/FUwWAhe.jpg"
// let bgScroll = 0
// let bgSpeed = 1
// let renderLoops = 0



// const loadImage = () => {
//   imgWidth = bgImg.width,
//   imgHeight = bgImg.height;
//   canvas.width = imgWidth;
//   canvas.height =  imgHeight;    
//   render();                
// }

// bgImg.onload = loadImage;

// const render = () => {
//   ctx.clearRect(0,0,canvas.width,canvas.height);
//   if(bgScroll >= canvas.width){
//       bgScroll = 0;
// }

//   bgScroll += bgSpeed;                   

//   ctx.drawImage(bgImg, -bgScroll, 0, imgWidth, imgHeight);
//   ctx.drawImage(bgImg, canvas.width-bgScroll, 0, imgWidth, imgHeight);
  
//   player.draw();
  
  
//   topBlock.draw();
//   bottomBlock.draw();
//   renderLoops++; 

//   // if (renderLoops % 100 === 0) {
//   //   createBlocks();
//   // }

//   setTimeout(function(){render();},10);
// }

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
    player.y -= 10;
    clear();
    player.draw();
  }
// down 40
  if (event.keyCode == 40) {
    player.y += 10;
    clear();
    player.draw();
  }
// left 37
  if (event.keyCode == 37) {
    player.x -= 10;
    clear();
    player.draw();
  }
// right 39
  if (event.keyCode == 39) {
    player.x += 10;
    clear();
    player.draw();
  }

})

// document.addEventListener('keyup', (event) => {
// // up 38
//   if (event.keyCode == 38) {
//     player.y = "";
    
//   }
// // down 40
//   if (event.keyCode == 40) {
//     player.y = "";
    
//   }
// // left 37
//   if (event.keyCode == 37) {
//     player.x = "";
    
//   }
// // right 39
//   if (event.keyCode == 39) {
//     player.x = "";
   
//   }

// })

// obstacles

class Game {
//   constructor (x, y, height) {
//     this.color = "#f00";
//     this.x = x;
//     this.y = y;
//     this.width = 100;
//     this.height = height;
//   } 
//   draw() {
    
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x -= 5, this.y, this.width, this.height);
 
//   }
  
  // }
  constructor() {
    this.resetGame();
    this.blockImg = new Image();
    this.blockImg.src = "https://i.imgur.com/BpPPfxP.jpg?2";
    this.bgImg = new Image();
    this.bgImg.src = "https://i.imgur.com/FUwWAhe.jpg";
    this.bgImgXValue = 0;
    this.topArray = [];
    this.bottomArray = [];
    this.speed = 4;
    
  };

  resetGame() {
    this.topArray = [];
    this.bottomArray = [];
    this.createBlocks();
  }

  createBlocks() {  
    //parameters for block size and location
    let gapSize = 200
    let topBlockHeight = Math.floor(Math.random() * (canvas.height - gapSize));
    let bottomBlockStart = topBlockHeight + gapSize; 
    let bottomBlockHeight = canvas.height - bottomBlockStart;

    //creation of top and bottom blocks
    // const topBlock = new Blocks(canvas.width, 0, topBlockHeight)
    // const bottomBlock = new Blocks(canvas.width, bottomBlockStart, bottomBlockHeight)

    let topBlock = {
      x: canvas.width,
      y: 0,
      width: 100,
      height: topBlockHeight
    }

    let bottomBlock = {
      x: canvas.width,
      y: bottomBlockStart,
      width: 100,
      height: bottomBlockHeight
    }
     
    this.topArray.push(topBlock);
    this.bottomArray.push(bottomBlock);
  }; 

  drawBackground() {
    clear()
    for (let x = this.bgImgXValue; x < canvas.width; x += canvas.width) {
      ctx.drawImage(this.bgImg, x, 0, canvas.width, canvas.height);
    }
  }

  drawBlocks() {
    for (let i = 0; i < this.topArray.length; i++) {
      // ctx.drawImage(this.blockImg, this.topArray[i].x, this.topArray[i].y, this.topArray[i].width, this.topArray[i].height);
      ctx.fillStyle = "#f00"
      ctx.fillRect(this.topArray[i].x, this.topArray[i].y, this.topArray[i].width, this.topArray[i].height)
    }
    for (let i = 0; i < this.bottomArray.length; i++) {
      // ctx.drawImage(this.blockImg, this.bottomArray[i].x, this.bottomArray[i].y, this.bottomArray[i].width, this.bottomArray[i].height);
      ctx.fillStyle = "#f00"
      ctx.fillRect(this.bottomArray[i].x, this.bottomArray[i].y, this.bottomArray[i].width, this.bottomArray[i].height)
    }
  };

  moveBlocks() {
    for (let i = 0; i < this.topArray.length; i++) {
      this.topArray[i].x -= 1;
    }
    for (let i = 0; i < this.bottomArray.length; i++) {
      this.bottomArray[i].x -= 1;
    }
    this.bgImgXValue -= 1;
    this.bgImgXValue %= canvas.width;
  };

  addBlocks() {
    let lastBlock = this.topArray[this.topArray.length - 1]
    if (lastBlock.x === 500) {
      this.createBlocks();
    }
  };

  start() {
    // this.createBlocks();
    
  }

  animate() {
    clear()
    // this.createBlocks();
    this.drawBlocks();
    this.drawBackground();
    this.moveBlocks();
    // this.addBlocks();
    player.draw();
    

    window.requestAnimationFrame(()=>{this.animate()});
  }
}

const game = new Game();

canvas.onclick = function(){
    game.resetGame();
};

game.animate();



























