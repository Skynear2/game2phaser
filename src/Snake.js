
class Snake extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)  
        this.scale.setTo(0.2,0.2)
        this.anchor.setTo(0, 0)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false
        this.vida = 2
        this.dano = 1
        //console.log('vida cobra' +this.vida)
        this.body.setSize(80,95, 0,0)
        //this.body.isCircle = true
        this.animations.add('anim', [0, 1, 2, 3, 4, 5, 6], 10, true)
        this.animations.play('anim')
        
    }
    update(){
        
       
    }        
}