const game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  rivals: [],
  powerUps: [],
  score: 0,
  isPaused: false,
  pause: undefined,
  keys: {
    arrowUp: false,
    arrowDown: false,
    arrowLeft: false,
    arrowRight: false,
    action: false,
    jumpLeft: false,
    jumpright: false,
    a: false,
    d: false,
    s: false
  },

  init() {
    this.canvas = document.getElementById("Board");
    this.ctx = this.canvas.getContext("2d");
    this.pause = document.querySelector(`#pause`)

    this.setDimensions();
    scoreboard.init(this.ctx);
    // let intro = new Sound (intro, `../sounds/Intro.m4a`)
    // intro.play()
    this.start();
    //iniciar audio juego
  },

  start() {
    this.reset();
    document.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.keyCode === 83) {
        // debugger
        this.keys.s = true;
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
          this.pause.style.display = `flex`
          this.pause.style.opacity = `1`
          this.pause.style.zIndex = `100`
        } else {
          this.pause.style.display = `none`
          this.pause.style.opacity = `0`
          this.pause.style.zIndex = `-100`
        }
      }
    });
    document.addEventListener("keyup", e => {
      e.preventDefault();
      if (e.keyCode === 83) {
        this.keys.s = false;
      }
    });
    this.interval = setInterval(() => {
      if (!this.isPaused) {
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
        this.generatePowerUps();
        this.getPowerUp()
        this.score += 0.1;
        this.drawScore();
      }

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
    this.powerUps.forEach(obs => obs.draw());
    this.player.draw();
    this.rivals.forEach(rival => rival.draw());
    this.drawStamine();
  },

  moveAll() {
    this.background.move();
    this.player.move();
    this.powerUps.forEach(obs => obs.move());
    this.rivals.forEach(rival => {
      if (rival.posY < this.player.posY) {
        rival.posY += rival.velY * 4.5
      }
      if (rival.posY > this.player.posY) {
        rival.posY -= rival.velY * 0.6
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
    this.powerUps = [];
    this.player = new Player(this.ctx, this.keys);
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(50, -200)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(50, -200)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(50, -200)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(50, -200)))
    this.rivals.push(new Rival(this.ctx, randomInt(120, 1200), randomInt(-1000, -1600)))
    this.rivals.push(new Rival(this.ctx, randomInt(120, 1200), randomInt(-1000, -1600)))
    this.rivals.push(new Rival(this.ctx, randomInt(120, 1200), randomInt(-1000, -1600)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-1800, -2200)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-1800, -2200)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-1800, -2200)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-1800, -2200)))
  },

  tackles() {
    this.rivals.some(rival => {
      if (this.player.posX < rival.posX + rival.width &&
        this.player.posX + this.player.width > rival.posX &&
        this.player.posY < rival.posY + rival.height &&
        this.player.posY + this.player.height > rival.posY) {
        this.player.stamina -= rival.strenght
        // APlicar sonido tackle
      }
    })
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  generatePowerUps() {
    if (this.framesCounter % 150 == 0) {
      this.powerUps.push(new PowerUp(this.ctx, randomInt(120, 1200), this.player.posY - randomInt(15, 100)));
    }
    console.log(this.powerUps)
  },

  getPowerUp() {
    this.powerUps.some(powerUp => {
      if (this.player.posX < powerUp.posX + powerUp.width &&
        this.player.posX + this.player.width > powerUp.posX &&
        this.player.posY < powerUp.posY + powerUp.height &&
        this.player.posY + this.player.height > powerUp.posY) {
        this.player.stamina += 30;
        this.powerUps.splice(powerUp, 1)
        // APlicar sonido powerup
      }
    })
  },

  gameOver() {
    if (this.player.stamina <= 0) {
      clearInterval(this.interval);
      this.canvas.style.opacity = `0`;
      this.canvas.style.display = `none`;
      document.querySelector(`#gameover`).style.display = `flex`;
      document.querySelector(`#gameover`).style.opacity = `1`;
      document.querySelector(`#gameover h3`).innerHTML = `You're score was ${Math.floor(this.score)}.`
      document.querySelector(`.tryagain`).addEventListener("click", function () {
        document.location.reload(true)
      });
      // Aplicar sonido Gameover
    }
  },

  touchdown() {
    if (this.player.posY < 90 && this.background.posY >= 0) {
      clearInterval(this.interval);
      this.canvas.style.opacity = `0`;
      this.canvas.style.display = `none`;
      document.querySelector(`#touchdown`).style.display = `flex`;
      document.querySelector(`#touchdown`).style.opacity = `1`;
      document.querySelector(`#touchdown h3`).innerHTML = `You're score was ${Math.floor(this.score + this.player.stamina)}.`
      document.querySelector(`.repeat`).addEventListener("click", function () {
        document.location.reload(true)
      });
    }
    // APLICAR SONIDO TOUCHDOWN

  },

  drawScore() {
    scoreboard.update(this.score);
  },
  drawStamine() {
    this.ctx.fillText(`Stamina`, game.width - 400, 50);
    this.ctx.fillStyle = "#1AACD7";
    this.ctx.fillRect(game.width - 200, 25, (this.player.stamina / 1500) * 150, 25);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(game.width - 200, 25, (this.player.stamina / 1500) * 150, 25)
  }
};

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);