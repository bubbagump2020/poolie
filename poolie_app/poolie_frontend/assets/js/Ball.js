const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;
let scratched = false;
let p1BallCount = 0;
let p2BallCount = 0;

function Ball(position, color) {
  this.position = position;
  this.velocity = new Vector2();
  this.moving = false;
  this.sprite = getBallSpriteByColor(color);
  this.visible = true;
  this.color = color;
  this.inPocket = false;
}

Ball.prototype.update = function(delta, color) {
  if (!this.visible || this.inPocket) {
    return;
  }
  if (color === 4) {
    this.position.x = Mouse.position.x;
    this.position.y = Mouse.position.y;
    //   return;
  }
  this.position.addTo(this.velocity.mult(delta));
  // friction, baby
  this.velocity = this.velocity.mult(0.985);
  if (this.velocity.length() < 5) {
    this.velocity = new Vector2();
    this.moving = false;
  }
};

Ball.prototype.draw = function() {
  if (!this.visible) {
    return;
  }
  Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
};

Ball.prototype.shoot = function(power, rotation) {
  this.velocity = new Vector2(
    power * Math.cos(rotation),
    power * Math.sin(rotation)
  );
  this.moving = true;
};

Ball.prototype.collideWithBall = function(ball) {
  if (!this.visible || !ball.visible) {
    return;
  }

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
  this.position = this.position.add(minimumDistance.mult(1 / 2));
  ball.position = ball.position.subtract(minimumDistance.mult(1 / 2));

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
};

Ball.prototype.pocketed = function() {
  if (!this.visible) {
    return;
  }
  let inPocket = CONSTANTS.pockets.some(pocket => {
    return this.position.distFrom(pocket) < CONSTANTS.pocketRadius;
  });

  if (!inPocket) {
    return;
  }

  if (this.color === 1) {
    p1BallCount++;
    document.getElementById("p1Score").innerText = `Player 1: ${p1BallCount}`;
  }

  if (this.color === 2) {
    p2BallCount++;
    document.getElementById("p2Score").innerText = `Player 2: ${p2BallCount}`;
  }

  if (this.color === 3) {
    if(p1BallCount < 7 && p2BallCount < 7){
      alert("Game Over!")
      loadAssets(PoolGame.start)
      // console.log('game over :(');
    };
    if(p1BallCount === 7){
      alert('player 1 WINS');
      loadAssets(PoolGame.start)
    }
    if(p2BallCount === 7){
      alert('player 2 WINS');
      loadAssets(PoolGame.start)
    }
  }

  if (this.color === 4) {
    scratched = true;
    this.inPocket = true;
    this.scratch(this);
    return;
  }

  this.visible = false;
  this.moving = false;
};

Ball.prototype.collideWithTable = function(table) {
  if (!this.moving || !this.visible) {
    return;
  }
  let collided = false;

  if (this.position.y <= table.TopY + BALL_RADIUS) {
    this.position.y = table.TopY + BALL_RADIUS;
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if (this.position.x >= table.RightX - BALL_RADIUS) {
    this.position.x = table.RightX - BALL_RADIUS;
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }
  if (this.position.y >= table.BottomY - BALL_RADIUS) {
    this.position.y = table.BottomY - BALL_RADIUS;
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
  }
  if (this.position.x <= table.LeftX + BALL_RADIUS) {
    this.position.x = table.LeftX + BALL_RADIUS;
    this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
    collided = true;
  }
  if (collided) {
    this.velocity = this.velocity.mult(0.98);
  }
};

Ball.prototype.collideWith = function(object) {
  if (object instanceof Ball) {
    this.collideWithBall(object);
  } else {
    this.collideWithTable(object);
  }
};

Ball.prototype.scratch = function(ball) {
  const scratchInterval = setInterval(function() {
    ball.position = Mouse.position;
  }, 1000);

  function addListener() {
    if (
      ball.position.x > 413 ||
      ball.position.x < PoolGame.gameWorld.table.LeftX + BALL_RADIUS ||
      ball.position.y > PoolGame.gameWorld.table.BottomY - BALL_RADIUS ||
      ball.position.y < PoolGame.gameWorld.table.TopY + BALL_RADIUS
    ) {
      console.log("can't place it here");
    } else {
      clearInterval(scratchInterval);
      console.log("clicked");
      ball.position = Mouse.position;
      scratched = false;
      ball.inPocket = false;
      ball.velocity = new Vector2();
      ball.moving = false;
      PoolGame.gameWorld.stick.power = 0;
      PoolGame.gameWorld.stick.update();
      document.removeEventListener("click", addListener);
    }
  }
  document.addEventListener("click", addListener);
};
