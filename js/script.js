window.onload = () => {
    document.body.onkeyup = function(e){
        if(e.keyCode === 32){
            game.init();
        }
    }
}