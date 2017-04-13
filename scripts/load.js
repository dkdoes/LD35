var loadState = {
    
    preload: function() {
        
        var loadingLabel = game.add.text(80, 150, 'loading...',
                                         {font: '30px Courier', fill: '#ffffff'});
        game.load.image('platformH', 'assets/platformH.png');
        game.load.image('platformV', 'assets/platformV.png');
        game.load.image('background','assets/background.jpg');
        game.load.image('dollar', 'assets/dollar.png');
        game.load.image('arrow', 'assets/arrow2.png');
        game.load.image('phone', 'assets/phone.png');
        //game.load.image('pointer','assets/pointer.png');
        game.load.audio('jump','assets/jump0.wav');
        game.load.audio('dollarSound','assets/dollar0.wav');
        game.load.audio('laser0','assets/laser1027.wav');
        game.load.audio('laser1','assets/laser1153.wav');
        game.load.audio('laser2','assets/laser1294.wav');
        game.load.audio('laser3','assets/laser1539.wav');
        game.load.audio('laser4','assets/laser1728.wav');
        game.load.audio('control','assets/control.wav');
        game.load.audio('shapeshift','assets/shapeshift4.mp3');
        game.load.audio('free','assets/free.wav');
        game.load.spritesheet('npc','assets/npc02.png',290,810,12);
        
    },
    
    create: function(){
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        shapeshift = game.add.audio('shapeshift');
        shapeshift.volume = 0.0;
        shapeshift.loop = true;
        shapeshift.play();
        shapeshift.pause();
        shapeshift.volume = 0.4;
        laser0 = game.add.audio('laser0');
        laser0.volume = 0.2;
        laser1 = game.add.audio('laser1');
        laser1.volume = 0.2;
        laser2 = game.add.audio('laser2');
        laser2.volume = 0.2;
        laser3 = game.add.audio('laser3');
        laser3.volume = 0.2;
        laser4 = game.add.audio('laser4');
        laser4.volume = 0.2;
        control = game.add.audio('control');
        control.volume = 0.8;
        free = game.add.audio('free');
        free.volume = 0.8;
        jump = game.add.audio('jump');
        jump.volume = 0.2;
        dollarSound = game.add.audio('dollarSound');
        dollarSound.onStop.add(Win,this);
        window.WIN = function(){
            //dollar.visible = false;
            dollar.destroy();
            !dollarSound.isPlaying && dollarSound.play();
        }
        window.npcHover = function(n){
            n.hoverTint = n.tint;
            n.tint = 0xEEEEEE;
        }
        window.npcOut = function(n){
            if (n.tint == 0xEEEEEE){
                n.tint = n.hoverTint;
            }
        }
        window.npcClick = function(n){
        if (game.input.activePointer.leftButton.isDown){
            control.play();
            player.tint = 0x888888;
            player.dir = 0;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.body.immovable = true;
            if (player.body.touching.down || player.body.onFloor()){player.body.gravity.y=0;}
            player = n;
            player.body.gravity.y = 4500;
            player.body.immovable = false;
            /*
            if (player.tint != 0x888888){
                player.oldTint = player.tint;
            }
            */
            player.oldTint = player.hoverTint;
            player.dir = 0;
            player.frame = 9;
            player.tint = 0xDDDDDD;
            player.ai = false;
        }
        else if (game.input.activePointer.rightButton.isDown){
            if (n != player){
                !n.ai && free.play();
                n.ai = true;
                n.body.immovable = false;
                n.body.gravity.y = 4500;
                n.tint = n.trueTint;
            }
        }
    }
    
        window.startLevel = function(whatSize,dollarWhere){
            game.world.setBounds(0,0,whatSize[0],whatSize[1]);
            background = game.add.tileSprite(0,0,game.world.width,game.world.height,'background');
            platforms = game.add.physicsGroup();
            dudes = game.add.physicsGroup();
            dollar = game.add.sprite(dollarWhere[0],dollarWhere[1],'dollar');
            arrow = game.add.sprite(0,0,'arrow');
            arrow.anchor.set(0.5);
            arrow.tint = 0x8e3400;
            //pointer = game.add.sprite(0,0,'pointer');
            //pointer.anchor.y = 0.05;
            //pointer.anchor.x = 0.05;
            //pointer.tint = 0x000000;
            game.physics.arcade.OVERLAP_BIAS = 40;
            game.physics.arcade.enable(dollar);
        }
        window.spawnDudes = function(physicsGroupDudes, howMany,whatSize,where,isPlayer=false){    
            var temp;
            //var x = howMany;
            for (x=0;x<howMany;x++){
                temp = physicsGroupDudes.create(Math.random()*(where[1]-where[0])+where[0],Math.random()*(where[3]-where[2])+where[2],'npc');
                temp.xscale = Math.random()*(whatSize[0]-whatSize[1])+whatSize[0];
                temp.yscale = Math.random()*(whatSize[0]-whatSize[1])+whatSize[0];
                
                
                temp.body.collideWorldBounds = true;
                temp.dir = new Date&1 ? -1 : 1;
                temp.inputEnabled = true;
                temp.events.onInputDown.add(npcClick, this);
                temp.events.onInputOver.add(npcHover, this);
                temp.events.onInputOut.add(npcOut, this);
                temp.ai = true;
                temp.body.gravity.y = 4500;
                temp.anchor = new Phaser.Point(0.5,1);
                temp.scale = new Phaser.Point(0.25,0.25);
                temp.trueTint = Phaser.Color.HSVtoRGB(Math.random(),0.7,1).color;
                temp.tint = temp.hoverTint = temp.oldTint = temp.trueTint;
                //temp.hoverTint = temp.tint;
                //temp.oldTint = temp.tint;
                temp.scale.x = (Math.sin(temp.xscale*Math.PI/500)+1)/2+0.25;
                temp.scale.y = 0.5*(Math.sin(temp.yscale*Math.PI/500)/2+1);
                temp.body.setSize((1.0/temp.scale.x)*temp.width*0.80,(1.0/temp.scale.y)*temp.height*0.95);
                if (x==0 && isPlayer == true){
                    player = temp;
                    player.ai = false;
                    player.oldTint = player.tint;
                    player.dir = 0;
                    player.frame = 9;
                    player.tint = 0xDDDDDD;
                }
            }
        }
        window.playerControls = function(){
            //pointer.x = game.input.activePointer.x+game.camera.x;
            //pointer.y = game.input.activePointer.y+game.camera.y;
            if (game.input.keyboard.isDown(87) &&  game.input.keyboard.isDown(73) && game.input.keyboard.isDown(78)){WIN()}
            player.body.velocity.x = 0;
            if (cursors.left.isDown || game.input.keyboard.isDown(65))
            {
                player.body.velocity.x = speedValue * -1;
                player.rotation = -1*(Math.sin(new Date/50)+Math.PI/2)/6;
            }
            else if (cursors.right.isDown || game.input.keyboard.isDown(68))
            {
                player.body.velocity.x = speedValue;
                player.rotation = (Math.sin(new Date/50)+Math.PI/2)/6;
            }
            else
            {
                player.rotation = 0;
            }

            //jump.volume = player.scale.x*player.scale.y;
            
            if (cursors.up.isDown | game.input.keyboard.isDown(87) && jumpSwitch == "ready")
            {
                player.body.velocity.y = tempJumpValue;
                tempJumpValue *= 0.8;
                jumpSwitch = "double jump not ready";
                jump.play();
            }
            if (jumpSwitch == "double jump not ready" && cursors.up.isUp && !game.input.keyboard.isDown(87)){
                jumpSwitch = "double jump ready";
            }
            if (cursors.up.isDown  | game.input.keyboard.isDown(87) && jumpSwitch == "double jump ready")
            {
                player.body.velocity.y = tempJumpValue;
                jump.play()
                tempJumpValue *= 0.8;
                jumpSwitch = "triple jump not ready";
            }
            if (jumpSwitch == "triple jump not ready" && cursors.up.isUp && !game.input.keyboard.isDown(87)){
                jumpSwitch = "triple jump ready";
            }
            if (cursors.up.isDown | game.input.keyboard.isDown(87)  && jumpSwitch == "triple jump ready")
            {
                player.body.velocity.y = tempJumpValue;
                jump.play()
                jumpSwitch = "done";
            }
            if ((player.body.onFloor() | player.body.touching.down)&& cursors.up.isUp && !game.input.keyboard.isDown(87)){
                tempJumpValue = jumpValue;
                jumpSwitch = "ready";
            }
           



            if (cursors.down.isDown | game.input.keyboard.isDown(83)){
                !shapeshift.isPlaying && shapeshift.resume();
                player.xscale+=999*deltaTime;
                player.yscale+=666*deltaTime;
                if (player.xscale > 1000){player.xscale-=1000}
                player.scale.x = (Math.sin(player.xscale*Math.PI/500)+1)/2+0.25;
                player.scale.y = 0.5*(Math.sin(player.yscale*Math.PI/500)/2+1);
                player.body.setSize((1.0/player.scale.x)*player.width*0.80,(1.0/player.scale.y)*player.height*0.95);
            }
            if (cursors.down.isUp & !game.input.keyboard.isDown(83)){
                shapeshift.pause();
                if (scaleSwitch2 == "pressed"){
                    scaleSwitch *= -1;
                    scaleSwitch2 = "unpressed";
                }
            }}
        window.physicsAI = function(){
            game.physics.arcade.overlap(player,dollar,WIN,null,this);
            currentTime = new Date();
            deltaTime = (currentTime - lastTime)/1000;
            lastTime = currentTime;
            game.camera.x+=(((player.x-game.width/2))-game.camera.x)*deltaTime*3;
            game.camera.y+=((((player.y-player.height/2)-game.height/2))-game.camera.y)*deltaTime*3;
            game.physics.arcade.collide(dudes, platforms);
            game.physics.arcade.collide(dudes, dudes);
            arrow.x2 = game.camera.x+game.width-140;
            arrow.y2 = game.camera.y+110;
            arrow.x+=(arrow.x2-arrow.x)*10*deltaTime;
            arrow.y+=(arrow.y2-arrow.y)*10*deltaTime;
            arrow.rotation = Math.atan2(arrow.y-dollar.y,arrow.x-dollar.x)-Math.PI;
            
            
            dudes.forEachAlive(
                function(guy){
                        if (guy.body.gravity.y<4498 && guy.ai==true && player != guy){
                            guy.body.gravity.y+=(4500-guy.body.gravity.y)*deltaTime*8;
                        }
                        
                        if (guy.ai == true){
                            guy.body.velocity.x = speedValue * guy.dir;
                            if (Math.random()<0.01*deltaTime*30){
                                guy.frame++;
                                if (Math.pow(player.x-guy.x,2)+Math.pow(player.y-guy.y,2)<640000){
                                    Math.random()<0.16 && [laser0,laser1,laser2,laser3,laser4][Math.round(Math.random()*4)].play();
                                }
                            }
                            if (Math.random()<0.01*deltaTime*30){
                                guy.body.velocity.y = jumpValue;
                                //jump.volume = guy.scale.x*guy.scale.y;
                                if (Math.pow(player.x-guy.x,2)+Math.pow(player.y-guy.y,2)<640000){
                                    Math.random()<0.16 && jump.play();
                                }
                            }
                            if (Math.random()<0.005*deltaTime*30){
                                guy.dir = Math.round((Math.random()*2))-1;
                            }
                            guy.rotation = guy.dir*(Math.sin(new Date/50)+Math.PI/2)/12;
                        }
                },
                'this'
            );
        }
            game.state.start('level000');
        }
};