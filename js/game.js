const game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  rivals: [],
  score: 0,
  keys: {
    arrowUp: false,
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false,
    action: false,
    jumpLeft: false,
    jumpright: false,
    a: false,
    d: false
  },

  init() {
    this.canvas = document.getElementById("Board");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    scoreboard.init(this.ctx);
    this.start();
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }
      this.framesCounter++;
      this.clear();
      this.drawAll();
      this.moveAll();
      this.gameOver();
      this.touchdown();
      this.tackles();
      this.score += 0.1;
      this.drawScore();
    }, 1000 / this.FPS);
  },

  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.querySelector('main').style.display = "none";
  },

  drawAll() {
    this.background.draw();
    this.player.draw();
    this.rivals.forEach(rival => rival.draw());
    this.drawStamine();
  },

  moveAll() {
    this.background.move();
    this.player.move();
    this.rivals.forEach(rival => {
      if (rival.posY < this.player.posY) {
        rival.posY += rival.velY*4
      }
      if (rival.posY > this.player.posY) {
        rival.posY -= rival.velY*0.8
      }
      if (rival.posX < this.player.posX) {
        rival.posX += rival.velX
      }
      if (rival.posX > this.player.posX) {
        rival.posX -= rival.velX
      }
      });
  },

  reset() {
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx, this.keys);
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 500)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 500)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 500)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 500)))
    this.rivals.push(new Rival (this.ctx, randomInt(120, 1200), randomInt(- 1000, - 1600)))
    this.rivals.push(new Rival (this.ctx, randomInt(120, 1200), randomInt(- 1000, - 1600)))
    this.rivals.push(new Rival (this.ctx, randomInt(120, 1200), randomInt(- 1000, - 1600)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 1800, - 2200)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 1800, - 2200)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 1800, - 2200)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 1800, - 2200)))
  },

  tackles() {
    this.rivals.some(rival => {
    if(this.player.posX < rival.posX + rival.width  && 
      this.player.posX + this.player.width  > rival.posX &&
      this.player.posY < rival.posY + rival.height && 
      this.player.posY + this.player.height > rival.posY) {
        this.player.stamina -= rival.strenght
      }
    })
  },
  
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  gameOver() {
    if (this.player.stamina <= 0){
    clearInterval(this.interval);
    this.canvas.style.opacity = `0`;
    document.querySelector(`#gameover`).style.display = `flex`;
    document.querySelector(`#gameover`).style.opacity = `1`;
    document.querySelector(`#gameover h3`).innerHTML = `You're score was ${Math.floor(this.score)}.`
  }
  },

  touchdown (){
    if (this.player.posY < 90 && this.background.posY >= 0){
    clearInterval(this.interval);
    this.canvas.style.opacity = `0`;
    document.querySelector(`#touchdown`).style.display = `flex`;
    document.querySelector(`#touchdown`).style.opacity = `1`;
    document.querySelector(`#touchdown h3`).innerHTML = `You're score was ${Math.floor(this.score)}.`
    // APLICAR SONIDO TOUCHDOWN
  }
  },

  drawScore() {
    scoreboard.update(this.score);
  },
  drawStamine(){
  this.ctx.fillText(`Stamina`, 1050, 50);
  this.ctx.fillStyle="#1AACD7";
  this.ctx.fillRect(game.width-200,25,(this.player.stamina/1500)*150,25);
  this.ctx.strokeStyle = "black";
  this.ctx.lineWidth = 2;
  this.ctx.strokeRect(game.width-200,25,(this.player.stamina/1500)*150,25)
  }
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);