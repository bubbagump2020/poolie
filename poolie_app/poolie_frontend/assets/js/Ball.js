const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER/2;

function Ball(position, color) {
  this.position = position;
  this.velocity = new Vector2();
  this.moving = false;
  this.sprite = getBallSpriteByColor(color);
}

Ball.prototype.update = function(delta) {
  this.position.addTo(this.velocity.mult(delta));
  // friction, baby
  this.velocity = this.velocity.mult(0.985);
  if (this.velocity.length() < 5) {
    this.velocity = new Vector2();
    this.moving = false;
  }
};

Ball.prototype.draw = function() {
  Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
};

Ball.prototype.shoot = function(power, rotation) {
  this.velocity = new Vector2(
    power * Math.cos(rotation),
    power * Math.sin(rotation)
  );
  this.moving = true;
};

Ball.prototype.collideWithBall = function(ball){

    // finding a normalish vector -- I'm no mathematician
  const normalVector = this.position.subtract(ball.position);
  //   console.log("normal vectors!")

  // find distance
  const dist = normalVector.length();

  if (dist > BALL_DIAMETER) {
    return;
  }

  // determine minimum translation distance
  const minimumDistance = normalVector.mult((BALL_DIAMETER - dist) / dist);

  // maintain distance between balls
  this.position = this.position.add(minimumDistance.mult(1/2));
  ball.position = ball.position.subtract(minimumDistance.mult(1/2));

  // finding "unit normal vector"
  const unitNormal = normalVector.mult(1 / normalVector.length());

  // finding "unit tangent vector"
  const unitTangent = new Vector2(-unitNormal.y, unitNormal.x);

  // apply velocities to unit normal and unit tangent vectors
  const velocityOneNormal = unitNormal.dot(this.velocity);
  const velocityOneTangent = unitTangent.dot(this.velocity);
  const velocityTwoNormal = unitNormal.dot(ball.velocity);
  const velocityTwoTangent = unitTangent.dot(ball.velocity);

  // determine the new normal velocities
  let velocityOneNormalTag = velocityTwoNormal;
  let velocityTwoNormalTag = velocityOneNormal;

  // convert scalar normal and tangential velocities into vectors

  velocityOneNormalTag = unitNormal.mult(velocityOneNormalTag);
  const velocityOneTangentTag = unitTangent.mult(velocityOneTangent);
  velocityTwoNormalTag = unitNormal.mult(velocityTwoNormalTag);
  const velocityTwoTangentTag = unitTangent.mult(velocityTwoTangent);

  // update velocities
  this.velocity = velocityOneNormalTag.add(velocityOneTangentTag);
  ball.velocity = velocityTwoNormalTag.add(velocityTwoTangentTag);

  this.moving = true;
  ball.moving = true;

}

Ball.prototype.collideWithTable = function(table){
    if(!this.moving){
        return;
    }
    let collided = false;

    if(this.position.y <= table.TopY + BALL_RADIUS){
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }
    if(this.position.x >= table.RightX - BALL_RADIUS){
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }
    if(this.position.y >= table.BottomY - BALL_RADIUS){
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }
    if(this.position.x <= table.LeftX + BALL_RADIUS){
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }
}

Ball.prototype.collideWith = function(object) {
 if(object instanceof Ball){
    this.collideWithBall(object);
 } else {
     this.collideWithTable(object);
 }
};
