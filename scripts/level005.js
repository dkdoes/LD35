
var level005State = {
    
    create: function() {
        
        startLevel([50000,10000],[25000,500]);
        

        var blah = game.add.text(0,0,'Thanks for playing!',
                                         {font: '60px Courier',align: 'center',fill:'#FFFFFF',stroke:'#000000',strokeThickness:6,fontWeight:'bold'});
        blah.x = game.world.width/2-(blah.width/2);
        blah.y = 1000;
        spawnDudes(dudes,1,[750,750],[25000,25000,3000,3000],true);
        spawnDudes(dudes,299,[1,600],[1,50000,1000,2000]); 
        //var blergh = platforms.create(0,2000,'platformH');
        //blergh.scale.x = 10;
        
        
        attractor = game.add.sprite(game.world.width/2,game.world.height-2000,'phone');
        attractor.anchor.set(0.5);
        attractor.scale.set(0.75);
        
        platforms.setAll('body.immovable', true);
        
    },
    
    update: function() {
        physicsAI();
        playerControls();
    }
}