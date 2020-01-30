class Player {
    constructor(ctx, keys) {
        this.ctx = ctx;
        this.width = 130;
        this.height = 143;

        this.image = new Image();
        this.image.src = "./img/playerSprite.png";

        this.posX = game.width / 2 - this.width / 2;
        this.posY = game.height - 200;
        
        this.animate(game.framesCounter);
        this.image.frames = 7;
        this.image.framesIndex = 0;

        this.keys = keys;
        this.velX = 2.5;
        this.velY = 1;
        
        this.setListeners();

        this.stamina = 1000;
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        );

        this.animate(game.framesCounter);
    }

    move() {
        if (game.keys.arrowLeft === true && this.posX > 120){
            this.posX -= this.velX;
        } if (game.keys.arrowRight === true && this.posX < 1200){
            this.posX += this.velX;
        } if (game.keys.arrowUp === true){
            this.posY -= this.velY *2; 
            this.stamina -= 4
        } if (game.keys.arrowDown === true && this.posY < game.height - 200){
            this.posY += this.velY * 3;
            if (this.stamina > 1000){ this.stamina += 0.5}
        } this.posY -= 0.5
        this.stamina -= 0.3
        if (this.posY < 50) {this.posY = 50;
       } 
    }

    animate(framesCounter) {
        if (framesCounter % 12 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }
    jumpLeft(){
      this.posX -= 80
      this.stamina -= 50
      const jumpSound = new Howl({
        src: ['sounds/boing.mp3'],
        volume: 0.4,
        autoplay: true
      });
    }

    jumpRight(){
      this.posX += 80
      this.stamina -= 50
      const jumpSound = new Howl({
        src: ['sounds/boing.mp3'],
        volume: 0.4,
        autoplay: true
      });
    }

    setListeners() {
        document.addEventListener("keydown", e => {
          e.preventDefault();
          if (e.keyCode === 37) {
            this.keys.arrowLeft = true;
          }
          if (e.keyCode === 39) {
            this.keys.arrowRight = true;
          }
        });
        document.addEventListener("keyup", e => {
          e.preventDefault();
          if (e.keyCode === 37) {
            this.keys.arrowLeft = false;
          }
          if (e.keyCode === 39) {
            this.keys.arrowRight = false;
          }
        });
        document.addEventListener("keydown", e => {
          e.preventDefault();
          if (e.keyCode === 38) {
            this.keys.arrowUp = true;
          }
          if (e.keyCode === 40) {
            this.keys.arrowDown = true;
          }
        });
        document.addEventListener("keyup", e => {
          e.preventDefault();
          if (e.keyCode === 38) {
            this.keys.arrowUp = false;
          }
          if (e.keyCode === 40) {
            this.keys.arrowDown = false;
          }
        });
        document.addEventListener("keydown", e => {
          e.preventDefault();
          if (e.keyCode === 65) {
            this.keys.a = true;
            this.jumpLeft();
          }
        });
        document.addEventListener("keyup", e => {
          e.preventDefault();
          if (e.keyCode === 65) {
            this.keys.a = false;
          }
        });
        document.addEventListener("keydown", e => {
          e.preventDefault();
          if (e.keyCode === 68) {
            this.keys.d = true;
            this.jumpRight();
          }
        });
        document.addEventListener("keyup", e => {
          e.preventDefault();
          if (e.keyCode === 68) {
            this.keys.d = false;
          }
        });
    }
}