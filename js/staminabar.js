const staminaBar = {
    ctx: undefined,  
    fillcolor: undefined,
    init(ctx) {
      this.ctx = ctx;
      this.ctx.font = "40px Verdana";
    },
      update(){
            if (game.player.stamina > 660){
                this.ctx.fillStyle = `#62BC0D` // verde
            } else if (game.player.stamina > 330){
                this.ctx.fillStyle = `#F4C516`; // amarillo
            } else this.ctx.fillStyle = `#C32E06`; //rojo
            console.log(game.player.stamina)
        this.ctx.fillRect(game.width - 400, 40, (game.player.stamina / 1000) * 300, 40);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(game.width - 400, 40, 300, 40)
        this.ctx.fillStyle = "black";
        this.ctx.fillText(`Stamina`, game.width - 330, 75);
    }
}