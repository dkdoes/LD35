
var level004State = {
    
    create: function() {
        
        startLevel([10000,5000],[9000,500]);
        

        
        spawnDudes(dudes,1,[750,750],[5,5,0,0],true);
        spawnDudes(dudes,200,[1,300],[1,10000,400,450]); 
        platforms.create(0,300,'platformH');
        platforms.setAll('body.immovable', true);
    },
    
    update: function() {
        physicsAI();
        playerControls();
}
    
}