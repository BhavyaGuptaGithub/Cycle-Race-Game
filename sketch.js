// creating variables
var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var gameOver, restart;

// creating game states
var END =0;
var PLAY =1;
var gameState = PLAY;

// initializing the distance
var distance=0;

function preload(){
  //loading image of the path
  pathImg = loadImage("images/Road.png");

  // loading animation of main racer
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");

  // loading animation of opponent pink racer
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");

  // loading animation of opponent yellow racer
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  // loading animation of opponent red racer
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  // loading sound of ringing bell
  cycleBell = loadSound("sound/bell.mp3");

  // loading gameover image
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
  createCanvas(1200,300);
  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;

  //setting collider for mainCyclist
  mainCyclist.setCollider("circle",0,0,500);

  //creating game over sprite
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;  

  //adding group
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();

}

function draw() {

  // adding background
  background(0);
  
  // drawing Sprites
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);

  if(gameState===PLAY){

    // making the distance increase
    distance = distance + Math.round(getFrameRate()/50);

    // giving velocity to the path
    path.velocityX = -(6 + 2*distance/150);

    // making the mainCyclist move with the mouse pointer
    mainCyclist.y = World.mouseY;
    
    // creting sprite edges
    edges= createEdgeSprites();
    
    // making the main cyclist collide with the edges
    mainCyclist .collide(edges);
    
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
    //code to play cycle bell sound
    if(keyDown("space")) {
      cycleBell.play();
    }
    
    //creating continous opponent players
    var select_oppPlayer = Math.round(random(1,3));

    // making the oppenents randomly apper after frame count 150
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) {
        yellowCyclists();
      } else {
        redCyclists();
    }
  }
  
  // when pink cyclist will touch the main cyclist then the game state changes from play state to end state
  if(pinkCG.isTouching(mainCyclist)){
    gameState = END;
    player1.velocityY = 0;
    player1.addAnimation("opponentPlayer1",oppPink2Img);
  }
  
  // when yellow cyclist will touch the main cyclist then the game state changes from play state to end state
  if(yellowCG.isTouching(mainCyclist)){
    gameState = END;
    player2.velocityY = 0;
    player2.addAnimation("opponentPlayer2",oppYellow2Img);
  }
  
  // when red cyclist will touch the main cyclist then the game state changes from play state to end state
  if(redCG.isTouching(mainCyclist)){
    gameState = END;
    player3.velocityY = 0;
    player3.addAnimation("opponentPlayer3",oppRed2Img);
  }
    
  }else if (gameState === END) {

    //making the game over sprite visible
    gameOver.visible = true;

    //displaying the message of restarting the game
    text("Press R to Restart the game!",520,200);

    // making the velocity of the path 0
    path.velocityX = 0;

    // making the velocity of the main cyclist 0 and changing its animation
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);

    // making the pink cyclist velocity 0
    pinkCG.setVelocityXEach(0);
    // setting the lifetime of the pink cyclist to -1 so that it does not destroy after some time
    pinkCG.setLifetimeEach(-1);

    // making the yellow cyclist velocity 0
    yellowCG.setVelocityXEach(0);
    // setting the lifetime of the yellow cyclist to -1 so that it does not destroy after some time
    yellowCG.setLifetimeEach(-1);

    // making the red cyclist velocity 0
    redCG.setVelocityXEach(0);
    // setting the lifetime of the red cyclist to -1 so that it does not destroy after some time
    redCG.setLifetimeEach(-1);

    // calling the function reset when R key is pressed
    if(keyDown("r")) {
      reset();
    }
  }
}
// creating pink cyclist
function pinkCyclists(){
  player1 =createSprite(1100,Math.round(random(50, 250)));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
  player1.addAnimation("opponentPlayer1",oppPink1Img);
  player1.setLifetime=170;
  pinkCG.add(player1);
}

// creating yellow cyclist
function yellowCyclists(){
  player2 =createSprite(1100,Math.round(random(50, 250)));
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2",oppYellow1Img);
  player2.setLifetime=170;
  yellowCG.add(player2);
}

// craeting red cyclist
function redCyclists(){
  player3 =createSprite(1100,Math.round(random(50, 250)));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",oppRed1Img);
  player3.setLifetime=170;
  redCG.add(player3);
}

//creating reset function here
function reset(){
  gameState = PLAY
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  redCG.destroyEach();
  yellowCG.destroyEach();
  pinkCG.destroyEach();
  
  distance = 0; 
}
