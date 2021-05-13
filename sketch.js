var dog,dogimg,happydogimg;
var database;
var food,foodref,foodcount;
var count="Loading...";
var feedfood, addfood;
var currentTime, lastFed;

//var gamestate;

function preload()
{
  dogimg=loadImage("Images/Dog1.png");
  happydogimg=loadImage("Images/Dog2.png");
}

function setup() {
  createCanvas( displayWidth, displayHeight);
  
  feedfood=createButton("FEED FOOD")
  feedfood.position(displayWidth/2-100,100)
  feedfood.mousePressed(feedFood)

  addfood=createButton("ADD FOOD")
  addfood.position(displayWidth/2+100,100)
  addfood.mousePressed(addFood)
  
  database=firebase.database();

  food=new Food();
 // gamestate=new Gamestate();

  dog=createSprite( displayWidth/2, displayHeight/2+100, 20, 20);
  dog.addImage(dogimg);
  dog.scale=0.3;

}

function draw() { 

  background("yellow");
 
  var countRef=database.ref("food/food");
    countRef.on("value",function(data){
    count=data.val();
  });

  getLastFed();
  

  textSize(30);
  fill("red")
  text("Milk Left : "+count,displayWidth/2-50,displayHeight/2-30);

drawSprites();

}

function feedFood(){
  
  if(count > 0){
    count=count-1
  }
  
  food.foodCount();
  food.updatefood(count);
  getCurrentTime();

  
}

function addFood(){
  count=count+1
  food.foodCount();
  food.updatefood(count);
}

async function getCurrentTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13)-12;
  console.log(hour)
  
  database.ref("lastfed").set({
    lastFed : hour
   }) 

}

async function getLastFed(){
  var timeRef=database.ref("lastfed/lastFed");
    timeRef.on("value",function(data){
    time=data.val();
    text(time,200,200)
  });

  


}
