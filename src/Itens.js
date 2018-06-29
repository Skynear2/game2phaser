class Itens extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)  
        this.scale.setTo(0.2,0.2)
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false

        
        //this.body.isCircle = true
        this.up = this.body.y
        this.down = this.up - 5
        
        if(this.key == 'feather'){
            this.body.setSize(30,43, 0,0)
        }else
        if(this.key == 'egg'){
            this.body.setSize(30,39, 0,0)
        }else
        if(this.key == 'wing'){
            this.body.setSize(35,26, 0,0)
        }

        game.add.tween(this)
                .to( { y: this.down},900 )
                .to( { y: this.up}, 900 )
                .loop(-1)
                .start()


        
    
        
    }        
}