
// set up canvas 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// clear function
const clear = () => {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )
};

//collision function
const crash = (x1, y1, w1, h1, x2, y2, w2, h2) => {
  return x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1
};

// ship image
let playerImg = new Image()
  playerImg.src = "https://i.imgur.com/Ta7L9Ur.gif"

// player object
const player = {
  x: 100,
  y: 200,
  width: 80,
  height: 30,
  draw: function() {
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  }

};



//player movement
document.addEventListener('keydown', (event) => {
// up 38
  if (event.keyCode == 38) {
    player.y -= 30;
    // clear();
    // player.draw();
  }
// down 40
  if (event.keyCode == 40) {
    player.y += 30;
    // clear();
    // player.draw();
  }
// left 37
  if (event.keyCode == 37) {
    player.x -= 30;
    // clear();
    // player.draw();
  }
// right 39
  if (event.keyCode == 39) {
    player.x += 30;
    // clear();
    // player.draw();
  }

})

// document.addEventListener('keyup', (event) => {
// // up 38
//   if (event.keyCode == 38) {
//     player.y -= "";
    
//   }
// // down 40
//   if (event.keyCode == 40) {
//     player.y += "";
    
//   }
// // left 37
//   if (event.keyCode == 37) {
//     player.x -= "";
    
//   }
// // right 39
//   if (event.keyCode == 39) {
//     player.x += "";
   
//   }

// })

// obstacles

class Game {

  constructor() {
    this.resetGame();
    this.topBlockImg = new Image();
    this.topBlockImg.src = "https://i.imgur.com/ZM518qF.png?1";
    this.btmBlockImg = new Image();
    this.btmBlockImg.src = "https://i.imgur.com/ZM518qF.png?1";
    this.bgImg = new Image();
    this.bgImg.src = "https://i.imgur.com/FUwWAhe.jpg";
    this.bgImgXValue = 0;
    this.topArray = [];
    this.bottomArray = [];
    
  };



  resetGame() {
    this.topArray = [];
    this.bottomArray = [];
    this.createBlocks();
    this.animate
  };



  createBlocks() {  
    //parameters for block size and location
    let gapSize = 200
    let topBlockHeight = Math.floor(Math.random() * (canvas.height - gapSize));
    let bottomBlockStart = topBlockHeight + gapSize; 
    let bottomBlockHeight = canvas.height - bottomBlockStart;

    //creation of top and bottom blocks

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
    for (let x = this.bgImgXValue; x < canvas.width; x += canvas.width) {
      ctx.drawImage(this.bgImg, x, 0, canvas.width, canvas.height);
    }
  };



  drawBlocks() {
    for (let i = 0; i < this.topArray.length; i++) {
      ctx.drawImage(this.topBlockImg, this.topArray[i].x, this.topArray[i].y, this.topArray[i].width, this.topArray[i].height);
      // ctx.fillStyle = "#f00"
      // ctx.fillRect(this.topArray[i].x, this.topArray[i].y, this.topArray[i].width, this.topArray[i].height)
    }
    for (let i = 0; i < this.bottomArray.length; i++) {
      ctx.drawImage(this.btmBlockImg, this.bottomArray[i].x, this.bottomArray[i].y, this.bottomArray[i].width, this.bottomArray[i].height);
      // ctx.fillStyle = "#f00"
      // ctx.fillRect(this.bottomArray[i].x, this.bottomArray[i].y, this.bottomArray[i].width, this.bottomArray[i].height)
    }
  };



  moveElements() {
    for (let i = 0; i < this.topArray.length; i++) {
      this.topArray[i].x -= 3;
    }
    for (let i = 0; i < this.bottomArray.length; i++) {
      this.bottomArray[i].x -= 3;
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



  checkCrash(x, y, w, h) {

    for (let i = 0; i < this.topArray.length; i++) {
      let a = this.topArray[i];
      if (crash(x, y, w, h, a.x, a.y, a.width, a.height)) {
        console.log("crash");
        return true;
      } 
    }
    for (let i = 0; i < this.bottomArray.length; i++) {
      let b = this.bottomArray[i];
      if (crash(x, y, w, h, b.x, b.y, b.width, b.height)) {
        console.log("crash");
        return true;
      } 
    } 
  };


  gameOver() {
    let crashDetect = this.checkCrash(player.x, player.y, player.width, player.height);
      if (crashDetect == true) {
         playerImg.src = "https://i.imgur.com/r7HCQ5W.png?1"
      }
  }


  start() {
    this.createBlocks();
    this.animate();
  }



  animate() {
    
      clear()
      this.drawBackground();
      this.drawBlocks();
      let crashDetect = this.checkCrash(player.x, player.y, player.width, player.height);
      this.moveElements();
      this.addBlocks();
      this.gameOver();
      if (crashDetect == true) {
        playerImg.src = "https://i.imgur.com/r7HCQ5W.png?1";
        ctx.drawImage(playerImg, player.x - 10, player.y - 35, 100, 100)
        return;
        
      } 
      player.draw();

     
    window.requestAnimationFrame(()=>{this.animate()});
  }
}



const game = new Game();

canvas.onclick = function(){
    game.resetGame();
};

game.start();



























