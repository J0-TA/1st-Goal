const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    rivals: [],
    keys: {
      arrowUp:false,
      arrowDown:false,
      arrowLeft:false,
      arrowRight:false,
      action:false,
      jumpLeft:false,
      jumpright:false
    },
  
    init() {
      this.canvas = document.getElementById("Board");
      this.ctx = this.canvas.getContext("2d");
      this.setDimensions();
      this.start();
    },
  
    start() {
      this.reset();
      this.interval = setInterval(() => {
        if (this.framesCounter > 5000) {
          this.framesCounter = 0;
        }
        this.framesCounter++;
        this.clear();
        this.drawAll();
        this.moveAll();
      }, 1000 / this.FPS);
    },
  
    setDimensions() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      document.querySelector('main').style.zIndex = "0";
    },
  
    drawAll() {
      this.background.draw();
      this.player.draw();
      this.rivals.forEach(rival => rival.draw())
    },
  
    moveAll() {
      this.background.move();
      this.player.move();
      this.rivals.forEach(rival => {
      rival.posY += rival.velY
      if (rival.posX < this.player.posX){
      rival.posX += rival.velX
      } 
      if (rival.posX > this.player.posX){
          rival.posX -= rival.velX
      }
      });
    },
  
    reset() {
      this.background = new Background(this.ctx);
      this.player = new Player(this.ctx, this.keys);
      this.rivals.push(new Rival (this.ctx, this.width/2 + 50, 0),new Rival (this.ctx, this.width/2 - 50, 0));
    },
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    // gameOver() {
    //   clearInterval(this.interval);
    // },
    // touchdown (){

    // }
  };