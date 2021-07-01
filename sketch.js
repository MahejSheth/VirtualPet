//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;


function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
   database = firebase.database();
	createCanvas(500, 500);

  dog = createSprite(250,300,150,150);
  dog.addImage("dog", dogImg);
  dog.scale = 0.2;

foodStock=database.ref('Food');
foodStock.on("value", readStock);
}


function draw() {  

  background(46, 139, 87);
  drawSprites();
  //add styles here

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happyDogImg);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//function to read values from DB
function readStock(data){
  foodS = data.val();
}

//function to read values from DB
function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


