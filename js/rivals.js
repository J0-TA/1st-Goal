class Rival {
    constructor(ctx, posX, posY, playerX, playerY) {
        this.ctx = ctx;
        this.size = 2.2;
        this.width = 110 * this.size/2;
        this.height = 120 * this.size/2;


        this.image = new Image();
        this.image.src = "./img/rivalsSprite.png";

        this.posX = posX
        this.posY = posY
        
        this.animate(game.framesCounter);
        this.image.frames = 7;
        this.image.framesIndex = 0;

        this.velX = 1.8
        this.velY = 0.7

        this.strenght = 2;
        this.playerX = playerX;
        this.playerY = playerY;
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



    animate(framesCounter) {
        if (framesCounter % 12 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex > this.image.frames - 1) {
            this.image.framesIndex = 0;
        }
    }
}

class DefensiveLine extends Rival {
    constructor (ctx, posX, posY, playerX, playerY) {
        super(ctx, posX, posY, playerX, playerY)
        this.ctx = ctx;
        this.size = 2.5;
        this.width = 110 * this.size/2;
        this.height = 120 * this.size/2;


        this.image = new Image();
        this.image.src = "./img/rivalsSprite.png";

        this.posX = posX
        this.posY = posY
        
        this.animate(game.framesCounter);
        this.image.frames = 7;
        this.image.framesIndex = 0;

        this.velX = 1.2
        this.velY = 0.5

        this.strenght = 5;
        this.playerX = playerX;
        this.playerY = playerY;  
    }
} 
class DefensiveBack extends Rival {
    constructor (ctx, posX, posY, playerX, playerY) {
        super(ctx, posX, posY, playerX, playerY)
        this.ctx = ctx;
        this.size = 1.8;
        this.width = 110 * this.size/2;
        this.height = 120 * this.size/2;


        this.image = new Image();
        this.image.src = "./img/rivalsSprite.png";

        this.posX = posX
        this.posY = posY
        
        this.animate(game.framesCounter);
        this.image.frames = 7;
        this.image.framesIndex = 0;

        this.velX = 2
        this.velY = 1

        this.strenght = 1;
        this.playerX = playerX;
        this.playerY = playerY;  
    }
} 