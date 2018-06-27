class Feather extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)  
        this.scale.setTo(0.2,0.2)
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false

        this.body.setSize(30,43, 0,0)
        //this.body.isCircle = true
        this.up = this.body.y
        this.down = this.up - 10
        
        game.add.tween(this)
                .to( { y: this.down},900 )
                .to( { y: this.up}, 900 )
                .loop(-1)
                .start()


        game.add.tween(this)
            .to ( { alpha: 0.6 }, 500 )
            .to ( { alpha: 1.0 }, 500 )
            .loop(-1)
            .start()
    
        
    }        
}