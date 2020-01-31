const scoreboard = {
  ctx: undefined,

  init(ctx) {
    this.ctx = ctx;
    this.ctx.font = "40px Verdana";
  },

  update(score) {
    this.ctx.fillStyle = "#1AACD7";
    this.ctx.fillRect(50, 40, 300, 40);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(50, 40, 300, 40)
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Score: ${Math.floor(score)}`, 90, 75);
  }
};