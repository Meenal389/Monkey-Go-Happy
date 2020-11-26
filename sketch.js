var monkey , monkey_running,MONKEYCOLLIDE;
var banana ,bananaImage
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var sun,sunimage;
var grass,grassimage,grassi;
var score=0;
var score2=0;
var invisible;
var play=0;
var end=1;
var gameState=play;
let bg;
var jump,collect;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  MONKEYCOLLIDE=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  sunimage=loadImage("sun.png");
  grassimage=loadImage("g4.png");
  
  bg=loadSound("bg.mp3");
 collect=loadSound("collect.wav");
  jump=loadSound("jump.wav");
}



function setup() {
  createCanvas(550,300);

  //monkey
  monkey=createSprite(50,240);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.addAnimation("MONKEYCOLLIDE",MONKEYCOLLIDE);
  monkey.scale=0.11;
  
  //ground 
  ground=createSprite(300,275,600,10);
  ground.addImage("ground",grassimage);
  ground.scale=0.6;
  
  //invisible ground
  invisible= createSprite(275,290,550,10);
  invisible.visible=false;
  
  //sun
  sun=createSprite(450,55);
  sun.addImage("sunimage",sunimage);
  sun.scale=0.4;
  
  //groups
  obstacleGroup=new Group();
  FoodGroup=new Group();
  
  bg.loop();
}


function draw() {

  background("lightblue");
  drawSprites()
  edges= createEdgeSprites();
  
  //survival time display
  fill("black");
  textSize(15);
  text("Survival Time:"+ score +" sec",20,50)
  
   fill("black");
  textSize(15);
  text("Score:"+ score2 ,20,70)
  
  if(gameState===play){
    
    score=Math.ceil(frameCount/frameRate());
    
    //making the monkey jump
    if(keyDown("space") && monkey.y>=234.3){
      monkey.velocityY=-16;
      jump.play();
      
    }
    
  //to give gravity to monkey
  monkey.velocityY+=0.9;
  
  //velocity of ground
  ground.velocityX=-(5+score/50);
  
  //reset the ground
  if(ground.x<150){
    ground.x=400;
  }
    
  //calling the obstacles
  obstacles()
    
    //calling the bananas
    bananas()
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score2++;
      collect.play();
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=end;
    }
    
    if(gameState===end){
      obstacleGroup.setVelocityXEach(0);
      ground.velocityX=0;
      monkey.velocityY=0;
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      FoodGroup.setVelocityXEach(0);
      monkey.changeAnimation("MONKEYCOLLIDE");
    }
    
  }
  
  monkey.collide(invisible);
  //console.log(monkey.y)
  
}

//obstacles
function obstacles(){
  var r=Math.round(random(80,100))
  if(frameCount% 200===0 ){
    obstacle=createSprite(550,260);
    obstacle.velocityX=-6;
   obstacle.addImage("obstacleImage",obstacleImage);
 obstacle.scale=0.13;
    obstacle.lifetime=130;
     //obstacle.debug=true;
    obstacle.setCollider("circle",0,0,150);
    obstacleGroup.add(obstacle);
     ground.depth=obstacle.depth+1;
}
}

//bananas
function bananas(){
  var r=Math.round(random(80,100))
  if(frameCount% 80===0 ){
    banana=createSprite(550,random(100,260));
    banana.velocityX=-5;
   banana.addImage("bananaImage",bananaImage);
 banana.scale=0.09;
    banana.lifetime=130;
   // banana.debug=true;
    FoodGroup.add(banana);
}
}




