let score, timer, cursors, scoreText, carVelocity, carPosX, carPosY, car, rainbowParticles, rainbowParticlesY, planes

let Sky = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function sky () { Phaser.Scene.call(this, { key: 'sky', active: false }) },

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

        timer = this.time.addEvent({
            delay: 13000,
            loop: false,
            callback: () => {
                this.cameras.main.fadeOut(100, 255, 255, 255)
            }
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('end', { score: score })
        })

        let camera = this.cameras.main;
        camera.setBackgroundColor('#1AD1FF')

        this.add.image(200, 200, 'sun').setScrollFactor(0)
        this.add.image(0, 550, 'skyMid').setScrollFactor(0.1, 0)
        this.add.image(800, 550, 'skyMid').setScrollFactor(0.1, 0)
        this.add.image(0, 450, 'farground').setScrollFactor(0.25, 0)
        this.add.image(800, 450, 'farground').setScrollFactor(0.25, 0)
        this.add.image(0, 550, 'foreground').setScrollFactor(0.5, 0)
        this.add.image(800, 550, 'foreground').setScrollFactor(0.5, 0)

        this.physics.world.setBounds(0, 0, 3200, 1920);
        let map = this.make.tilemap({key: 'drive'}); 
        const skyTiles = map.addTilesetImage('clouds', 'clouds')
        rainbowParticles = this.add.particles('rainbowSection')
        rainbowParticlesY = this.add.particles('rainbowSectionY')

        const tileset = map.addTilesetImage('roadEW', 'roadEW')
        const tileset2 = map.addTilesetImage('roadNE', 'roadNE')
        const allTiles = [tileset, tileset2]

        const rainbowStraight = map.addTilesetImage('Seven-colors_(rainbow)', 'Seven-colors_(rainbow)')
        const rainbowCorner1 = map.addTilesetImage('Rainbow Corner 1', 'Rainbow Corner 1')
        const rainbowCorner2 = map.addTilesetImage('Rainbow Corner 2', 'Rainbow Corner 2')
        const rainbowTiles = [rainbowStraight, rainbowCorner1, rainbowCorner2]

        let rainbowRoad = map.createLayer('Sky Road', rainbowTiles)
        rainbowRoad.forEachTile(tile => {
            tile.alpha = 0
        })

        map.createLayer('Sky Path', skyTiles)
        let EggLayer = map.getObjectLayer('Sheep')['objects']
        let SpaceStationLayer = map.getObjectLayer('SpaceStations')['objects']
        let PlaneLayer = map.getObjectLayer('Planes')['objects']
        let JesusLayer = map.getObjectLayer('Jesus')['objects']

        let skyStuff = this.physics.add.group()
        SpaceStationLayer.forEach(object => {
            let obj = skyStuff.create(object.x, object.y, 'spaceStation')
            obj.setOrigin(0, 1)
            obj.setSize(10, 10)
        })
        JesusLayer.forEach(object => {
            let obj = skyStuff.create(object.x, object.y, 'jesus')
            obj.setOrigin(0, 1)
            obj.setSize(10, 10)
        })

        planes = this.physics.add.group()
        PlaneLayer.forEach(object => {
            let obj = planes.create(object.x, object.y, 'plane')
            obj.setOrigin(0, 1)
            obj.setVelocity(300).setBounce(1)
            obj.setSize(10, 10)
        })
        
        let eggs = this.physics.add.group()
        EggLayer.forEach(object => {
            let obj = eggs.create(object.x, object.y, 'egg')            
            obj.setSize(500, 500, true)
            obj.setScale(0.1)
            obj.setOrigin(0,1)
        })

        car = this.physics.add.sprite(carPosX, carPosY, 'bird').setScale(0.8)
        car.setSize(100, 100, true)

        this.anims.create({
            key: 'birdFlap',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 7 }),
            frameRate: 17.65,
            repeat: -1
        })

        car.anims.play('birdFlap', true)

        skyStuff.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                },
            })
        })

        planes.children.entries.forEach(object => {
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
        this.physics.add.overlap(car, eggs, hitEgg, null, this)

        this.physics.add.overlap(car, rainbowRoad, crossPath, null, this)
        this.physics.add.collider(planes, CollisionLayer)

        this.cameras.main.setBounds(0, 0, 3200, 1920);
        this.cameras.main.startFollow(car);
        
        car.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
        
        let rainbowWin = this.add.particles('gold')
        rainbowWin.createEmitter({
            lifespan: 5000,
            quantity: 10,
            speed: -1000,
            scale: { start: 0.1, end: 0.5},
            alpha: { start: 0.4, end: 0 },
            on: false,
            angle: { start: 0, end: 360, steps: 10 },
            rotate: { start: 0, end: 360, steps: 10 }
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
    
        let winSound = this.sound.add('harp', {
            volume: 0.2,
        })

        function hitEgg (bird, egg) {
            winSound.play()
            carVelocity += 10
            egg.disableBody(true, true)
            score += 10
            rainbowWin.emitParticleAt((car.body.position.x + 70), (car.body.position.y + 70))
            if (scoringActive) {
                scoreText.setText(score);
            }
        }

        function crossPath (bird, path) {
            let tile = map.getTileAt(path.x, path.y, true, rainbowRoad)
            this.tweens.add({
                targets: tile,
                props: {
                    alpha: {value: 0.5, duration: 300, ease: 'Linear', yoyo: false, repeat: 0}
                },
            })
        }

        this.game.events.on('blur', () => {
            timer.paused = true
        })
        this.game.events.on('focus', () => {
            timer.paused = false
        })
    },

    update: function () {
        if (cursors.left.isDown && cursors.up.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.setVelocityY((carVelocity * -1))
            car.angle = 45
            car.setFlipX(false)
        } else if (cursors.right.isDown && cursors.up.isDown) {
            car.setVelocityX(carVelocity)
            car.setVelocityY((carVelocity * -1))
            car.angle = 315
            car.setFlipX(true)
        } else if (cursors.right.isDown && cursors.down.isDown) {
            car.setVelocityX(carVelocity)
            car.setVelocityY(carVelocity)
            car.angle = 45
            car.setFlipX(true)
        } else if (cursors.left.isDown && cursors.down.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.setVelocityY(carVelocity)
            car.angle = 315
            car.setFlipX(false)
        } else if (cursors.left.isDown) {
            car.setVelocityX((carVelocity * -1))
            car.setFlipX(false)
            rainbowParticles.emitParticleAt((car.body.position.x + 0), (car.body.position.y + 50))
            car.angle = 0
        } else if (cursors.right.isDown) {
            car.setVelocityX(carVelocity)
            rainbowParticles.emitParticleAt((car.body.position.x + 0), (car.body.position.y + 50))
            car.setFlipX(true)
            car.angle = 0
        } else if (cursors.up.isDown) {
            car.setVelocityY((carVelocity * -1))
            rainbowParticlesY.emitParticleAt((car.body.position.x + 0), (car.body.position.y + 35))
        } else if (cursors.down.isDown) {
            car.setVelocityY(carVelocity)
            rainbowParticlesY.emitParticleAt((car.body.position.x + 0), (car.body.position.y + 35))
        } else {
            car.setVelocityX(0)
            car.setVelocityY(0)
            car.angle = 0
        } 
        planes.children.entries.forEach(plane => {
            if (plane.body.velocity.x > 0) {
                plane.flipX = false
            } else {
                plane.flipX = true
            }
        })
    }
})

export default Sky