const scoreboard = {
    ctx: undefined,
  
    init(ctx) {
      this.ctx = ctx;
      this.ctx.font = "50px Verdana";
    },
  
    update(score) {
      this.ctx.fillStyle = "black";
      this.ctx.fillText(`Score: ${Math.floor(score)}`, 50, 50);
    }
  };