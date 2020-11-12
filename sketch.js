var canvas;
var gameState=0;
var playerCount;
var database;
var form, player, game;
var allPlayers;
var car1, car2, car3, car4;
var cars;

var c1Img, c2Img, c3Img, c4Img;

var trackImg, groundImg;

function preload()
{
    c1Img= loadImage("car1.png");
    c2Img= loadImage("car2.png");
    c3Img= loadImage("car3.png");
    c4Img= loadImage("car4.png");

    trackImg= loadImage("track.jpg");
    groundImg= loadImage("ground.png");
}

function setup()
{
    canvas=createCanvas(displayWidth-20, displayHeight-30);
    database=firebase.database();
    
    game = new Game();
    game.getState();
    game.start();

}

function draw()
{
    if(playerCount === 4)
    {
        game.update(1);
    }
    
    if(gameState === 1)
    {
        clear();
        game.play()    
    }

    if(gameState === 2)
    {
        game.end();
    }
}