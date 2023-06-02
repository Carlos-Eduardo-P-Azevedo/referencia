var cloud,cloudmg;
var trex, trex_running, trexdie, trexdieImg, edges;
var groundImage;
var ground;
var invisibleground;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var parede;
var obstacleGroup, cloudGroup;
var restart, restartImg, gameover, gameoverImg;
var pular, morrer, checkpoint;
var pontos = 0;
var pulo = 1;

var play = 1;
var end = 0;
var gamestate = play;

var aluno;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudmg = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameoverImg = loadImage("gameOver.png");
  trexdieImg = loadAnimation("trex_collided.png");

  pular = loadSound("jump.mp3");
  morrer = loadSound("die.mp3");
  checkpoint = loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  

  //criando o trex
  trex = createSprite(width-50,200,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("die",trexdieImg);
  edges = createEdgeSprites();
  
  trex.debug = false;
  ground = createSprite(width/2, height/2, width, 10);
  ground.addImage(groundImage);

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  invisibleground = createSprite(width/2,height/2+5,width,10);
  invisibleground.visible = false;

  obstacleGroup = new Group();
  cloudGroup = new Group();

  restart = createSprite(300,150);
  restart.addImage(restartImg);

  gameover = createSprite(300,50);
  gameover.addImage(gameoverImg);

  restart.visible = false;
  gameover.visible = false;

  trex.setCollider("rectangle",0,0,300,trex.height);
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  
  

  if(gamestate === play){
   if(pontos > 1){
    ground.velocityX = -6;
   }

   pontos = pontos + 1;

   if(pontos > 0 && pontos % 100 == 0){
   checkpoint.play();
   }

   restart.visible = false;
   gameover.visible = false;
  
   text("pontuação: " + pontos, width/2+200, 50);

   text("pulo: " + pulo, width/2, height/2 - 300);
  
   //pular quando tecla de espaço for pressionada
   if(touches.length > 0 || keyDown("space") && (pulo == 1)){
    pulo = pulo - 1;
    trex.velocityY = -10;
    pular.play();
    touches = [];
   }
   if(trex.isTouching(invisibleground)){
    pulo = 1;
   }


   //comando que deixa o solo infinito
   if(ground.x < 0){
    ground.x = ground.width/2;
   }

   trex.velocityY = trex.velocityY + 0.5;

   if(pontos > 500){
    obstacleGroup.setVelocityXEach(-8);
    cloudGroup.setVelocityXEach(-5);
    ground.velocityX = -8;
   }
   if(pontos > 1000){
    obstacleGroup.setVelocityXEach(-9);
    cloudGroup.setVelocityXEach(-6);
    ground.velocityX = -10;
   }
   if(pontos > 1500){
    obstacleGroup.setVelocityXEach(-10);
    cloudGroup.setVelocityXEach(-7);
    ground.velocityX = -10;
   }
   if(pontos > 2000){
    obstacleGroup.setVelocityXEach(-11);
    cloudGroup.setVelocityXEach(-8);
    ground.velocityX = -11;
   }
   if(pontos > 2500){
    obstacleGroup.setVelocityXEach(-12);
    cloudGroup.setVelocityXEach(-9);
    ground.velocityX = -12;
   }

   createclouds();
   createobstacles();

   if(obstacleGroup.isTouching(trex)){
    //gamestate = end;
    //morrer.play();
  }


   }else if(gamestate == end){

   ground.velocityX = 0;
   cloudGroup.setVelocityXEach(0);
   obstacleGroup.setVelocityXEach(0);

   obstacleGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);

   trex.velocityY = 0;

   restart.visible = true;
   gameover.visible = true;

   trex.changeAnimation("die",trexdieImg);

   if(mousePressedOver(restart)){
    gamestate = play;
    obstacleGroup.setLifetimeEach(0);
    cloudGroup.setLifetimeEach(0);
    pontos = 0;
    trex.changeAnimation("running", trex_running);
   }
   }
  
  
  
 //impedir que o trex caia
  trex.collide(invisibleground);

  drawSprites();
}
function createclouds(){
  if(frameCount % 60 === 0){
  cloud = createSprite(width,height/2,30,20);
  cloud.addImage(cloudmg);
  cloud.scale = 0.6;
  cloud.velocityX = -3;
  cloud.lifetime = 480;
  cloud.y = Math.round(random(height/2-100,height/2-150));
  trex.depth = 1;
  cloud.depth = trex.depth;
  trex.depth = trex.depth+1;

  cloudGroup.add(cloud); 
  }
}
function createobstacles(){
  if(frameCount % 60 === 0){
  obstacle = createSprite(width,height/2-15,10,40);
  obstacle.velocityX = -6;
  obstacle.scale = 0.5;
  obstacle.lifetime = 280;
  

  obstacleGroup.add(obstacle);

  var cactos = Math.round(random(1,6));

  switch(cactos){
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;
    default: break;
  }
  }
}