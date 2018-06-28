
class Snake extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)  
        this.scale.setTo(0.2,0.2)
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false

        this.body.setSize(30,43, 0,0)
        //this.body.isCircle = true
        this.animations.add('anim', [0, 1, 2, 3, 4, 5, 6], 10, true)
        this.animations.play('anim')
        
    }        
}