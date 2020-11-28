
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var jungle, jungleimage;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungleimage=loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(600,400);
    score=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.visible=false;
  
  jungle=createSprite(0,0,800,400);
  jungle.addImage(jungleimage);
  jungle.scale=1.5;
  jungle.velocityX=-4;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

 
  
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(jungle.x<100){
    jungle.x=jungle.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
  }
  
  switch(score){
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18;
      break;
      default:break;  
  }
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
    
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.08;
    
  }  
 
  drawSprites();
  
  textSize(20);
  fill("white");
  
  text("Score: "+ score,500,50);
}



function spawnFood() {
  
   if (frameCount % 80 === 0) {
     banana = createSprite(600,250,40,10);
     banana.y = random(120,200);    
     banana.velocityX = -5;
    
     //assign lifetime to the variable
     banana.lifetime = 300;
     monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
     FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}
