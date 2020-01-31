function gameStart(e) {
    if(e.keyCode === 32){
        window.removeEventListener("keyup", gameStart)
        game.init();
    }
}
window.onload = () => {
    window.addEventListener("keyup", gameStart)
}