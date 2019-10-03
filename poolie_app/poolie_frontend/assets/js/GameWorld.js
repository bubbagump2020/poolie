const DELTA = 1 / 180;

function GameWorld() {
  this.balls = [
    [new Vector2(1022, 413), COLOR.YELLOW],
    [new Vector2(1056, 392), COLOR.YELLOW],
    [new Vector2(1056, 433), COLOR.RED],
    [new Vector2(1090, 374), COLOR.RED],
    [new Vector2(1090, 413), COLOR.BLACK],
    [new Vector2(1090, 452), COLOR.YELLOW],
    [new Vector2(1126, 354), COLOR.YELLOW],
    [new Vector2(1126, 393), COLOR.RED],
    [new Vector2(1126, 433), COLOR.YELLOW],
    [new Vector2(1126, 472), COLOR.RED],
    [new Vector2(1162, 335), COLOR.RED],
    [new Vector2(1162, 374), COLOR.RED],
    [new Vector2(1162, 413), COLOR.YELLOW],
    [new Vector2(1162, 452), COLOR.RED],
    [new Vector2(1162, 491), COLOR.YELLOW],
    [new Vector2(413, 413), COLOR.WHITE]
  ].map(params => new Ball(params[0], params[1]));

  this.cueBall = this.balls[this.balls.length - 1];
  this.stick = new Stick(
    new Vector2(413, 413),
    this.cueBall.shoot.bind(this.cueBall)
  );
  this.table = {
    TopY: 57,
    RightX: 1443,
    BottomY: 768,
    LeftX: 57
  };
}

GameWorld.prototype.handleCollisions = function() {
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].pocketed();
    this.balls[i].collideWith(this.table);
    for (let j = i + 1; j < this.balls.length; j++) {
      const firstBall = this.balls[i];
      const secondBall = this.balls[j];
      firstBall.collideWith(secondBall);
    }
  }
};

GameWorld.prototype.update = function() {
  this.handleCollisions();
  this.stick.update();
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].update(DELTA);
  }
  if (!this.ballsMoving() && this.stick.shot) {
    this.stick.reposition(this.cueBall.position);
    console.log(ballPocketed);
    turn.switchTurn();
  }
};

GameWorld.prototype.draw = function() {
  Canvas.drawImage(sprites.background, { x: 0, y: 0 });
  for (let i = 0; i < this.balls.length; i++) {
    this.balls[i].draw();
  }
  this.stick.draw();
};

GameWorld.prototype.ballsMoving = function() {
  let ballsMoving = false;

  for (let i = 0; i < this.balls.length; i++) {
    if (this.balls[i].moving) {
      ballsMoving = true;
      break;
    }
  }
  return ballsMoving;
};
