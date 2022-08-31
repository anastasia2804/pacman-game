const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d')

canvas.width = '480';
canvas.height = '480';

const wallsArray = [];
const foodArray = [];
let myIntervalId;
const livesDisplay = document.querySelector('#lives');
const pointsDisplay = document.querySelector('#points');

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

class Square {
    constructor(x, y, width, height) {
        this.x = x,
        this.y = y,
        this.width = width,
        this.height = height
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
    }
}

class Food extends Square {
    constructor(x, y, width, height, offset){
        super(x,y,width,height)
        this.offset = offset;
    } 
    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x * 40 + this.offset, this.y * 40 + this.offset, this.width, this.height);
    }
}


for (let i = 0; i < layout.length; i++){
    for (let j = 0; j < layout[i].length; j++){
        if(layout[i][j] == '|'){
            wallsArray.push(new Square(j, i, 40, 40))
        } else if (layout[i][j] == '-'){
            foodArray.push(new Food(j,i, 10, 10, 15))
        }
    }
}

class Pacman {
    constructor (width, height, color, x, y){
        this.width = width,
        this.height = height,
        this.color = color,
        this.x = x,
        this.y = y
        this.livesRemaining = 3
    }

    draw(){
        ctx.beginPath()
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x * 40 + 5, this.y * 40 + 5, this.width, this.height)
        ctx.closePath()
    }
}

const pacman = new Pacman (30,30,'red', 1, 10)
livesDisplay.textContent = pacman.livesRemaining

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

    youGotCaught(){
        alert ('you got caught')
        pacman.livesRemaining--
        pacman.x = 1
        pacman.y = 10
        this.x = 6
        this.y = 6
        livesDisplay.textContent = pacman.livesRemaining
    }

    move () {
        switch (this.currentDirection) {
            case 'down':
                if (pacman.x == this.x && pacman.y == this.y+1){
                    alert ('you got caught')
                    pacman.livesRemaining--
                    pacman.x = 1
                    pacman.y = 10
                    this.x = 6
                    this.y = 6
                    livesDisplay.textContent = pacman.livesRemaining
                    break;
                }

                if (this.movesRemaining > 0 && layout[this.y + 1][this.x] != '|'){
                    this.y += 1;
                    this.movesRemaining--
                } else {
                    this.chooseDirection();
                    this.chooseMovesRemaining();
                }
                break;

            case 'up':
                if (pacman.x == this.x && pacman.y == this.y-1){
                    alert ('you got caught')
                    pacman.livesRemaining--
                    pacman.x = 1
                    pacman.y = 10
                    this.x = 6
                    this.y = 6
                    livesDisplay.textContent = pacman.livesRemaining
                    break;
                }

                if(this.movesRemaining > 0 && layout[this.y - 1][this.x] != '|'){
                    this.y -= 1;
                    this.movesRemaining--
                } else {
                    this.chooseDirection();
                    this.chooseMovesRemaining();
                }
                break;

            case 'left':
                if (pacman.x == this.x-1 && pacman.y == this.y){
                    alert ('you got caught')
                    pacman.livesRemaining--
                    pacman.x = 1
                    pacman.y = 10
                    this.x = 6
                    this.y = 6
                    livesDisplay.textContent = pacman.livesRemaining
                    break;
                }

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
                if (pacman.x == this.x+1 && pacman.y == this.y){
                    alert ('you got caught')
                    pacman.livesRemaining--
                    pacman.x = 1
                    pacman.y = 10
                    this.x = 6
                    this.y = 6
                    livesDisplay.textContent = pacman.livesRemaining
                    break;
                }

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
        if (pacman.livesRemaining <= 0){
            clearInterval(myIntervalId)
            canvas.style.display = 'none';
            document.querySelector('.game-over').style.display = 'block'
        }
    }
  }

const ghost = new Ghost (30,30,'pink', 6, 6)
// const ghost1 = new Ghost (30,30,'pink', 1, 1)

function win(){
        clearInterval(myIntervalId)
        ctx.clearRect(0,0, canvas.width, canvas.height)
        for (let i = 0; i < wallsArray.length; i++) {
            wallsArray[i].draw()
        }
        for (let i = 0; i < foodArray.length; i++) {
            foodArray[i].draw()
        }
        pacman.draw()
        ghost.draw()
        console.log(window, this)
        //setInterval(() => window.alert('congratulations! you win!'), 1000)
        canvas.style.display = 'none';
        document.querySelector('.winnerwinnerchickendinner').style.display = 'block'
}

let points  = 0;
pointsDisplay.textContent = points;

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        if(layout[pacman.y - 1][pacman.x] != '|'){
            pacman.y -= 1;
            
            if(pacman.x == ghost.x && pacman.y == ghost.y-1){
                alert ('you got caught')
            }

            let foundIndex = foodArray.findIndex(food => food.x == pacman.x && food.y == pacman.y)
            if(foundIndex != -1){
                foodArray.splice(foundIndex, 1)
                points ++
                pointsDisplay.textContent = points
            }
            if(foodArray.length == 0){
                win()
            }
        }
        break;
      case 40: // down arrow
      if(layout[pacman.y + 1][pacman.x] != '|'){
        pacman.y += 1;

        if(pacman.x == ghost.x && pacman.y == ghost.y+1){
            alert ('you got caught')
        }

        let foundIndex = foodArray.findIndex(food => food.x == pacman.x && food.y == pacman.y)
            if(foundIndex != -1){
                foodArray.splice(foundIndex, 1)
                points ++
                pointsDisplay.textContent = points
            }
            if(foodArray.length == 0){
                win()
              }
        }
        break;
      case 37: // left arrow
      if(layout[pacman.y][pacman.x - 1] != '|'){
        pacman.x -= 1;

        if(pacman.x == ghost.x-1 && pacman.y == ghost.y){
            alert ('you got caught')
        }

        let foundIndex = foodArray.findIndex(food => food.x == pacman.x && food.y == pacman.y)
            if(foundIndex != -1){
                foodArray.splice(foundIndex, 1)
                points ++
                pointsDisplay.textContent = points
            }
            if(foodArray.length == 0){
                win()
              }
         }
        break;
      case 39: // right arrow
      if(layout[pacman.y][pacman.x + 1] != '|'){
        pacman.x += 1;

        if(pacman.x == ghost.x+1 && pacman.y == ghost.y){
            alert ('you got caught')
        }

        let foundIndex = foodArray.findIndex(food => food.x == pacman.x && food.y == pacman.y)
            if(foundIndex != -1){
                foodArray.splice(foundIndex, 1)
                points ++
                pointsDisplay.textContent = points
            }
            if(foodArray.length == 0){
                win()
              }
        }
        break;
    }
  });



let myFrames = 0;
myIntervalId = setInterval(() =>{
    myFrames++
    if(myFrames % 10 == 0){
        ghost.move()
        // ghost1.move()
    }
    ctx.clearRect(0,0, canvas.width, canvas.height)
    for (let i = 0; i < wallsArray.length; i++) {
        wallsArray[i].draw()
    }
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].draw()
    }
    pacman.draw()
    ghost.draw()
    // ghost1.draw()
   
}, 20)



  


