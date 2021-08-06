let score, timer, cursors, scoreText, carVelocity, carPosX, carPosY, car, dragons, greenDragons, vision

let Sewer = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function sewer () { Phaser.Scene.call(this, { key: 'sewer', active: false }) },

    init: function (data) {
        score = data.score
        carPosX = data.carPosX
        carPosY = data.carPosY
        carVelocity = data.carVelocity
    },

    create: function () {
        let scoringActive
        this.time.addEvent({
            delay: 500,
            loop: false,
            callback: () => {
                scoringActive = true
            }
        })

        this.time.addEvent({
            delay: 14200,
            loop: false,
            callback: () => {
                rt.destroy()
                sewerItems.setAlpha(1)
                carVelocity = 550
                this.lights.enable()
                dragons.children.iterate(object => {
                    object.setVisible(true)
                })
                greenDragons.children.iterate(object => {
                    object.setVisible(true)
                })
            }
        })

        timer = this.time.addEvent({
            delay: 21300,
            loop: false,
            callback: () => {
                this.cameras.main.fadeOut(100, 255, 255, 255)
            }
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            carVelocity = 250
            this.scene.start('desert', { score: score, carPosX: car.body.position.x, carPosY: car.body.position.y, carVelocity: carVelocity })
        })

        let camera = this.cameras.main;
        camera.setBackgroundColor('#2D313C')

        this.physics.world.setBounds(0, 0, 3200, 1920);
        const map = this.make.tilemap({key: 'drive'}); 

        const sewerTurn = map.addTilesetImage('SewerTileTurn', 'SewerTileTurn')
        const sewerStraight = map.addTilesetImage('SewerTileStraight', 'SewerTileStraight')
        const sewerTiles = [sewerTurn, sewerStraight]

        const tileset = map.addTilesetImage('roadEW', 'roadEW')
        const tileset2 = map.addTilesetImage('roadNE', 'roadNE')
        const allTiles = [tileset, tileset2]
        const backgroundTile = map.addTilesetImage('SewerBackground', 'SewerBackground')
        
        const roadLayer = map.createLayer('Sewer Road', sewerTiles)
        const pathLayer = map.createLayer('Sewer Footpath', sewerTiles)
        let RatLayer = map.getObjectLayer('Sheep')['objects']
        const backgroundLayer = map.createLayer('Sewer Background', backgroundTile)
        backgroundLayer.setAlpha(0.5)
        const dragonLayer = map.getObjectLayer('Dragons')['objects']
        const greenDragonLayer = map.getObjectLayer('GreenDragons')['objects']

        dragons = this.physics.add.group()
        dragonLayer.forEach(object => {
            dragons.create(object.x, object.y, 'redDragon').setScale(1).setVelocity(Phaser.Math.Between(-50, 50)).setBounce(1).setVisible(false).setSize(10, 10).setAlpha(0.7)
            dragons.create(object.x, object.y, 'redDragon').setScale(1).setVelocity(Phaser.Math.Between(-100, 100)).setBounce(1).setVisible(false).setSize(10, 10).setAlpha(0.7)
        })
        greenDragons = this.physics.add.group()
        greenDragonLayer.forEach(object => {
            greenDragons.create(object.x, object.y, 'greenDragon').setScale(1.2).setVelocity(Phaser.Math.Between(-50, 50)).setBounce(1).setVisible(false).setSize(10, 10).setAlpha(0.7)
            greenDragons.create(object.x, object.y, 'greenDragon').setScale(1.2).setVelocity(Phaser.Math.Between(-100, 100)).setBounce(1).setVisible(false).setSize(10, 10).setAlpha(0.7)
        })

        let rats = this.physics.add.group()
        RatLayer.forEach(object => {
            let obj = rats.create(object.x, object.y, 'rat')            
            obj.setSize(50, 50, true)
            obj.setScale(1)
            obj.setOrigin(0,1)
        })

        
        backgroundLayer.setPipeline('Light2D');
        this.lights.enable();
        this.lights.setAmbientColor('#2D313C');
        let light = this.lights.addLight(0, 0, 200);

        for (let i = 100; i < 3200; i+=400) {
        this.lights.addLight(i, 100, 240).setColor(0xff0000).setIntensity(3.0);
        this.lights.addLight(i, 200, 240).setColor(0x00ff00).setIntensity(3.0);
        this.lights.addLight(i, 300, 240).setColor(0xff00ff).setIntensity(3.0);
        this.lights.addLight(i, 400, 240).setColor(0xffff00).setIntensity(3.0);
        this.lights.addLight(i, 500, 240).setColor(0x00ffff).setIntensity(3.0);
        this.lights.addLight(i, 600, 240).setColor(0x0000ff).setIntensity(3.0);
        this.lights.addLight(i, 700, 240).setColor(0xff69b4).setIntensity(3.0);
        this.lights.addLight(i, 800, 240).setColor(0xff0000).setIntensity(3.0);
        this.lights.addLight(i, 900, 240).setColor(0x00ff00).setIntensity(3.0);
        this.lights.addLight(i, 1000, 240).setColor(0xff00ff).setIntensity(3.0);
        this.lights.addLight(i, 1100, 240).setColor(0xffff00).setIntensity(3.0);
        this.lights.addLight(i, 1200, 240).setColor(0x00ffff).setIntensity(3.0);
        this.lights.addLight(i, 1300, 240).setColor(0x0000ff).setIntensity(3.0);
        this.lights.addLight(i, 1400, 240).setColor(0xff69b4).setIntensity(3.0);
        this.lights.addLight(i, 1500, 240).setColor(0xff00ff).setIntensity(3.0);
        this.lights.addLight(i, 1600, 240).setColor(0xffff00).setIntensity(3.0);
        this.lights.addLight(i, 1700, 240).setColor(0x00ffff).setIntensity(3.0);
        this.lights.addLight(i, 1800, 240).setColor(0x0000ff).setIntensity(3.0);
        this.lights.addLight(i, 1900, 240).setColor(0xff69b4).setIntensity(3.0);
        }

        this.lights.disable()

        const width = 3200
	    const height = 1920

        const rt = this.make.renderTexture({
            width,
            height
	    }, true)
        rt.fill(0x000000, 1)
        rt.setTint(0x0a2948)

        car = this.physics.add.image(carPosX, carPosY, 'gator')
        car.setSize(70, 70, true)

        let sewerItems = this.physics.add.group()

        let speakers = map.getObjectLayer('Speakers Right')['objects']
        let speakersLeft = map.getObjectLayer('Speakers Left')['objects']
        speakers.forEach(object => { sewerItems.add(this.add.image(object.x, object.y, 'speaker')) })
        speakersLeft.forEach(object => { sewerItems.add(this.add.image(object.x, object.y, 'speakerLeft')) })
        sewerItems.setOrigin(0, 1).setAlpha(0.7)

        sewerItems.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                }
            })
        })

        sewerItems.setAlpha(0)

        let CollisionLayer = map.createLayer('Footpath', allTiles)
        CollisionLayer.setAlpha(0)

        vision = this.make.image({
            x: car.x,
            y: car.y,
            key: 'vision',
            add: false
        })
        vision.scale = 0.2

        rt.mask = new Phaser.Display.Masks.BitmapMask(this, vision)
	    rt.mask.invertAlpha = true

        map.setCollisionBetween(0, 923, true, 'Footpath')
        this.physics.add.collider(car, CollisionLayer)
        this.physics.add.overlap(car, rats, hitRat, null, this)
        
        this.cameras.main.setBounds(0, 0, 3200, 1920);
        this.cameras.main.startFollow(car);
        
        car.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(dragons, CollisionLayer)
        this.physics.add.collider(greenDragons, CollisionLayer)
        this.anims.create ({
            key: 'dragonup',
            frames: this.anims.generateFrameNumbers('redDragon', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create ({
            key: 'dragonright',
            frames: this.anims.generateFrameNumbers('redDragon', { start: 3, end: 5 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create ({
            key: 'dragondown',
            frames: this.anims.generateFrameNumbers('redDragon', { start: 6, end: 8 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create ({
            key: 'dragonleft',
            frames: this.anims.generateFrameNumbers('redDragon', { start: 9, end: 11 }),
            frameRate: 8,
            repeat: -1
        })

        this.anims.create ({
            key: 'greenDragon',
            frames: this.anims.generateFrameNumbers('greenDragon', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        })

        dragons.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(10, 35))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                }
            })
        })

        greenDragons.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(10, 35))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                }
            })
        })

        greenDragons.children.entries.forEach(dragon => {
                dragon.anims.play('greenDragon', true)
        })

        this.add.image(0, 0, 'scoreBackground').setScale(0.55, 0.65).setOrigin(0).setScrollFactor(0)
        this.add.image(40, 25, 'scoreCoin').setScale(0.6).setScrollFactor(0)
        let add = this.add
        WebFont.load({
        google: {
            families: [ 'Fredoka One' ]
        },
        active: function () {
            scoreText = add.text(70, 12, score, { fontFamily: 'Fredoka One', fontSize: '25px', fill: '#ff3333', stroke: '#ffffff', strokeThickness: 8, shadow: {offsetY: 4, offsetX: 2, color: 'white', fill: true} }).setScrollFactor(0)
        }
    });

    let winSound = this.sound.add('slurp', {
        volume: 0.3,
    })

        function hitRat (gator, rat) {
            winSound.play()
            carVelocity += 20
            rat.disableBody(true, true)
            score += 10
            if (scoringActive) {
                scoreText.setText(score);
            }
        }

        this.events.on('blur', () => {
            timer.paused = true
        })
        this.events.on('focus', () => {
            timer.paused = false
        })
    },

    update: function () {
        if (vision){
		vision.x = car.x
		vision.y = car.y
	}
        if (cursors.left.isDown && cursors.up.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.setVelocityY((carVelocity * -1))
            car.angle = 305
        } else if (cursors.right.isDown && cursors.up.isDown) {
            car.setVelocityX(carVelocity)
            car.setVelocityY((carVelocity * -1))
            car.angle = 35
        } else if (cursors.right.isDown && cursors.down.isDown) {
            car.setVelocityX(carVelocity)
            car.setVelocityY(carVelocity)
            car.angle = 125
        } else if (cursors.left.isDown && cursors.down.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.setVelocityY(carVelocity)
            car.angle = 215
        } else if (cursors.left.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.angle = 260
        } else if (cursors.right.isDown) {
            car.setVelocityX(carVelocity)
            car.angle = 80
        } else if (cursors.up.isDown) {
            car.setVelocityY((carVelocity * -1))
            car.angle = 350
        } else if (cursors.down.isDown) {
            car.setVelocityY(carVelocity)
            car.angle = 170
        } else {
            car.setVelocityX(0)
            car.setVelocityY(0)
        } 
        this.lights.lights.forEach(function (currLight) {
            if (currLight.x < 3200) {
                currLight.x += Phaser.Math.Between(-50, 50)
            } else {
                currLight.x = 0
            }
            if (currLight.y < 1920) {
                currLight.y += Phaser.Math.Between(-50, 50)
            } else {
                currLight.y = 0
            }
    });
        dragons.children.entries.forEach(dragon => {
            if (dragon.body.velocity.x > 0) {
                dragon.anims.play('dragonright', true)
            } else if (dragon.body.velocity.x < 0) {
                dragon.anims.play('dragonleft', true)
            } else if (dragon.body.velocity.y > 0) {
                dragon.anims.play('dragondown', true)
            } else if (dragon.body.velocity.y < 0) {
                dragon.anims.play('dragonup', true)
            }
        })
        greenDragons.children.entries.forEach(dragon => {
            if (dragon.body.velocity.x > 0) {
                dragon.flipX = false
            } else if (dragon.body.velocity.x < 0) {
                dragon.flipX = true
            }
        })
    }
})

export default Sewer