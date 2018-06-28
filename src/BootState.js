'use strict'

class BootState extends Phaser.State {

    preload() {
        this.game.load.image('sky', 'assets/sky.png')
        this.game.load.spritesheet('animation', 'assets/spritesheet (2).png', 71,70, 8)
        this.game.load.image('plane1', 'assets/Idle (1).png')
        this.game.load.image('shot', 'assets/shot.png')
        //this.game.load.image('shot', 'assets/shot.png')
        this.game.load.image('wall', 'assets/wall.png')
        this.game.load.image('fog', 'assets/fog.png')
        this.game.load.image('saw', 'assets/saw.png')
        this.game.load.image('feather', 'assets/feather.png')
        this.game.load.image('smoke', 'assets/smoke.png')
        this.game.load.image('title', 'assets/title.png')
        this.game.load.spritesheet('vstick_button', 'assets/button_action.png', 50, 50)
        this.game.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50)
        this.game.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50)
        this.game.load.spritesheet('robot', 'assets/sprites.png', 105, 79, 8)
        this.game.load.spritesheet('snake', 'assets/sprites_snake.png', 80, 95, 6)
        this.game.load.spritesheet('snake_right', 'assets/snake_right.png', 80, 95, 6)
        this.game.load.spritesheet('shot', 'assets/sprite_shot.png', 35, 20, 5)
        this.game.load.spritesheet('boss', 'assets/sprites_boss.png', 110, 184, 3)
        
        this.game.load.spritesheet('spritesheet_mina', 'assets/spritesheet_mina.png', 37, 32)

        // map
        this.game.load.tilemap('level1', 'assets/newmap.json', null, Phaser.Tilemap.TILED_JSON);
       // this.game.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.image('tiles_35x35','assets/tiles_35x35.png');
    }

    create() {
        console.log("BootState created")
        // this.state.start('Title')
        this.state.start('Game')
    }
}