
class Player extends Phaser.Sprite {
    constructor(game, x, y, img, tint, bullets, keys) {
        super(game, x, y, img)

        game.physics.arcade.enable(this)
        this.health = config.PLAYER_HEALTH
        this.score = 0
        this.pulo = 500

        //this.body.isCircle = true
        this.body.setSize(45, 58, 13, 8)
        this.anchor.setTo(0.4, 0.4)
        this.velocity = 200

        this.body.gravity.y = 450;
        this.scale.setTo(1.1, 1.1)



        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.body.drag.set(config.PLAYER_DRAG)
        this.body.mass = config.MASS
        this.facing = 'right'
        this.animations.add('walk', [0, 3, 1, 4, 6, 7], 10, true)
        this.animations.add('stay', [5], 30)
        this.flag = true

        this.keys = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            andarL: game.input.keyboard.addKey(keys.andarL),
            andarR: game.input.keyboard.addKey(keys.andarR),          
            jump: game.input.keyboard.addKey(keys.jump),
            pular: game.input.keyboard.addKey(keys.Pular),
            ataca: game.input.keyboard.addKey(keys.atk)
        }



        this.bullets = bullets


    }

    movePerson() {
        if (this.keys.left.isDown || this.keys.andarL.isDown) {
            this.facing = 'left'
            this.body.velocity.x = -this.velocity

            if (this.scale.x > 0) {
                this.scale.x *= -1
            }
            this.animations.play('walk', 20)
        }
        else if (this.keys.right.isDown || this.keys.andarR.isDown) {
            this.facing = 'right'
            this.body.velocity.x = +this.velocity

            if (this.scale.x < 0) {
                this.scale.x *= -1
            }
            this.animations.play('walk', 20)
        }
        else {

            this.body.velocity.x = 0
            this.animations.play('stay', 0.85)
        }


        if (this.keys.jump.isDown ) {
            if (this.body.onFloor) {
                this.body.velocity.y += this.pulo
            }

        }

    }

    fireBullet() {
        if (!this.alive)
            return;



        var bullet = this.bullets.getFirstExists(false)
        
        if (bullet) {
            bullet.reset(this.x, this.y)
            bullet.lifespan = config.BULLET_LIFE_SPAN
            // bullet.rotation = this.rotation
            bullet.body.enableBody = true
            bullet.body.bounce.setTo(1, 1)
            bullet.body.friction.setTo(0, 0)
            bullet.body.allowGravity = false
            if (this.facing == 'left') {
                this.flag = false
                bullet.scale.x *= -1
                bullet.body.velocity.x -= 500
            } else if (this.facing == 'right' && this.flag == true) {
                //bullet.scale.x *= -1    
                bullet.body.velocity.x += 500
            } else if (this.facing == 'right' && this.flag == false) {
                this.flag = true
                bullet.scale.x *= -1
                bullet.body.velocity.x += 500
            }

        }


    }

    jump() {
        if (this.body.onFloor()) {
            console.log('chao:' + this.body.onFloor())
            this.body.velocity.y += -500
        }
        else
            this.body.velocity.y += 0
    }

    update() {
        this.movePerson()
        //console.log('x:' + this.body.x )
        //console.log('y:' + this.body.y )
    }
}