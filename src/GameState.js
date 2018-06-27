'use strict'
var obstacles
class GameState extends BaseState {
    
    create() {
        //  var obstacles

        //this.obstacles = this.game.add.group()
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.physics.arcade.gravity.y = config.GRAVITY 
        
        let skyWidth = this.game.cache.getImage('sky').width
        let skyHeight = this.game.cache.getImage('sky').height
        this.sky = this.game.add.tileSprite(
            0, 0, skyWidth, skyHeight, 'sky')
            this.sky.scale.x = this.game.width / this.sky.width
            this.sky.scale.y = this.game.height / this.sky.height
            this.sky.fixedToCamera = true
            
            this.fog = this.game.add.tileSprite(
                0, 0, this.game.width, this.game.height, 'fog')
                this.fog.tileScale.setTo(7, 7)
                this.fog.alpha = 0.4
                this.fog.fixedToCamera = true
                
                //this.obstacles = this.game.add.group()
                this.createTileMap()
                this.createExplosions()
                
                
                
                this.player1 = new Player(this.game, 100, 100,
                    'animation', 0xff0000, null, {
                        left: Phaser.Keyboard.LEFT,
                        right: Phaser.Keyboard.RIGHT,
                        jump: Phaser.Keyboard.UP
                    })
                    this.game.add.existing(this.player1)
                    this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1); // smooth        
                    
                    this.hud = {
                        text1: this.createText(this.game.width * 1 / 9, 50, 'PLAYER 1: 20'),
                        text2: this.createText(this.game.width * 8 / 9, 50, 'PLAYER 2: 20')
                        //fps: createHealthText(game.width*6/9, 50, 'FPS'),
                    }
                    this.updateHud()
                    
                    let fps = new FramesPerSecond(this.game, this.game.width / 2, 50)
                    this.game.add.existing(fps)
                    
                    let fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
                    fullScreenButton.onDown.add(this.toggleFullScreen, this)
                    
                    
                    //game.time.advancedTiming = true;
                    this.initFullScreenButtons()
                    
                    let vpad = new VirtualGamepad(this.game)
                    this.game.add.existing(vpad)
                    
                    let jumpButton = vpad.addActionButton(
                        this.game.width-100, this.game.height-120, 'vstick_button',() => this.player1.jump())
                        
                        let dpadButton = vpad.addDPadButton(100, this.game.height - 120, 'vstick_dpad', {
                            leftPressed: () => this.player1.keys.left.isDown = true,
                            leftReleased: () => this.player1.keys.left.isDown = false,
                            rightPressed: () => this.player1.keys.right.isDown = true,
                            rightReleased: () => this.player1.keys.right.isDown = false
                        })
                        
                    }
                    
                    loadFile() {
                        let text = this.game.cache.getText('level1');
                        return text.split('\n');
                    }

    createTileMap() {
        // TODO implementar leitura do arquivo de tilemap e objetos
        this.map = this.game.add.tilemap('level1')
        this.map.addTilesetImage('Tiles_32x32')
        this.map.addTilesetImage('feather')
        this.map.addTilesetImage('saw')

        //this.mapLayer_serras = this.map.createLayer('Camada de Objetos2')
        //this.map.setCollisionBetween(65, 66, true, 'Camada de Tiles 2')
        
        this.mapLayer = this.map.createLayer('Camada de Tiles 1')
        this.map.setCollisionBetween(1, 65, true, 'Camada de Tiles 1')


        //this.mapLayer.resizeWorld()
        //spikes
        this.map.setTileIndexCallback(66, this.hitSpikes, this);

        this.obstacles = this.game.add.group()
        this.feather = this.game.add.group()
        this.mines = this.game.add.group()
        //this.map.createFromObjects('Camada de Objetos 1', 66, 'feather', 0, true, true, this.obstacles, fea  )
        this.map.createFromObjects('Camada de Objetos 1',65, 'feather',0 ,true, true, this.feather, Feather)
        this.map.createFromObjects('Camada de Objetos 1',70, 'spritesheet_mina',0 ,true, true, this.mines, Feather)
       // this.map.createFromObjects('Camada de Objetos 1',66, 'saw',0 ,true, true, this.obstacles, Saw)

       this.mines.forEach(function(obj){
           obj.animations.add('idle', [7,8, 2, 3, 0, 6], 10, true)
           obj.animations.play('idle')
       })
       
        this.mapLayer.resizeWorld()



        //this.createSaw(659, 200)
        //this.spawnSaw(659, 200)
        //this.obstacles.add.existing(saw)


    }

    hitSpikes(sprite, tile) {
        sprite.alpha = 0.5
        tile.alpha = 0.0
        this.mapLayer.dirty = true // força update dos tiles do mapa.
    }

    spawnSaw(x, y) {
        let saw = new Saw(this.game, x, y, 'saw')
        this.obstacles.add(saw)
    }

    createSaw(x, y ) {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 7, this.spawnSaw, this, x, y);
    }

    createBullets() {
        let bullets = this.game.add.group()
        bullets.enableBody = true
        bullets.physicsBodyType = Phaser.Physics.ARCADE
        bullets.createMultiple(10, 'shot')
        bullets.setAll('anchor.x', 0.5)
        bullets.setAll('anchor.y', 0.5)
        return bullets
    }

    createExplosions() {
        // cria pool de explosoes
        this.explosions = this.game.add.group()
        this.explosions.createMultiple(30, 'explosion')
        this.explosions.forEach(function (exp) {
            let anim = exp.animations.add('full', null, 60, false) // null -> array of frames
            exp.scale.setTo(0.5, 0.5)
            exp.anchor.setTo(0.5, 0.5)
            anim.onComplete.add(() => exp.kill())
        })
    }

    createExplosion(x, y) {
        let exp = this.explosions.getFirstExists(false)
        exp.reset(x, y)
        exp.animations.play('full')
    }

    toggleFullScreen() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen()
        } else {
            this.game.scale.startFullScreen(false)
        }
    }

    updateBullets(bullets) {
        bullets.forEach(function (bullet) {
            this.game.world.wrap(bullet, 0, true)
        }, this)
    }

    update() {
        //    hud.fps.text = `FPS ${game.time.fps}`
        this.sky.tilePosition.x += 0.5
        this.fog.tilePosition.x += 0.3

        //moveAndStop(player1)
        //this.updateBullets(this.player1.bullets)

        // colisoes com mapa
        this.game.physics.arcade.collide(this.player1, this.mapLayer);
        this.game.physics.arcade.collide(this.player1, this.obstacles);
        this.game.physics.arcade.collide(this.player1, this.feather);

        // colisao com serras
        //this.game.physics.arcade.collide(this.player1, this.obstacles, this.hitObstacle, null, this)
    }

    killBullet(bullet, wall) {
        //wall.kill()
        bullet.kill()
        this.createExplosion(bullet.x, bullet.y)
    }

    hitObstacle(player, obstacle) {
        if (player.alive) {
            player.damage(1)
            this.updateHud()
            this.game.camera.shake(0.01, 200);

            // empurra jogador na direcao oposta a da colisao
            let forceDirection = this.game.physics.arcade.angleBetween(obstacle, player)
            this.game.physics.arcade.velocityFromRotation(forceDirection, 600, player.body.velocity)
        }
    }

    hitPlayer(player, bullet) {
        if (player.alive) {
            player.damage(1)
            bullet.kill()
            this.createExplosion(bullet.x, bullet.y)
            this.updateHud()
            this.game.camera.shake(0.01, 200);
        }
    }

    updateHud() {
        this.hud.text1.text = `PLAYER 1: ${this.player1.health}`
    }

    render() {
        this.game.debug.body(this.player1)
        this.obstacles.forEach(function(obj){
            this.game.debug.body(obj)
        },this)

        this.feather.forEach(function(obj){
            this.game.debug.body(obj)
        },this)
        //obstacles.forEach(function(obj) { game.debug.body(obj) })
        //game.debug.body(player1)
        //game.debug.body(player2)
    }
}