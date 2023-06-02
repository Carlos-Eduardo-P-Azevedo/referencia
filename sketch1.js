var cara,caraimg;
var caramorto,caramortoimg;
var mamaco,mamacoimg;
var som_de_morte;
var musica_de_fundo;
var chao;
var bloco;
var bloco1;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4;
var obstacleGroup;

var play = 1;
var end = 0;
var gamestate = play;

function preload(){
caraimg = loadImage("cara.png");
mamacoimg = loadImage("macaco.jpg");
caramortoimg = loadImage("caramorto.png");
som_de_morte = loadSound("sompeido.mp3");
musica_de_fundo = loadSound("homemmacaco.mp3");
obstacle1 = loadImage("amogus.gif");
obstacle2 = loadImage("grama1.jpg");
obstacle3 = loadImage("gigachad.jpg");
obstacle4 = loadImage("cara_falando.gif");
}

function setup() {
 createCanvas(700,400);

 cara = createSprite(250,320);
 cara.addImage(caraimg);
 cara.scale = 1.3;
 cara.debug = false;
 cara.setCollider("rectangle",-3,5,30,80);
 
 mamaco = createSprite(75,290);
 mamaco.addImage(mamacoimg);
 mamaco.scale = 0.8;

 chao = createSprite(350,390,700,20);
 chao.shapeColor = "red";

 bloco = createSprite(250,375,20,5);
 bloco.visible = false;

 obstacleGroup = new Group();

 musica_de_fundo.play();
}

function draw() {
  background(17,0,18);

  if(gamestate === play){
  createobstacles();

  cara.velocityY = cara.velocityY + 0.5;
  cara.collide(chao);

  if(keyDown("space") && cara.isTouching(bloco)){
    cara.velocityY = -11;
  }

  if(obstacleGroup.isTouching(cara)){
    gamestate = end;
    som_de_morte.play();
    musica_de_fundo.stop();
  }

  } else if(gamestate == end){
  obstacleGroup.setVelocityXEach(0);
  mamaco.destroy();
  cara.destroy();
  obstacleGroup.setLifetimeEach(-1);

  mamaco = createSprite(210,315);
  mamaco.addImage(mamacoimg);
  mamaco.scale = 0.6;

  caramorto = createSprite(250,330);
  caramorto.addImage(caramortoimg);
  caramorto.scale = 1.5;

  fill("white");
  textSize(20);
  text("Aperte espaço pra recomeçar",200,200);

  if(keyDown("space")){
    gamestate = play;
    obstacleGroup.setLifetimeEach(0);
    musica_de_fundo.play();
    mamaco.destroy();
    mamaco = createSprite(75,290);
    mamaco.addImage(mamacoimg);
    mamaco.scale = 0.8;
    cara = createSprite(250,320);
    cara.addImage(caraimg);
    cara.scale = 1.3;
    cara.debug = false;
    cara.setCollider("rectangle",-3,5,30,80);
   }
  }
  drawSprites();
}

function createobstacles(){
  if(frameCount % 80 === 0){
  obstacle = createSprite(715,335);
  obstacle.velocityX = -6;
  obstacle.lifetime = 280;
  

  obstacleGroup.add(obstacle);

  var cactos = Math.round(random(1,4));

  switch(cactos){
    case 1: obstacle.addImage(obstacle1);
    obstacle.scale = 0.13;
    break;
    case 2: obstacle.addImage(obstacle2);
    obstacle.scale = 0.33;
    break;
    case 3: obstacle.addImage(obstacle3);
    obstacle.scale = 0.33;
    break;
    case 4: obstacle.addImage(obstacle4);
    obstacle.scale = 0.37;
    break;
    default: break;
  }
  }
}