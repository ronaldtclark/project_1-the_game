
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

//game over image
const gameOverMessage = new Image()
  gameOverMessage.src = "https://i.imgur.com/UoUe6vE.png"

// ship image
let playerImg = new Image()
  playerImg.src = "https://i.imgur.com/Ta7L9Ur.gif"

// player object
const player = {
  x: 100,
  y: 200,
  width: 80,
  height: 30,
  direction: '',
  draw() {
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  },
  move() {
    if (this.direction === 'up') {
      this.y -= 10;
    }
    if (this.direction === 'down') {
      this.y += 10;
    }
    if (this.direction === 'left') {
      this.x -= 10;
    }
    if (this.direction === 'right') {
      this.x += 10;
    }
  }
};



//player movement
document.addEventListener('keydown', (event) => {
// up 38
  if (event.keyCode === 38) {
    player.direction = 'up';
  }
// down 40
  if (event.keyCode === 40) {
    player.direction = 'down';
  }
// left 37
  if (event.keyCode === 37) {
    player.direction = 'left';
  }
// right 39
  if (event.keyCode === 39) {
    player.direction = 'right';
  }

})

document.addEventListener('keyup', (event) => {
// up 38
  if (event.keyCode === 38) {
    player.direction = "";
  }
// down 40
  if (event.keyCode === 40) {
    player.direction = ""; 
  }
// left 37
  if (event.keyCode === 37) {
    player.direction = ""; 
  }
// right 39
  if (event.keyCode === 39) {
    player.direction = "";
  }

})

// obstacles

class Game {

  constructor() {
    this.topBlockImg = new Image();
    this.topBlockImg.src = "https://i.imgur.com/ZM518qF.png?1";
    this.btmBlockImg = new Image();
    this.btmBlockImg.src = "https://i.imgur.com/OXERXGA.png?1s";
    this.bgImg = new Image();
    this.bgImg.src = "https://i.imgur.com/FUwWAhe.jpg";
    this.bgImgXValue = 0;
    this.topArray = [];
    this.bottomArray = [];
    this.score = 0 
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

    this.score = this.score + 100;
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
      this.topArray[i].x -= 4;
    }
    for (let i = 0; i < this.bottomArray.length; i++) {
      this.bottomArray[i].x -= 4;
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

  drawScore() {
      ctx.font = "24px 'Arial'";
      ctx.fillStyle = "lightgreen";
      ctx.fillText("Score: " + this.score, 50, 550);
  };

  gameOver() {
    let crashDetect = this.checkCrash(player.x, player.y, player.width, player.height);
      if (crashDetect == true) {
        playerImg.src = "https://i.imgur.com/r7HCQ5W.png?1";
        ctx.drawImage(gameOverMessage, 150, 200, 500, 200);
      }
    }
  


  start() {
    this.createBlocks();
    this.animate();
  };

  

  animate() {
      clear()
      this.drawBackground();
      this.drawBlocks();
      this.drawScore();
      player.move();
      let crashDetect = this.checkCrash(player.x, player.y, player.width, player.height);
      this.addBlocks();
      this.moveElements();
      this.gameOver();
      if (crashDetect == true) {
        // playerImg.src = "https://i.imgur.com/r7HCQ5W.png?1";
        ctx.drawImage(playerImg, player.x - 10, player.y - 35, 100, 100);
        return; 
      } 
      player.draw();

     
    window.requestAnimationFrame(()=>{this.animate()});
  }
};




const game = new Game();

const menu = document.getElementById("menu")

canvas.style.display = 'none'

menu.addEventListener('click', () => {
  console.log('click on')
  menu.style.display = 'none';
  canvas.style.display = '';
  game.start();
});
  






























