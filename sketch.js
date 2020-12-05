var sam 
var count = 0
var health = 10
var samhealth = 100
var PLAY = 1
var END = 0
var gamestate = PLAY
var restart

function preload(){
bgimage = loadImage("images/Game-Battle-Backgrounds3 (1).jpg")
bulletimage = loadImage("images/bullet.png")
robotbullet = loadImage("images/robotbullet.png")
restartimage = loadImage("images/quick_restart.png")

}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

restart = createSprite(displayWidth/2, displayHeight/2+50)
restart.visible = false
restart.addImage(restartimage)
restart.scale = 0.2
rbulletsGroup = new Group()
  
  sam = createSprite(displayWidth-100, displayHeight/2,20,50)
  sam.shapeColor = "blue"

  robot = createSprite(displayWidth/4-200, displayHeight/2,20,50)
  robot.shapeColor = "red"

  ground = createSprite( displayWidth/2,displayHeight-160,displayWidth,50)
  ground1 = createSprite(displayWidth/2,displayHeight/4,displayWidth,50)

  ground.visible = false;
  ground1.visible = false;

  bulletsGroup = new Group()
  healthGroup = new Group()
  
}



function draw(){

 background(bgimage) 
 
if(gamestate === PLAY){


if(keyDown("W") ) {
sam.y = sam.y-10
}
if(keyDown("S") ) {
sam.y = sam.y+10

}

if(keyDown ("r")){
  count = 0
}

//if(frameCount%50 === 0){
 //robot.velocityY = random(-3,3)
//}

//health()

robot.bounceOff(ground)
robot.bounceOff(ground1)

sam.bounceOff(ground)
sam.bounceOff(ground1)

if(frameCount%100===0){

var ran = Math.round(random(1,6))
//-5,5,3,-3,10,-10
switch(ran){
case 1:robot.velocityY = -5;
break;
case 2:robot.velocityY = 5;
break
case 3:robot.velocityY = 3;
break
case 4:robot.velocityY = -3;
break
case 5:robot.velocityY = 10;
break
case 6:robot.velocityY = -10;
break
default: break
}
}

if(mouseIsPressed === true){
  bullets()
  //count = count + 1
  
  
  
}
if(count >= 10){
  textSize(30)
  text ("you are out of bullets press r to reload!",displayWidth/2,displayHeight/2)
  fill("red")
  bulletsGroup.destroyEach()                                                                
}
console.log(count)

if(bulletsGroup.isTouching(robot)){
  health = health-1
}

if(rbulletsGroup.isTouching(sam)){
  samhealth = samhealth-1
}
}
if(gamestate === END){
  rbulletsGroup.destroyEach()
  bulletsGroup.destroyEach()
  //health = 0
  //samhealth = 0
  robot.velocityY = 0
  restart.visible = true
}
if(mousePressedOver(restart)){
  gamestate = PLAY
  samhealth = 100
  health = 10
  restart.visible = false
}

if(samhealth === 0 || health === 0){
  gamestate = END
  if(samhealth === 0 ){
    textSize(30)
    text ("deafeat!",displayWidth/2,displayHeight/2)
  }
  if(health === 0 ){
    textSize(30)
    text("you win!",displayWidth/2-50,displayHeight/2)
  }
}


textSize(25)
text("Health"+health,displayWidth/4-200,displayHeight/4-50)
text("Health"+samhealth,displayWidth-200,displayHeight/4-50)


robotbullets()

 drawSprites();

}

function bullets(){
if(frameCount%5===0){
var bullet = createSprite(displayWidth-100,sam.y,10,10)
bullet.shapeColor = "white"
bullet.velocityX = -16
bulletsGroup.add(bullet)
count = count + 1
bullet.addImage(bulletimage)
bullet.scale = 0.05
}

}


function robotbullets(){
  if(frameCount%25===0){
    var rbullet = createSprite(displayWidth/4-200,robot.y,10,10)
    rbullet.shapeColor = "white"
    rbullet.velocityX = 16
    //bulletsGroup.add(bullet)
    //count = count + 1
    rbullet.addImage(robotbullet)
    rbullet.scale = 0.05
    rbulletsGroup.add(rbullet)
    }




}

//function health(){
//textSize(25)
//text("Health"+health,displayWidth/4-200,displayHeight/4-50)
//healthGroup.add(health)

//}




