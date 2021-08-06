let score, timer, cursors, scoreText, carVelocity, carPosX, carPosY, car

let Desert = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function desert () { Phaser.Scene.call(this, { key: 'desert', active: false }) },

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
            rainbowParticles.resume()
            carVelocity = 600
        }
        })

        timer = this.time.addEvent({
            delay: 21500,
            loop: false,
            callback: () => {
                this.cameras.main.fadeOut(100, 255, 255, 255)
            }
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('sky', { score: score, carPosX: car.body.position.x, carPosY: car.body.position.y, carVelocity: carVelocity })
        })

        let camera = this.cameras.main;

        this.physics.world.setBounds(0, 0, 3200, 1920);
        const map = this.make.tilemap({key: 'drive'}); 

        const desertTiles = map.addTilesetImage('desert', 'desert')
        const desertObjects = map.addTilesetImage('desertObjects', 'desertObjects')

        const tileset = map.addTilesetImage('roadEW', 'roadEW')
        const tileset2 = map.addTilesetImage('roadNE', 'roadNE')
        const allTiles = [tileset, tileset2]

        map.createLayer('Desert Background', desertTiles)
        const pathLayer = map.createLayer('Desert Footpath', desertTiles)

        const roadLayer = map.createLayer('Desert Road', desertTiles)
        
        
        map.createLayer('Desert Objects', desertObjects)
        let PyramidLayer = map.getObjectLayer('Desert Pyramids')['objects']
        let rainbowParticles = this.add.particles('rainbow')
        let pyramids = this.physics.add.group()
        PyramidLayer.forEach(object => {
            let obj = pyramids.create(object.x, object.y, 'pyramid') 
            obj.setOrigin(0,1)  
        })
        map.createLayer('Desert Mask', desertTiles)
        
        car = this.physics.add.sprite(carPosX, carPosY, 'camel').setScale(1.5)
        car.setSize(50, 50, true)
        

        let DartLayer = map.getObjectLayer('Sheep')['objects']
        
        let darts = this.physics.add.group()
        DartLayer.forEach(object => {
            let obj = darts.create(object.x, object.y, 'durry')            
            obj.setSize(50, 50, true)
            obj.setScale(0.6)
            obj.setOrigin(0,1)
        })

        this.anims.create({
            key: 'camelDown',
            frames: this.anims.generateFrameNumbers('camel', { start: 54, end: 56 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'camelLeft',
            frames: this.anims.generateFrameNumbers('camel', { start: 66, end: 68 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'camelRight',
            frames: this.anims.generateFrameNumbers('camel', { start: 78, end: 80 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'camelUp',
            frames: this.anims.generateFrameNumbers('camel', { start: 90, end: 92 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'camelStop',
            frames: [{ key: 'camel', frame: 55 }],
            frameRate: 20
        })

        pyramids.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                },
            })
        })

        let CollisionLayer = map.createLayer('Footpath', allTiles)
        CollisionLayer.setAlpha(0)
        
        map.setCollisionBetween(0, 923, true, 'Footpath')
        this.physics.add.collider(car, CollisionLayer)
        this.physics.add.overlap(car, darts, hitDart, null, this)
        
        this.cameras.main.setBounds(0, 0, 3200, 1920);
        this.cameras.main.startFollow(car);
        
        car.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();

        let smokeParticles = this.add.particles('smoke')
        smokeParticles.createEmitter({
            lifespan: 2000,
            quantity: 1,
            scale: { start: 1, end: 4},
            alpha: { start: 1, end: 0 },
            on: false
        })

        PyramidLayer.forEach(object => {
            rainbowParticles.createEmitter({
                x: object.x + 110,
                y: object.y - 230,
                lifespan: 2000,
                quantity: 1,
                scale: 0.2,
                alpha: { start: 0.2, end: 0 },
                speedY: -400,
                rotate: 90,
                frequency: 100,
                active: true,
                origin: {x: 0, y: 1}
            })
        })
        rainbowParticles.pause()
        
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

        function hitDart (camel, cig) {
            this.sound.play('exhale')
            carVelocity += 10
            cig.disableBody(true, true)
            score += 10
            smokeParticles.emitParticleAt((car.body.position.x + 70), (car.body.position.y + 70))
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
        if (cursors.left.isDown && cursors.up.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.setVelocityY((carVelocity * -1))
        } else if (cursors.right.isDown && cursors.up.isDown) {
            car.setVelocityX(carVelocity)
            car.setVelocityY((carVelocity * -1))
        } else if (cursors.right.isDown && cursors.down.isDown) {
            car.setVelocityX(carVelocity)
            car.setVelocityY(carVelocity)
        } else if (cursors.left.isDown && cursors.down.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.setVelocityY(carVelocity)
        } else if (cursors.left.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.anims.play('camelLeft', true)
        } else if (cursors.right.isDown) {
            car.setVelocityX(carVelocity)
            car.anims.play('camelRight', true)
        } else if (cursors.up.isDown) {
            car.setVelocityY((carVelocity * -1))
            car.anims.play('camelUp', true)
        } else if (cursors.down.isDown) {
            car.setVelocityY(carVelocity)
            car.anims.play('camelDown', true)
        } else {
            car.setVelocityX(0)
            car.setVelocityY(0)
            car.anims.play('camelStop', true)
        } 
    }
})

export default Desert