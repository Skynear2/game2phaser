
class Player extends Phaser.Sprite {
    constructor(game, x, y, img, tint, bullets, keys) {
        super(game, x, y, img)

        game.physics.arcade.enable(this)
        this.health = config.PLAYER_HEALTH
        //this.body.isCircle = true
        this.body.setSize(45, 58, 13, 8)
        this.anchor.setTo(0.4, 0.4)
        this.velocity = 200

        this.body.gravity.y = 450;
        this.scale.setTo(1,1)
        
        

        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.body.drag.set(config.PLAYER_DRAG)
        this.body.mass = config.MASS
                
        this.animations.add('walk', [0, 3, 1, 4, 6, 7], 10, true)
        this.animations.add('stay', [2,5], 30)
        
        
        this.keys = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            //andarL: game.input.keyboard.addKey(keys.andarL),
            //andarR: game.input.keyboard.addKey(keys.andarR),          
            jump: game.input.keyboard.addKey(keys.jump)
        }

        
        this.jumpAllow = true
        this.bullets = bullets

    }        
 
    movePerson() {
        if (this.keys.left.isDown) {
            this.body.velocity.x = -this.velocity

            if (this.scale.x > 0){
                this.scale.x *= -1
            }
            this.animations.play('walk',20)
        }
        else if (this.keys.right.isDown) {
            this.body.velocity.x = +this.velocity
            
            if (this.scale.x < 0){
                this.scale.x *= -1
            }
            this.animations.play('walk',20)
        }
        else{
            //this.animations.stop()
            this.body.velocity.x = 0
            this.animations.play('stay',0.85)   
        }

        
        if (this.keys.jump.isDown){
            if(this.body.onFloor){
                this.body.velocity.y += -500
            }
            //this.jumpAllow = false
        }

    }

    jump() {
        if(this.body.onFloor()){
            console.log('chao:'+this.body.onFloor())
            this.body.velocity.y += -500
        }
        else 
            this.body.velocity.y+= 0
}
     
    update() {
        this.movePerson()
        //console.log('x:' + this.body.x )
        //console.log('y:' + this.body.y )
    }
}