class Game
{
    constructor()
    {

    }

    getState()
    {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){gameState=data.val();});

    }
   
    update(state)
    {
        database.ref('/').update({gameState:state});
    }

    async start()
    {
        if(gameState === 0)
        {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists())
            {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
            console.log("Game has started");
        }

        car1 = createSprite(100,200);
        car2 = createSprite(300,200);
        car3 = createSprite(700,200);
        car4 = createSprite(900,200);
        
        car1.addImage("car1", c1Img);
        car2.addImage("car2", c2Img);
        car3.addImage("car3", c3Img);
        car4.addImage("car4", c4Img);

        cars = [car1,car2,car3,car4];
    }

    play()
    {
        form.hide();
        textSize(30);
        text("Game Start", 120, 100);
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        if(allPlayers !== undefined)
        {
            background(groundImg);

            image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
            
            var index=0;
            var x=260;
            var y;

            var display_position = 130;
            for(var plr in allPlayers)
            {
                index=index+1;
                x=x+250;
                y=displayHeight-allPlayers[plr].distance;

                cars[index-1].x = x;
                cars[index-1].y = y;

                if(index === player.index)
                {
                    stroke(10);
                    fill("red");
                    ellipse(x,y,100,100);
                    cars[index-1].shapeColor = "red";

                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
              /*  if (plr === "player" + player.index)
                fill("red") 
                else
                fill("black")

                display_position+=20;
                textSize(15);

                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)*/
            }

        }

        if(keyIsDown(UP_ARROW) && player.index !== null)
        {
            player.distance+= 50;
            player.update();
        }

        if(player.distance> 5100)
        {
            gameState = 2;
            player.rank = player.rank + 1;
            Player.updateCarsAtEnd(player.rank);
        }

        drawSprites();
    }

    end()
    {
        camera.position.x = 0;
        camera.position.y = 0;
        imageMode(CENTER);
        Player.getPlayerInfo();
        console.log("game end")
        fill("red");
        textAlign(CENTER);
        textSize(50);
        console.log("inside end")
        for(var plr in allPlayers)
        {
            if(allPlayers[plr].rank === 1)
            {
                text("1st :  "+allPlayers[plr].name,0,85);
            }
            else if(allPlayers[plr].rank === 2)
            {
                
                    text("2nd: " + allPlayers[plr].name, displayWidth/4, displayHeight/9 + 73);
                
            }
            else if(allPlayers[plr].rank === 3)
            {
                    text("3rd: " + allPlayers[plr].name, displayWidth/-4, displayHeight/10 + 76);
            }
        }
    }
}

