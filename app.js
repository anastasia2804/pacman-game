const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d')

canvas.width = '600';
canvas.height = '600';

class Square {
    constructor(x, y, width, height) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const wallsArray = [];
const dotsArray = [];

const layout = [
    ['|','|','|','|','|','|','|','|','|','|','|','|'],
    ['|','-','-','-','-','-','-','|','-','-','-','|'],
    ['|','-','|','-','|','-','|','|','|','|','-','|'],
    ['|','-','|','-','-','-','-','-','-','|','-','|'],
    ['|','-','|','-','|','-','|','|','-','-','-','|'],
    ['|','-','-','-','|','-','-','|','-','|','-','|'],
    ['|','-','|','-','|','-','-','|','-','-','-','|'],
    ['|','-','|','-','|','|','|','|','-','|','-','|'],
    ['|','-','|','-','-','-','-','-','-','|','-','|'],
    ['|','-','|','|','|','|','-','|','|','|','-','|'],
    ['|','1','-','-','-','-','-','|','-','-','-','|'],
    ['|','|','|','|','|','|','|','|','|','|','|','|'],
]

for (let i = 0; i < layout.length; i++){
    for (let j = 0; j < layout[i].length; j++){
        if(layout[i][j] == '|'){
        wallsArray.push(new Square(40 * j, 40 * i, 40, 40))
    } else if (layout[i][j] == '-'){
        dotsArray.push(new Square(40 * j + 15, 40 * i + 15, 10, 10))
    }
}
}

// for (let i = 0; i < wallsArray.length; i++) {
//             wallsArray[i].draw()
//         }

// for (let i = 0; i < dotsArray.length; i++) {
//             dotsArray[i].draw()
//         }

class Pacman {
    constructor (width, height, color, x, y){
        this.width = width,
        this.height = height,
        this.color = color,
        this.x = x,
        this.y = y
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x * 40 + 5, this.y * 40 + 5, this.width, this.height)
        ctx.closePath()
    }

    // update () {
    //     this.draw()
    //     this.x += this.speedX
    //     this.y +=this.speedY
    //   }
}

const pacman = new Pacman (30,30,'red', 1, 10)

// pacman.draw()

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        if(layout[pacman.y - 1][pacman.x] != '|'){
            pacman.y -= 1;
        }
        break;
      case 40: // down arrow
      if(layout[pacman.y + 1][pacman.x] != '|'){
        pacman.y += 1;
    }
        break;
      case 37: // left arrow
      if(layout[pacman.y][pacman.x - 1] != '|'){
        pacman.x -= 1;
    }
        break;
      case 39: // right arrow
      if(layout[pacman.y][pacman.x + 1] != '|'){
        pacman.x += 1;
      }
        break;
    }
  });
  

  class Ghost {
    constructor (width, height, color, x, y){
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.currentDirection = 'down';
        this.movesRemaining = 4;
    }

    chooseDirection(){
        let directions = ['up', 'down', 'left', 'right']
        this.currentDirection = directions[Math.floor(Math.random() * directions.length)]
    }

    chooseMovesRemaining(){
        this.movesRemaining = Math.floor(Math.random() * 10 + 1)
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = 'pink'
        ctx.fillRect(this.x * 40 + 5, this.y * 40 + 5, this.width, this.height)
        ctx.closePath()
    }

    move () {
        switch (this.currentDirection) {
            case 'down':
                if(this.movesRemaining > 0 && layout[this.y + 1][this.x] != '|'){
                    this.y += 1;
                    this.movesRemaining--
                } else {
                    this.chooseDirection();
                    this.chooseMovesRemaining();
                }
                break;
            case 'up':
                if(this.movesRemaining > 0 && layout[this.y - 1][this.x] != '|'){
                    this.y -= 1;
                    this.movesRemaining--
                } else {
                    this.chooseDirection();
                    this.chooseMovesRemaining();
                }
                //this.y -= 1;
                break;
            case 'left':
                if(this.movesRemaining > 0 && layout[this.y][this.x - 1] != '|'){
                    this.x -= 1;
                    this.movesRemaining--
                } else {
                    this.chooseDirection();
                    this.chooseMovesRemaining();
                }
                //this.x -= 1;
                break;
            case 'right':
                if(this.movesRemaining > 0 && layout[this.y][this.x + 1] != '|'){
                    this.x += 1;
                    this.movesRemaining--
                } else {
                    this.chooseDirection();
                    this.chooseMovesRemaining();
                }
                //this.x += 1;
                break;
        }
    }
  }

const ghost = new Ghost (30,30,'pink', 6, 6)
// const ghost1 = new Ghost (30,30,'pink', 1, 1)

function collisionDetectorGhostMoves () {
    if (pacman.x == ghost.x+1 && pacman.x == ghost.y && ghost.currentDirection == 'left'){
        alert ('you got caught')
    }

}

// ghost.draw()
let myFrames = 0;
setInterval(() =>{
    myFrames++
    if(myFrames % 10 == 0){
        ghost.move()
        // ghost1.move()
    }
    ctx.clearRect(0,0, canvas.width, canvas.height)
    for (let i = 0; i < wallsArray.length; i++) {
        wallsArray[i].draw()
    }
    for (let i = 0; i < dotsArray.length; i++) {
        dotsArray[i].draw()
    }
    pacman.draw()
    ghost.draw()
    // ghost1.draw()
}, 20)

  


