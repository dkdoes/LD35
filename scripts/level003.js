
var level003State = {
    
    create: function() {
        
        startLevel([2500,3500],[2200,100]);
        
        var blah = game.add.text(0,0,'You can right click\non grey characters\n to wake them',
                                         {font: '60px Courier',align: 'center',fill:'#FFFFFF',stroke:'#000000',strokeThickness:6,fontWeight:'bold'});
        blah.x = 2050-(blah.width/2);
        blah.y = 1050-(blah.height/2);
        
        spawnDudes(dudes,1,[750,750],[100,100,0,0],true);
        spawnDudes(dudes,100,[0,500],[0,2500,1250,2200]);
        platforms.setAll('body.immovable', true);
    },
    
    update: function() {
        physicsAI();
        playerControls();
}
    
}