class Player
{
    constructor()
    {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = 0;
    }

    getCount()
    {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",(data)=>{playerCount=data.val();});

    }
   
    updateCount(count)
    {
        database.ref('/').update({playerCount:count});
    }

    update()
    {
        var playerIndex="players/player"+this.index; 
        console.log(this.index);
        database.ref(playerIndex).set({
            name:this.name,
            distance:this.distance,
            rank :this.rank
        });
    }

    static getPlayerInfo()
    {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value",(data)=>{
            allPlayers=data.val()
        })
    }

    deleteAllPlayers()
    {
        var playersRef = database.ref('players');
        playersRef.remove();
    }

    getCarsAtEnd()
    {
        var carsAtTheEndRef = database.ref('CarsAtEnd');
        carsAtTheEndRef.on("value",(data)=>{
            this.rank=data.val()})
    }
    
    static updateCarsAtEnd(rank)
    {
        database.ref('/').update({CarsAtEnd:rank})
    }
};