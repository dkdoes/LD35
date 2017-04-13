
var level002State = {
    
    create: function() {
        
        startLevel([1280,1600],[900,20]);
        
        var blah = game.add.text(0,0,'Stretch characters\nand stack them on top\nof each other',
                                         {font: '60px Courier',align: 'center',fill:'#FFFFFF',stroke:'#000000',strokeThickness:6,fontWeight:'bold'});
        blah.x = game.world.width/2-(blah.width/2);
        blah.y = game.world.height/4*3-(blah.height/2);
        
        spawnDudes(dudes,1,[750,750],[100,100,0,0],true);
        spawnDudes(dudes,6,[600,900],[0,600,1200,1200]); 
        temp = platforms.create(game.world.width/2,0,'platformV');
        temp.anchor.set(0.5,0);
        temp.height = game.world.height-300;
        temp.width = 100;
        temp = platforms.create(0,300,'platformH');
        platforms.setAll('body.immovable', true);
    },
    
    update: function() {
        physicsAI();
        playerControls();
}
    
}