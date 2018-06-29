'use strict'

class BootState extends Phaser.State {

    preload() {
        this.game.load.image('sky', 'assets/sky.png')
        this.game.load.spritesheet('animation', 'assets/spritesheet (2).png', 71,70, 8)
        this.game.load.image('plane1', 'assets/Idle (1).png')
        //this.game.load.image('shot', 'assets/shot.png')
        //this.game.load.image('shot', 'assets/shot.png')
        this.game.load.image('wall', 'assets/wall.png')
        this.game.load.image('fog', 'assets/fog.png')
        this.game.load.image('saw', 'assets/blade_3.png')
        this.game.load.image('feather', 'assets/feather.png')
        this.game.load.image('egg', 'assets/egg_30x39.png')
        this.game.load.image('wing', 'assets/wings_35x26.png')
        this.game.load.image('smoke', 'assets/smoke.png')
        this.game.load.image('title', 'assets/title.png')
        this.game.load.image('star', 'assets/star_25x24.png')
        this.game.load.image('tiro', 'assets/tiro.png')
        this.game.load.spritesheet('vstick_button', 'assets/button_action.png', 50, 50)
        this.game.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50)
        this.game.load.spritesheet('vstick_dpad', 'assets/button_dpad.png', 105, 50)
        this.game.load.spritesheet('robot', 'assets/sprites.png', 105, 79, 8)
        this.game.load.spritesheet('snake', 'assets/sprites_snake.png', 80, 95, 6)
        this.game.load.spritesheet('snake_right', 'assets/snake_right.png', 80, 95, 6)
        this.game.load.spritesheet('shot', 'assets/sprite_shot.png', 35, 20, 5)
        this.game.load.spritesheet('boss', 'assets/sprite_boss.png', 110, 184, 3)
        this.game.load.spritesheet('miniboss', 'assets/sprites_miniboss.png', 110, 184, 3)
        this.game.load.spritesheet('knight1', 'assets/knight_100x72.png', 100, 72, 7)
        this.game.load.spritesheet('knight2', 'assets/knight_100x89.png', 100, 89, 7)
        this.game.load.spritesheet('knight3', 'assets/knight_100x94.png', 100, 94, 7)

        // map
        this.game.load.tilemap('level1', 'assets/newmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level2', 'assets/newmap1.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('level3', 'assets/newmap2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level4', 'assets/newmap3.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.image('tiles_35x35','assets/tiles_35x35.png');
    }

    create() {
        console.log("BootState created")
        // this.state.start('Title')
        this.state.start('Game')
    }
}