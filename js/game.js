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
    staminaBar.init(this.ctx)
    music.play();
    this.start();
    },
  start() {
    this.reset();
    document.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.keyCode === 83) {
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
    this.drawScore();
    this.drawStamine();
  },
  moveAll() {
    this.background.move();
    this.player.move();
    this.powerUps.forEach(obs => obs.move());
    this.rivals.forEach(rival => {
      if (rival.posY < this.player.posY) {
        rival.posY += rival.velY * 4.6
      }
      if (rival.posY > this.player.posY) {
        rival.posY -= rival.velY * 1.1
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
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(100, -200)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(100, -200)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(100, -200)))
    this.rivals.push(new DefensiveLine(this.ctx, randomInt(120, 1200), randomInt(100, -200)))
    this.rivals.push(new Rival(this.ctx, randomInt(120, 1200), randomInt(-1500, -2300)))
    this.rivals.push(new Rival(this.ctx, randomInt(120, 1200), randomInt(-1500, -2300)))
    this.rivals.push(new Rival(this.ctx, randomInt(120, 1200), randomInt(-1500, -2300)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-2500, -4000)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-2500, -4000)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-2500, -4000)))
    this.rivals.push(new DefensiveBack(this.ctx, randomInt(120, 1200), randomInt(-2500, -4000)))
  },
  tackles() {
    this.rivals.some(rival => {
      if (this.player.posX < rival.posX + 30 &&
        this.player.posX + 30 > rival.posX &&
        this.player.posY < rival.posY + 30 &&
        this.player.posY + 50 > rival.posY) {
        this.player.stamina -= rival.strenght;
      }
    })
  },
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  generatePowerUps() {
    if (this.framesCounter % 200 == 0) {
      this.powerUps.push(new PowerUp(this.ctx, randomInt(120, 1200), this.player.posY - randomInt(15, 100)));
    }
  },
  getPowerUp() {
    this.powerUps.some(powerUp => {
      if (this.player.posX < powerUp.posX + 30 &&
        this.player.posX + 80 > powerUp.posX &&
        this.player.posY < powerUp.posY + 30 &&
        this.player.posY + 80 > powerUp.posY) {
        if (this.stamina > 900) {this.player.stamina = 1000}
        else {this.player.stamina += 100};
        this.powerUps.splice(powerUp, 1)
        powerAudio.play();
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
      document.querySelector(`.tryagain`).addEventListener("click", function () {document.location.reload(true)});
      gameOverSound.play();
      tackleAudio.play();
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
      document.querySelector(`.repeat`).addEventListener("click", function () {document.location.reload(true)});
      tdAudio.play();
    }
  },
  drawScore() {
    scoreboard.update(this.score);
  },
  drawStamine() {
    staminaBar.update(this.player.stamina)
  }
};
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);