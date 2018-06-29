class Star extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)  
        this.scale.setTo(0.2,0.2)
        this.anchor.setTo(0, 0)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false

        this.body.setSize(25,24, 0,0)
        

        game.add.tween(this)
                .to( { y: this.down},900 )
                .to( { y: this.up}, 900 )
                .loop(-1)
                .start()


        
    
        
    }        
}