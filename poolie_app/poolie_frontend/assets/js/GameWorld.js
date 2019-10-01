const DELTA = 1/100;

function GameWorld() {
  this.cueBall = new Ball(new Vector2(413, 413));
  this.stick = new Stick(new Vector2(413, 413), this.cueBall.shoot.bind(this.cueBall));
}

GameWorld.prototype.udpate = function() {
  this.stick.update();
  this.cueBall.update();
};

GameWorld.prototype.draw = function() {
  Canvas.drawImage(sprites.background, { x: 0, y: 0 });
  this.stick.draw();
  this.cueBall.draw();
};
