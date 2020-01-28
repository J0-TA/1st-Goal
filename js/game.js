const game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  rivals: [],
  keys: {
    arrowUp: false,
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false,
    action: false,
    jumpLeft: false,
    jumpright: false
  },

  init() {
    this.canvas = document.getElementById("Board");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
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
    }, 1000 / this.FPS);
  },

  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.querySelector('main').style.zIndex = "0";
  },

  drawAll() {
    this.background.draw();
    this.player.draw();
    this.rivals.forEach(rival => rival.draw())
  },

  moveAll() {
    this.background.move();
    this.player.move();
    this.rivals.forEach(rival => {
      if (rival.posY < this.player.posY) {
        rival.posY += rival.velY*3
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
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 150)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 150)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 150)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(0, - 150)))
    this.rivals.push(new Rival (this.ctx, randomInt(120, 1200), randomInt(- 1000, - 2000)))
    this.rivals.push(new Rival (this.ctx, randomInt(120, 1200), randomInt(- 1000, - 2000)))
    this.rivals.push(new Rival (this.ctx, randomInt(120, 1200), randomInt(- 1000, - 2000)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 2000, - 3000)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 2000, - 3000)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 2000, - 3000)))
    this.rivals.push(new DefensiveBack (this.ctx, randomInt(120, 1200), randomInt(- 2000, - 3000)))
  },
  
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  // gameOver() {
  //   clearInterval(this.interval);
  // },
  // touchdown (){

  // }
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);