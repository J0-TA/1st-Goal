class Player {
    constructor(ctx, keys) {
      this.ctx = ctx;
  
      this.width = 80;
      this.height = 110;
  
      this.image = new Image();
      this.image.src = "./img/playersSprite.png";
  
      this.posX = game.width/2 - this.width/2;
      this.posY = game.height - 200;

      this.image.frames = 7.6;
      this.image.framesIndex = 0;
  
      this.keys = keys;
      this.vel = 1;
      this.animate(game.framesCounter);
    }
  
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
  }