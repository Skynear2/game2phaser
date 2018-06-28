class Robot extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)  
        this.scale.setTo(1,1)
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false
        this.tempoWalk = 240
        this.flag = true
        this.health = 1
        this.cont = 0
        this.body.setSize(105,69, 10,10)
        this.damage = 2
        //this.body.isCircle = true
        //this.animations.add('andar', [0, 1, 2, 3, 4, 5, 6], 20, true)
        console.log('x '+ this.body.x)
        
        this.animations.add('andar', [0, 1, 2, 3, 4, 5, 6], 20, true)
           this.animations.play('andar')
        
    
        
    }   
    update(){
        
         if(!this.alive){
             this.destroy}
         else{
            if (this.cont < (this.tempoWalk / 2)) {
                console.log('right')
                
                this.body.velocity.x -= 1;
                this.cont++;
            } else if (this.cont == (this.tempoWalk / 2)) {
                this.scale.x *= -1;
                this.body.velocity.x = 0;
                this.cont++;
            } else if (this.cont > (this.tempoWalk / 2) && this.cont < this.tempoWalk) {
                console.log('left')
                this.body.velocity.x += 1
                this.cont++;
            } else {
                this.cont = 0;
                this.scale.x *= -1;
                this.body.velocity.x = 0;
            }

        }
    }      
}