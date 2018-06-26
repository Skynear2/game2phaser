'use strict'

class BootState extends Phaser.State {

    preload() {
        this.game.load.image('sky', 'assets/sky.png')
        this.game.load.spritesheet('animation', 'assets/spritesheet (2).png', 71,70, 8)
        this.game.load.image('plane1', 'assets/Idle (1).png')
        this.game.load.image('shot', 'assets/shot.png')
        this.game.load.image('wall', 'assets/wall.png')
        this.game.load.image('fog', 'assets/fog.png')
        this.game.load.image('saw', 'assets/saw.png')
        this.game.load.image('feather', 'assets/feather.png')
        this.game.load.image('smoke', 'assets/smoke.png')
        this.game.load.image('title', 'assets/title.png')
        this.game.load.spritesheet('vstick_button', 'assets/button_action.png', 50, 50)
        this.game.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50)
        this.game.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50)

        this.game.load.spritesheet('explosion', 'assets/explosion.png', 56, 56)

        // map
        this.game.load.tilemap('level1', 'assets/untitled1.json', null, Phaser.Tilemap.TILED_JSON);
       // this.game.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.image('Tiles_32x32','assets/Tiles_32x32.png');
    }

    create() {
        console.log("BootState created")
        // this.state.start('Title')
        this.state.start('Game')
    }
}