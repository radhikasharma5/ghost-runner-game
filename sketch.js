var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;   
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var gameState="PLAY";
var sound

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  sound =loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  sound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background("black");
  if(gameState==="PLAY"){
    if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  if(keyDown("Left_Arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("Right_Arrow")){
    ghost.x=ghost.x+3;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  spawnDoor();
  
  drawSprites();
  }
  if(gameState==="END"){
    fill("yellow");
    text("gameOver",230,250);
  }
}

function spawnDoor(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    
    climber = createSprite(200,0);
    climber.addImage(climberImage);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
    
    door.velocityY=1;
    door.x=Math.round(random(120,400));
    
    climber.x=door.x;
    invisibleBlock.x=climber.x;
    climber.velocityY=1;
    climber.lifetime=700;
    climberGroup.add(climber);
    
    door.lifetime=700;
    ghost.depth=door.depth;
    ghost.depth++;
    doorGroup.add(door);
  }
}