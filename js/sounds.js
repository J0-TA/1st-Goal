const music = new Howl({
  src: ['./sounds/Intro.m4a'],
  loop: true,
  volume: 0.3,
});
const tackleAudio = new Howl({
  src: ['./sounds/HardTackle.m4a'],
  volume: 1,
});
const powerAudio = new Howl
({src: ['./sounds/powerup.mp3'],
volume: 0.6,
});
const gameOverSound = new Howl({
  src: ['./sounds/gameover.m4a'],
  volume: 0.4,
});
const tdAudio = new Howl({
  src: ['./sounds/Touchdown.mp3'],
  volume: 0.4,
});
const jumpSound = new Howl({
  src: ['./sounds/boing.mp3'],
  volume: 0.4,
});