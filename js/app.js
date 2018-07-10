
// Learned much from vampire game by sierramoore.
// I understand every bit of this code, and wrote several 
// other renditions before utilizing these methods for 
// maximum smooth play and functionality.

// set up canvas 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// clear function
const clear = () => {
  ctx.clearRect( 0, 0, canvas.width, canvas.height )
};

//collision function
const crash = (xA, yA, widthA, heightA, xB, yB, widthB, heightB) => {
  return xA < xB + widthB && xB < xA + widthA && yA < yB + heightB && yB < yA + heightA
};

// IMAGES

//game over image
const gameOverMessage = new Image()
  gameOverMessage.src = "https://i.imgur.com/UoUe6vE.png"

// ship image
let playerImg = new Image()
  playerImg.src = "https://i.imgur.com/Ta7L9Ur.gif"

// block images
const topBlockImg = new Image();
  topBlockImg.src = "https://i.imgur.com/ZM518qF.png?1";
const btmBlockImg = new Image();
  btmBlockImg.src = "https://i.imgur.com/OXERXGA.png?1s";

//background image
const bgImg = new Image();
  bgImg.src = "https://i.imgur.com/FUwWAhe.jpg";





// OBJECTS

// player object
const player = {
  x: 100,
  y: 200,
  width: 80,
  height: 30,
  // direction will be used to pass key commands to the animate function via move()
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

//game class - got idea to use a class from sierramoore
class Game {

  constructor() {
    
    // all images used in the game sourced here
    this.topBlockImg = new Image();
    this.topBlockImg.src = "https://i.imgur.com/ZM518qF.png?1";
    this.btmBlockImg = new Image();
    this.btmBlockImg.src = "https://i.imgur.com/OXERXGA.png?1s";
    this.bgImg = new Image();
    this.bgImg.src = "https://i.imgur.com/FUwWAhe.jpg";
    // used for scrolling the background
    this.bgImgXValue = 0;
    // arrays to put the obstacles into
    this.topArray = [];
    this.bottomArray = [];
    // player begins with a score of zero
    this.score = 0 
  };

  //method to create the blocks the player must avoid
  createBlocks() {  
  //parameters for block size and location
    let gapSize = 150
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

  // as they are created, the blocks are pushed into their arrays 
    this.topArray.push(topBlock);
    this.bottomArray.push(bottomBlock);

  // the score increases by 100 for every new block created
    this.score = this.score + 100;
  };


  // set the background image
  background() {
    for (let x = this.bgImgXValue; x < canvas.width; x += canvas.width) {
        ctx.drawImage(bgImg, x, 0, canvas.width, canvas.height);
      }
  };


  // show the blocks from each array on the screen
  // can choose between lightning image or solid red,
  // the other code should be commented out after choosing
  drawBlocks() {
    for (let i = 0; i < this.topArray.length; i++) {
    // lightning image blocks 
        ctx.drawImage(this.topBlockImg, this.topArray[i].x, this.topArray[i].y, this.topArray[i].width, this.topArray[i].height);   
    // solid red blocks
      // ctx.fillStyle = "#f00"
      // ctx.fillRect(this.topArray[i].x, this.topArray[i].y, this.topArray[i].width, this.topArray[i].height)
    };
    for (let i = 0; i < this.bottomArray.length; i++) {
    // lightning image blocks 
        ctx.drawImage(this.btmBlockImg, this.bottomArray[i].x, this.bottomArray[i].y, this.bottomArray[i].width, this.bottomArray[i].height);
    // solid red blocks 
      // ctx.fillStyle = "#f00"
      // ctx.fillRect(this.bottomArray[i].x, this.bottomArray[i].y, this.bottomArray[i].width, this.bottomArray[i].height)
    };
  };


  // moves the background at one speed and blocks at another 
  // creates parralax effect
  moveElements() {
    for (let i = 0; i < this.topArray.length; i++) {
      this.topArray[i].x -= 5;
    }
    for (let i = 0; i < this.bottomArray.length; i++) {
      this.bottomArray[i].x -= 5;
    }
    this.bgImgXValue -= 1;
    this.bgImgXValue %= canvas.width;
  };


  // as the created blocks hit a set x value, a new set is pushed to the array
  newBlocks() {
    let lastBlock = this.topArray[this.topArray.length - 1]
    // new block will generate with 200px gap between it and last block
    if (lastBlock.x === 500) {
      this.createBlocks();
    }
  };


  // checks the ship dimensions against the block dimensions to see if overlap
  // if overlap, returns a value of true (the player has crashed)
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

  //displays the score on the screen
  drawScore() {
      ctx.font = "20px 'Press Start 2P'";
      ctx.fillStyle = "lightgreen";
      ctx.fillText("Score: " + this.score, 50, 550);
  };

  // if checkCrash returns true (player touched a block) 
  // then change the player image to a fireball and display "game over"
  gameOver() {
    let crashDetect = this.checkCrash(player.x, player.y, player.width, player.height);
      if (crashDetect == true) {
        playerImg.src = "https://i.imgur.com/r7HCQ5W.png?1";
          ctx.drawImage(gameOverMessage, 150, 200, 500, 200);
      }
  };
  

  // start function to begin the game 
  start() {
    this.createBlocks();
    this.animate();
  };

  
  // one animate function to run everything at same framerate
  animate() {
    clear()
    this.background();
    this.drawBlocks();
    this.drawScore();
    player.move();
    let crashDetect = this.checkCrash(player.x, player.y, player.width, player.height);
    this.newBlocks();
    this.moveElements();
    this.gameOver();
    // if player crashes, freeze animate function and display fireball
    if (crashDetect == true) {
       ctx.drawImage(playerImg, player.x - 10, player.y - 35, 100, 100);
      return; 
    } 
    player.draw();

     
    window.requestAnimationFrame(()=>{this.animate()});
  }
}; // end of game object


//instantiate the game 
const game = new Game();

// assigning the start menu to a variable
const menu = document.getElementById("menu")

// hide the canvas while displaying start menu
canvas.style.display = 'none'

// on player click, hide the start menu, display the canvas, and run the game
menu.addEventListener('click', () => {
  console.log('click on')
  menu.style.display = 'none';
  canvas.style.display = '';
  game.start();
});
  






























