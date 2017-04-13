
var game = new Phaser.Game(1280, 800, Phaser.AUTO, 'gameDiv');

currentTime = new Date();
lastTime = currentTime;
deltaTime = 0;
//player;
//platforms;
//cursors;
//jumpButton;
jumpSwitch = "ready";
scaleSwitch = -1;
scaleSwitch2 = "unpressed";
jumpValue = -1600;
tempJumpValue = jumpValue;
speedValue = 500;


game.state.add('load', loadState);
game.state.add('level000', level000State);
game.state.add('level001', level001State);
game.state.add('level002', level002State);
game.state.add('level003', level003State);
game.state.add('level004', level004State);
game.state.add('level005', level005State);
function Win(){
    if (game.state.current == 'level000'){
        game.state.start('level001');
    }
    else if (game.state.current == 'level001'){
        game.state.start('level002');
    }
    else if (game.state.current == 'level002'){
        game.state.start('level003');
    }
    else if (game.state.current == 'level003'){
        game.state.start('level004');
    }
    else if (game.state.current == 'level004'){
        game.state.start('level005');
    }
}


game.state.start('load');