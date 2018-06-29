
class Saw extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)
        this.scale.setTo(1.5,1.5)
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false
        this.dano = 1

        this.body.setSize(90, 90, 0, 0)
        this.body.isCircle = false
        
        var left = 0
        var up  = 0
        var right = game.width
        var down  = game.height
        var hDelay = game.width/(config.SAW_VELOCITY/1000)
        var vDelay = game.height/(config.SAW_VELOCITY/1000)
        this.animations.add('teste', [0, 1, 2], 20, true)
        this.animations.play('teste')
        
        
                    
        /*game.add.tween(this)
            .to ( { alpha: 0.6 }, 500 )
            .to ( { alpha: 1.0 }, 500 )
            .loop(-1)
            .start()*/
    
        game.add.tween(this)
            .to ( { angle: -359 }, 500 )
            .loop(-1)
            .start()
    }        
}