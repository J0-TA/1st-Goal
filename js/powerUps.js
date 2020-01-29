class PowerUp {
    constructor(ctx, posX, posY) {
      this.ctx = ctx;
      this.width = 54.5;
      this.height = 41;

      this.image = new Image();
      this.image.src = "./img/gatorade.png";
  
      this.posX = posX;
      this.posY = posY;
  
      this.velY = 1;
    }
  
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }
  
    move() {
      this.posY += this.velY;
    }
  }