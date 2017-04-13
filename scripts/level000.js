
var level000State = {
    
    create: function() {
        
        startLevel([1280,800],[900,20]);
        
        
        var blah = game.add.text(0,0,'Use the arrow keys\nto reach the dollar',{font: '60px Courier',align: 'center',fill:'#FFFFFF',stroke:'#000000',strokeThickness:6,fontWeight:'bold'});
                                        
                                    
        blah.x = game.world.width/2-(blah.width/2);
        blah.y = game.world.height/2-(blah.height/2);
        
        spawnDudes(dudes,1,[750,750],[100,100,700,700],true);
        platforms.setAll('body.immovable', true);
    },
    
    update: function() {
        physicsAI();
        playerControls();
}
    
}