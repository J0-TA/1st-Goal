class Player {
    constructor(ctx, keys) {
      this.ctx = ctx;
  
      this.width = 130;
      this.height = 143;
  
      this.image = new Image();
      this.image.src = "./img/playerSprite.png";
  
      this.posX = game.width/2 - this.width/2;
      this.posY = game.height - 200;

      this.image.frames = 7;
      this.image.framesIndex = 0;
  
      this.keys = keys;
      this.vel = 1;
      this.animate(game.framesCounter);
      
      this.setListeners();
    }
    moveRight() {
        this.posX += 20;
      }

    moveLeft() {
        this.posX -= 20;
      };
    
    draw(framesCounter) {
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
  
    animate(framesCounter) {
      if (framesCounter % 11 == 0) {
        this.image.framesIndex++;
      }
      if (this.image.framesIndex > this.image.frames - 1) {
        this.image.framesIndex = 0;
      }
    }

    setListeners() {
        document.addEventListener("keydown", e => {
          switch (e.keyCode) {
            case this.keys.LEFT:
              this.moveLeft
              break;
            case this.keys.RIGHT:
                this.moveRight
              console.log("DERECHA!");;
              break;
          }
        });
    }
}