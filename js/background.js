class Background {
    constructor(ctx) {
      this.ctx = ctx;
      this.width = 869;
      this.height = 1571;
  
      this.image = new Image();
      this.image.src = `./img/field.png`;
  
      this.posX = game.width/2 - this.width/2;
      this.posY = game.height - this.height;
  
      this.velY = 1;
    }
  
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
  
    move() {
        if (this.posY > 0) this.posY = 0
      this.posY += this.velY;
    }

  }