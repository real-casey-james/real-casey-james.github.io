let Start = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 
    
    function start () { Phaser.Scene.call(this, { key: 'start', active: true })},

    preload: function () {
        this.load.audio('shutup', 'assets/sounds/shutup.mp3')
        this.load.audio('engine', 'assets/sounds/engine.wav')
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('button', 'assets/images/ButtonTemplate.png')
        this.load.image('pig', 'assets/images/Pig_Down@2x.png')
        this.load.image('chick', 'assets/images/Chick_Down@2x.png')

        this.load.tilemapTiledJSON('drive', 'assets/maps/drive.json');
        this.load.image("roadEW", "assets/images/roadEW.png")
        this.load.image("roadNE", "assets/images/roadNE.png")
        this.load.image('tiles', 'assets/images/tiles.png')
        this.load.image('car', 'assets/images/Daco_4361360.png')
        this.load.image('star', 'assets/images/star.png')
        this.load.audio('ding', 'assets/sounds/ding.wav')
        this.load.image('scoreBackground', 'assets/images/UI_Toolbar_Top_Corner.png')
        this.load.image('scoreCoin', 'assets/images/scoreCoin.png')

        this.load.spritesheet('tractor', 'assets/images/tractor.png', { frameWidth: 32, frameHeight: 32, margin: 1, spacing: 2 })

        this.load.image('Serene_Village_48x48', 'assets/images/Serene_Village_48x48.png')
        this.load.image('redHouse', 'assets/images/redHouse.png')
        this.load.image('blueHouse', 'assets/images/blueHouse.png')
        this.load.image('greenHouse', 'assets/images/greenHouse.png')
        this.load.image('smallRedHouse', 'assets/images/smallRedHouse.png')
        this.load.image('smallBlueHouse', 'assets/images/smallBlueHouse.png')
        this.load.image('smallGreenHouse', 'assets/images/smallGreenHouse.png')
        this.load.image('trees1', 'assets/images/trees1.png')
        this.load.image('trees2', 'assets/images/trees2.png')
        this.load.image('trees3', 'assets/images/trees3.png')
        this.load.image('smoke', 'assets/images/smoke-puff.png')
        this.load.spritesheet('sheep', 'assets/images/sheep_walk.png', { frameWidth: 128, frameHeight: 128 } )
        this.load.audio('sheepSound', 'assets/sounds/sheep.wav')
        this.load.audio('crash', 'assets/sounds/151624__qubodup__clank-car-crash-collision.wav')
        this.load.image('blood', 'assets/images/blood.png')
        this.load.image('Modern_Office_64x64', 'assets/images/Modern_Office_64x64.png')
        this.load.image('paper', 'assets/images/paper.png')
        this.load.image('cooler', 'assets/images/cooler.png')
        this.load.audio('printer', 'assets/sounds/printer.wav') 
        this.load.image('printerDown', 'assets/images/printerDown.png')
        this.load.image('printerLeft', 'assets/images/printerLeft.png')
        this.load.image('printerRight', 'assets/images/printerRight.png')
        this.load.image('printerUp', 'assets/images/printerUp.png')

        this.load.audio('quack', 'assets/sounds/duckwin.wav')
        this.load.image('bread', 'assets/images/bread.png')
        this.load.spritesheet('duckSprite', 'assets/images/ducks.png', { frameWidth: 48, frameHeight: 48 })
        this.load.image('beachball', 'assets/images/BeachBall.png')
        this.load.image('bush', 'assets/images/Bush.png')
        this.load.image('cat', 'assets/images/Cat_Down.png')
        this.load.image('chick', 'assets/images/Chick_Down.png')
        this.load.image('danger', 'assets/images/Danger_Water.png')
        this.load.image('fox', 'assets/images/Fox_Down.png')
        this.load.image('beetroot', 'assets/images/GardenBed_Beetroot_02.png')
        this.load.image('carrots', 'assets/images/GardenBed_Carrots_02.png')
        this.load.image('cucumbers', 'assets/images/GardenBed_Cucumbers_02.png')
        this.load.image('tomatoes', 'assets/images/GardenBed_Tomatoes_02.png')
        this.load.image('pig', 'assets/images/Pig_Down.png')
        this.load.image('rabbit', 'assets/images/Rabbit_Down.png')
        this.load.image('barrel', 'assets/images/RadioactiveBarrel.png')
        this.load.image('shovel', 'assets/images/Showel.png')
        this.load.image('waterTree', 'assets/images/Tree.png')
        this.load.image('wateringCan', 'assets/images/WateringCan.png')
        this.load.image('SewerTileStraight', 'assets/images/SewerTileStraight.png')
        this.load.image('SewerTileTurn', 'assets/images/SewerTileTurn.png')
        this.load.image('rat', 'assets/images/RatKing.png')
        this.load.image('gator', 'assets/images/Gator.png')
        this.load.image('vision', 'assets/images/radial_gradient.png')
        this.load.image('speaker', 'assets/images/F02.png')
        this.load.image('speakerLeft', 'assets/images/F02 left.png')
        this.load.audio('slurp', 'assets/sounds/slurp.wav')
        this.load.image('transparent', 'assets/images/transparent.png')
        this.load.image('SewerBackground', 'assets/images/SewerBackground.png')
        this.load.spritesheet('redDragon', 'assets/images/redDragon.png', { frameWidth: 191, frameHeight: 161 })
        this.load.spritesheet('greenDragon', 'assets/images/greenDragon.png', { frameWidth: 64, frameHeight: 64 })
        this.load.image('desert', 'assets/images/desert.png')
        this.load.image('durry', 'assets/images/durry.png')
        this.load.audio('exhale', 'assets/sounds/exhale.wav')
        this.load.spritesheet('camel', 'assets/images/camel.png', { frameWidth: 48, frameHeight: 48 } )
        this.load.image('smoke', 'assets/images/smoke-puff.png')
        this.load.image('rainbow', 'assets/images/rainbow.png')
        this.load.image('pyramid', 'assets/images/pyramid.png')
        this.load.image('desertObjects', 'assets/images/desertObjects.png')
        this.load.image('clouds', 'assets/images/clouds.png')
        this.load.image('egg', 'assets/images/gold_egg.png')
        this.load.spritesheet('bird', 'assets/images/skyBird.png', { frameWidth: 192, frameHeight: 174 } )
        this.load.image('farground', 'assets/images/farground.png')
        this.load.image('foreground', 'assets/images/foreground.png')
        this.load.image('skyMid', 'assets/images/skyMid.png')
        this.load.image('sun', 'assets/images/sun.png')
        this.load.image('rainbow', 'assets/images/rainbow.png')
        this.load.audio('harp', 'assets/sounds/harp.wav')
        this.load.image('Rainbow Corner 1', 'assets/images/Rainbow Corner 1.png')
        this.load.image('Rainbow Corner 2', 'assets/images/Rainbow Corner 2.png')
        this.load.image('Seven-colors_(rainbow)', 'assets/images/Seven-colors_(rainbow).png')
        this.load.image('jesus', 'assets/images/jesus.png')
        this.load.image('plane', 'assets/images/plane.png')
        this.load.image('spaceStation', 'assets/images/spaceStation.png')
        this.load.image('gold', 'assets/images/gold.png')
        this.load.image('coin', 'assets/images/CoinNoShadow.png')
        this.load.image('ruby', 'assets/images/Ruby.png')
    },

    create: function () {
        let startItems = this.add.group()
        let add = this.add
        WebFont.load({
        google: {
            families: [ 'Fredoka One' ]
        },
        active: function () {
            add.text(90, 100, 'SHUT UP AND DRIVE', { fontFamily: 'Fredoka One', fontSize: '62px', fill: '#ff3333', stroke: '#ffffff', strokeThickness: 8, shadow: {offsetY: 6, offsetX: 3, color: 'white', fill: true} })
            add.text(250, 300, 'SPACE TO START', { fontFamily: 'Fredoka One', fontSize: '32px', fill: '#ff3333', stroke: '#ffffff', strokeThickness: 8, shadow: {offsetY: 4, offsetX: 2, color: 'white', fill: true} })
        }
    });

        this.add.image(220, 277, 'button').setScale(0.7).setOrigin(0)
        startItems.add(this.add.image(100, 450, 'pig'))
        startItems.add(this.add.image(700, 450, 'chick'))
        startItems.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                }
            })
        })

        let camera = this.cameras.main;
        camera.setBackgroundColor('#8CB7F2')

        this.input.keyboard.once('keydown-SPACE', () => {
            this.cameras.main.fadeOut(100, 255, 255, 255)
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.sound.play('shutup')
            this.sound.play('engine')
            this.scene.start('city')
        })
    },

    update: function () {
    }
})

export default Start