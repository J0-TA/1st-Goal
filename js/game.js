const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    rivals: [],
    // keys: {
    // },
  
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
        // this.moveAll();
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
      background.draw();
    },
  
    // moveAll() {
    //   this.background.move();
    // },
  
    reset() {
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