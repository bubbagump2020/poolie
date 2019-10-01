const BALL_ORIGIN = new Vector2(25, 25);

function Ball(position) {
  this.position = position;
  this.velocity = new Vector2();
}

Ball.prototype.update = function(delta) {
  this.position.addTo(this.velocity);
//   this.velocity = this.velocity.mult(0.98);
};

Ball.prototype.draw = function() {
  Canvas.drawImage(sprites.cueBall, this.position, BALL_ORIGIN);
};

Ball.prototype.shoot = function(power, rotation) {
  console.log("shoot your shot friend");
  this.velocity = new Vector2(Math.cos(rotation), Math.sin(rotation));
};
