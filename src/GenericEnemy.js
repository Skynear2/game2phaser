class GenericEnemy extends Phaser.Sprite {
    constructor(game, x, y, img, ) {
        super(game, x, y, img)  
        this.scale.setTo(1,1)
        this.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this)
        this.body.immovable = true
        this.body.allowGravity = false
        this.tempoWalk = 240
        this.flag = true
        this.vida
        this.cont = 0
        //this.body.setSize(105,69, 10,10)
        this.dano = 2
        //this.body.isCircle = true
        //this.animations.add('andar', [0, 1, 2, 3, 4, 5, 6], 20, true)
        //console.log('x '+ this.body.x)
        
        if(this.key == 'robot'){
            this.body.setSize(105,69, 0,0)
            this.animations.add('andar', [0, 1, 2, 3, 4, 5, 6], 20, true)
            this.animations.play('andar')
            this.dano = 1
            this.vida = 1
        }else
        if(this.key == 'knight1'){
            this.body.setSize(100,72, 0,0)
            this.animations.add('andar1', [0, 1, 2, 3, 4, 5, 6], 20, true)
            this.animations.play('andar1')
            this.dano = 2
            this.vida = 5
        }else
        if(this.key == 'knight2'){
            this.body.setSize(100,89, 0,0)
            this.animations.add('andar2', [0, 1, 2, 3, 4, 5, 6], 20, true)
            this.animations.play('andar2')
            this.dano = 3
            this.vida = 5
        }else
        if (this.key == 'knight3'){
            this.body.setSize(100,94, 0,0)
            this.animations.add('andar3', [0, 1, 2, 3, 4, 5, 6], 20, true)
            this.animations.play('andar3')
            this.dano = 5
            this.vida = 10
        }
    
        
    }   
    update(){
        //console.log(this.key)
        
         if(this.vida == 0){
             this.destroy}
         else{
            if (this.cont < (this.tempoWalk / 2)) {
                
                
                this.body.velocity.x -= 1;
                this.cont++;
            } else if (this.cont == (this.tempoWalk / 2)) {
                this.scale.x *= -1;
                this.body.velocity.x = 0;
                this.cont++;
            } else if (this.cont > (this.tempoWalk / 2) && this.cont < this.tempoWalk) {
                
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