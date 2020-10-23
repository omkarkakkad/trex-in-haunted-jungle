var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;

var ghost,ghost_running,ghostGroup;

var coin,coin_Image,coinGroup;

var trex,trex_running,trex_collided;

var bg,bg_Image;
var ground;

var obstacle,obstacle_Image;
var obstacleGroup;

var gameOver,gameOver_Image;
var restart,restart_Image;

var bg_Sound;
var obstacleTouching_Sound,jump_Sound;
var coin_Sound;

function preload(){
  
  trex_running =   loadAnimation("trex_1.png","trex_2.png","trex_3.png");
  
  trex_collided = loadAnimation("trex_collided.png");
  
  bg_Image = loadImage("horror-forest-background-for-photoshop-thumb38.jpg");
  
  coin_Image = loadImage("coin.png");
  
  ghost_running = loadAnimation("download (1).png","download (2).png");
  
  obstacle_Image = loadImage("obstacle1.png");

  gameOver_Image = loadImage("gameOver.png");
  restart_Image = loadImage("restart.png"); 
  
  obstacleTouching_Sound = loadSound("obstacle sound.mp3");
  bg_Sound = loadSound("spooky.wav");
  jump_Sound = loadSound("jump.mp3");
  coin_Sound = loadSound("coin sound.mp3")
}

function setup() {
  createCanvas(700,600);
  
  bg = createSprite(0,0,700,600);
  bg.addImage(bg_Image);
  bg.scale=1.8;
  bg.velocityX=-6;
  bg_Sound.play();
  
  ground = createSprite(350,525,700,30);
  ground.shapeColor = "black";
  ground.velocityX=-(6 + 3*score/100);
  
  trex = createSprite(150,475,20,20);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.11;
  
  gameOver = createSprite(350,150,5,5);
  gameOver.scale=1.3;
  gameOver.addImage(gameOver_Image);
  
  restart = createSprite(350,300,5,5);
  restart.scale=0.2;
  restart.addImage(restart_Image);
  
  score=0;
  
  obstacleGroup = new Group();
  coinGroup = new Group();
  ghostGroup = new Group();
}

function draw() {
  
  if(gameState === PLAY){
    
    gameOver.visible=false;
    restart.visible=false;
    
    ground.velocityX=-(6 + 3*score/100);
    
    if(keyDown("space") && trex.y >= 450) {
      trex.velocityY = -20;
      jump_Sound.play();
    }  
      trex.velocityY = trex.velocityY+1.3;
    
    if(trex.isTouching(coinGroup)){
      coin_Sound.play();
      coinGroup.destroyEach();
      score=score + 2;
    }
 
   if(bg.x<100){
     bg.x=bg.width/2;
    }
     ground.x = ground.width/2;
     trex.collide(ground);
    
    spawnObstacle();
    spawnCoin();
    spawnGhost();
  }
  
  if(trex.isTouching(obstacleGroup) || trex.isTouching(ghostGroup)){
    gameState = END;
  }
  
  if(gameState === END){
    gameOver.visible=true;
    restart.visible=true;
    
    trex.visible=false;
    obstacle.visible=false;
    ghostGroup.visible=false;
    coinGroup.visible=false;
    
    coinGroup.destroyEach();
    ghostGroup.destroyEach();
    
    obstacleGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    ghostGroup.setVelocityXEach(0);
    
    ground.velocityX=0;
    trex.velocityY=0;
    bg.velocityX=0;
    
    trex.changeAnimation("collided",trex_collided);
    
    if(mousePressedOver(restart)){
      reset();
    }  
  }
  
  drawSprites();
  
  textSize(40);
  fill("white");
  text("Score: "+ score, 500,50);
}

function reset(){
  gameState=PLAY;
  
  trex.visible=true;
  obstacle.visible=true;
  ghostGroup.visible=true;
  coinGroup.visible=true;
  
  bg_Sound.play();
  
  score=0;
  deaths=0;
  
  gameOver.visible=false;
  reset.visible=false;
  
  coinGroup.destroyEach();
  obstacleGroup.destroyEach();
  ghostGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  bg.velocityX=-6;
  ground.velocityX=-6;
}

function spawnObstacle(){
  if(frameCount%80 === 0){
    obstacle = createSprite(600,490,10,40);
    obstacle.scale=0.1;
    obstacle.velocityX=-10;
    obstacle.addImage(obstacle_Image); 
    obstacleGroup.add(obstacle);
  }
}

function spawnCoin(){
  if(frameCount%110 === 0){
    coin = createSprite(600,360,10,10);
    coin.addImage(coin_Image);
    coin.scale=0.1;
    coin.velocityX=-9;
    coinGroup.add(coin);
  }
}

function spawnGhost(){
  if(frameCount%210 === 0){
    ghost = createSprite(650,310,10,10);
    ghost.addAnimation("running",ghost_running);
    ghost.scale=0.8;
    ghost.velocityX=-13;
    ghostGroup.add(ghost);
  }
}