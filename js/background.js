const background = {
    ctx = ctx,
    width = game.width,
    height = game.height,
    posX = 0,
    posY = 0,
    
    // velY = 5,
    
    draw = function () {
        ctx.fillStyle = forestgreen;
        ctx.fillRect(this.PosX, this.posY, this.width, this.height);
    }
  
    // move() {
    //   this.posY += this.velY;
    // }
}