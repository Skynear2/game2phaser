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




        this.player1 = new Player(this.game, 100, 100,
            'animation', 0xff0000, this.createBullets(), {
                left: Phaser.Keyboard.LEFT,
                andarR: Phaser.Keyboard.S,
                andarL: Phaser.Keyboard.A,
                pular: Phaser.Keyboard.L,
                atk: Phaser.Keyboard.K,
                right: Phaser.Keyboard.RIGHT,
                jump: Phaser.Keyboard.UP
            })
            this.game.add.existing(this.player1)
            this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);   
        
        this.hud = {
            text1: this.createText(this.game.width * 0.8 / 9, 50, 'PLAYER 1: 20'),
            text2: this.createText(this.game.width * 2 / 8, 50, 'SCORE:0')
            //fps: createHealthText(game.width*6/9, 50, 'FPS'),
        }
        this.createTileMap()
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
            this.game.width - 100, this.game.height - 50, 'vstick_button',  () => this.player1.jump())

        let fireButton = vpad.addActionButton(
            this.game.width - 200, this.game.height - 50, 'vstick_button', () => this.player1.fireBullet())

        let dpadButton = vpad.addDPadButton(100, this.game.height - 50, 'vstick_dpad', {
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
        this.map = this.game.add.tilemap(`level${config.LEVEL}`)
        this.map.addTilesetImage('tiles_35x35')
        // this.map.addTilesetImage('feather')
        //this.map.addTilesetImage('saw')

        //this.mapLayer_serras = this.map.createLayer('Camada de Objetos2')
        //this.map.setCollisionBetween(65, 66, true, 'Camada de Tiles 2')

        this.mapLayer = this.map.createLayer('Camada de Tiles 1')
        this.map.setCollisionBetween(42, 59, true, 'Camada de Tiles 1')
        this.map.setCollisionBetween(61, 73, true, 'Camada de Tiles 1')

        //this.mapLayer.resizeWorld()
        //spikes
        this.map.setTileIndexCallback(55, this.Lava, this);
        this.map.setTileIndexCallback(56, this.Lava, this);
        this.map.setTileIndexCallback(57, this.Lava, this);

        this.obstacles = this.game.add.group()
        this.itens = this.game.add.group()
        this.robos = this.game.add.group()
        this.snake = this.game.add.group()
        this.snake_right = this.game.add.group()
        this.star = this.game.add.group()
        this.boss = this.game.add.group()
        //this.map.createFromObjects('Camada de Objetos 1', 66, 'feather', 0, true, true, this.obstacles, fea  )
        
        this.map.createFromObjects('Camada de Objetos 1', 1, 'feather', 0, true, true, this.itens, Itens)
        this.map.createFromObjects('Camada de Objetos 1', 40, 'egg', 0, true, true, this.itens, Itens)
        this.map.createFromObjects('Camada de Objetos 1', 41, 'wing', 0, true, true, this.itens, Itens)
        this.map.createFromObjects('Camada de Objetos 1', 75, 'star', 0, true, true, this.star, Itens)
        this.map.createFromObjects('inimigos', 8, 'robot', 0, true, true, this.obstacles, GenericEnemy)
        this.map.createFromObjects('inimigos', 14, 'knight1', 0, true, true, this.obstacles, GenericEnemy)
        this.map.createFromObjects('inimigos', 21, 'knight2', 0, true, true, this.obstacles, GenericEnemy)
        this.map.createFromObjects('inimigos', 28, 'knight3', 0, true, true, this.obstacles, GenericEnemy)
        this.map.createFromObjects('inimigos', 2, 'snake', 0, true, true, this.obstacles, Snake)
        this.map.createFromObjects('inimigos', 35, 'snake_right', 0, true, true, this.obstacles, Snake)
        this.map.createFromObjects('inimigos', 74, 'saw', 0, true, true, this.obstacles, Saw)
        this.map.createFromObjects('inimigos', 76, 'boss', 0, true, true, this.boss, Boss )
        this.map.createFromObjects('inimigos', 78, 'miniboss', 0, true, true, this.boss, Boss)
        //this.map.createFromObjects('inimigos',, 'boss',0 ,true, true, this.obstacles, Saw)
        //this.map.createFromObjects('Camada de Objetos 1',70, 'spritesheet_mina',0 ,true, true, this.mines, Feather)
        // this.map.createFromObjects('Camada de Objetos 1',66, 'saw',0 ,true, true, this.obstacles, Saw)






        this.player1.bullets.forEach(function (obj) {
            obj.animations.add('fire', [0, 1, 2, 3, 4, 5, 6], 10, true)
            obj.animations.play('fire')
        },this)
        this.mapLayer.resizeWorld()
        


        //this.createSaw(659, 200)
        //this.spawnSaw(659, 200)
        //this.obstacles.add.existing(saw)


    }

    lava(){
        hitlava(this.player1)
    }

    hitlava(player){
        this.player.health -= 1
    }

    nextLevel(){
         config.LEVEL++
        if (config.LEVEL > 4) config.LEVEL = 1
    
            this.game.state.restart()
    }

    spawnSaw(x, y) {
        let saw = new Saw(this.game, x, y, 'saw')
        this.obstacles.add(saw)
    }

    createSaw(x, y) {
        this.game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 7, this.spawnSaw, this, x, y);
    }

    createBullets() {
        let bullets = this.game.add.group()
        bullets.enableBody = true
        bullets.physicsBodyType = Phaser.Physics.ARCADE
        bullets.body.allowGravity = false
        bullets.createMultiple(10, 'shot')
        bullets.setAll('anchor.x', 0.5)
        bullets.setAll('anchor.y', 0.5)
        return bullets
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
        this.obstacles.forEach(function (obj) {
            if (obj.health = 0) {
                obj.destroy()
            }
        }, this)
        this.sky.tilePosition.x += 0.5
        this.fog.tilePosition.x += 0.3
        this.updateHud()
        //moveAndStop(player1)
        this.updateBullets(this.player1.bullets)

        // colisoes com mapa
        this.game.physics.arcade.collide(this.player1, this.mapLayer);
        this.game.physics.arcade.collide(this.player1.bullets, this.mapLayer, this.killBullet, null, this);
        this.game.physics.arcade.collide(this.player1, this.obstacles, this.hitObstacle, null, this);
        this.game.physics.arcade.overlap(this.player1.bullets, this.obstacles, this.hitEnemy, null, this);
        this.game.physics.arcade.overlap(this.player1, this.itens, this.collectItens, null, this);
        this.game.physics.arcade.overlap(this.player1, this.star, this.collectStar, null, this);
        this.game.physics.arcade.overlap(this.player1.bullets, this.boss,this.hitEnemy, null, this);

        this.boss.forEach(function(enemy) {
            
                this.game.physics.arcade.overlap(this.player1, enemy.weapon.bullets, this.hitBoss, null, this)
        }, this)
        // colisao com serras
        //this.game.physics.arcade.collide(this.player1, this.obstacles, this.hitObstacle, null, this)
    }

    collectStar(player, iten){
        this.nextLevel()
    }

    collectItens(player, iten) {
        if (iten.key == 'egg') {
            player.health += 5
            iten.destroy()
        } else
            if (iten.key == 'feather') {
                player.score += 50
                iten.destroy()
            } else
                if (iten.key == 'wing') {
                    player.pulo += 5
                    iten.destroy()
                }
    }

    killBullet(bullet, wall) {
        //wall.kill()
        bullet.kill()

    }

    hitEnemy(bullets, obstacles) {
        obstacles.vida -= 1
        bullets.kill()
        if(obstacles.key = 'boss'){
            obstacles.flag = true
        }else 
        if(obstacles.key = 'miniboss'){
            obstacles.flag = true
        }
        if (obstacles.vida == 0) {
            obstacles.destroy()
        }
    }


    hitBoss(player, bullet){
        if (player.health > 0){
            player.health -= 3
            bullet.kill()
        }else if(player.health = 0){
            player.kill()
        }
    }

    hitObstacle(player, obstacle) {
        if (player.alive) {
            player.damage(obstacle.dano)
            this.game.updateHud
            this.game.camera.shake(0.01, 200);

            // empurra jogador na direcao oposta a da colisao
            let forceDirection = this.game.physics.arcade.angleBetween(obstacle, player)
            this.game.physics.arcade.velocityFromRotation(forceDirection, 600, player.body.velocity)
        }
    }

    createBullets() {
        let bullets = this.game.add.group()
        bullets.enableBody = true
        bullets.physicsBodyType = Phaser.Physics.ARCADE
        bullets.createMultiple(1, 'shot')
        bullets.setAll('anchor.x', 0.5)
        bullets.setAll('anchor.y', 0.5)
        return bullets
    }

    updateBullets(bullets) {
        bullets.forEach(function (bullet) {
            this.game.world.wrap(bullet, 0, true)
        }, this)
    }

    hitPlayer(player, bullet) {
        if (player.alive) {
            player.damage(1)
            sbullet.kill()
            this.updateHud()
            this.game.camera.shake(0.01, 200);
            let forceDirection = this.game.physics.arcade.angleBetween(obstacle, player)
            this.game.physics.arcade.velocityFromRotation(forceDirection, 600, player.body.velocity)
        }
    }

    updateHud() {
        this.hud.text1.text = `PLAYER 1: ${this.player1.health}`
        this.hud.text2.text = `SCORE: ${this.player1.score}`
    }

    render() {
       /* this.updateBullets(this.player1.bullets)

        // this.game.debug.body(this.player1)
        this.obstacles.forEach(function (obj) {
            this.game.debug.body(obj)
        }, this)

        this.itens.forEach(function (obj) {
            this.game.debug.body(obj)
        }, this)

        this.player1.bullets.forEach(function (obj) {
            this.game.debug.body(obj)
        }, this)
        this.boss.forEach(function (obj) {
            this.game.debug.body(obj)
        }, this)
         *//*
                this.feather.forEach(function(obj){
                    this.game.debug.body(obj)
                },this)
        
                this.robos.forEach(function(obj){
                    this.game.debug.body(obj)
                },this)*/
        //obstacles.forEach(function(obj) { game.debug.body(obj) })
        //game.debug.body(player1)
        //game.debug.body(player2)
    }
}