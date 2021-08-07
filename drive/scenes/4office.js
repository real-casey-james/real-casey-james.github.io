let score, timer, cursors, scoreText, carVelocity, carPosX, carPosY, car

let Office = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function office () { Phaser.Scene.call(this, { key: 'office', active: false })},

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
            delay: 28800,
            loop: false,
            callback: () => {
                this.cameras.main.fadeOut(100, 255, 255, 255)
            }
        })

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.sound.play('engine')
            this.scene.start('water', { score: score, carPosX: car.body.position.x, carPosY: car.body.position.y, carVelocity: carVelocity })
        })

        this.physics.world.setBounds(0, 0, 3200, 1920)

        const map = this.make.tilemap({key: 'drive'})

        const officeTiles = map.addTilesetImage('Modern_Office_64x64', 'Modern_Office_64x64')

        const tileset = map.addTilesetImage('roadEW', 'roadEW')
        const tileset2 = map.addTilesetImage('roadNE', 'roadNE')
        const allTiles = [tileset, tileset2]

        map.createLayer('Office Background', officeTiles)
        map.createLayer('Office Objects', officeTiles)
        map.createLayer('Office Road', officeTiles)

        car = this.physics.add.sprite(carPosX, carPosY, 'printerDown').setScale(0.2)
        car.setSize(500, 300, true)

        this.anims.create({ key: 'printerUp', frames: [{ key: 'printerUp' }], repeat: -1})
        this.anims.create({ key: 'printerDown', frames: [{ key: 'printerDown' }], repeat: -1})
        this.anims.create({ key: 'printerLeft', frames: [{ key: 'printerLeft' }], repeat: -1})
        this.anims.create({ key: 'printerRight', frames: [{ key: 'printerRight' }], repeat: -1})

        map.createLayer('OfficePath', officeTiles)
        map.createLayer('Office Desk Objects', officeTiles)
        let CollisionLayer = map.createLayer('Footpath', allTiles)
        CollisionLayer.setAlpha(0)

        let StarLayer = map.getObjectLayer('Sheep')['objects']
        let waterCoolers = map.getObjectLayer('Office Water Coolers')['objects']

        let coolers = this.add.group()
        let stars = this.physics.add.group()
          
        StarLayer.forEach(object => {
            let obj = stars.create(object.x, object.y, 'paper')
            obj.setOrigin(-1, 2)
            obj.setSize(150, 150, true)
            obj.setScale(0.3)
        })

        waterCoolers.forEach(object => {
            let obj = coolers.add(this.add.image(object.x, object.y, 'cooler'))
            obj.setOrigin(0.5, 0.1)
        })     

        map.setCollisionBetween(0, 923, true, 'Footpath')
        this.physics.add.collider(car, CollisionLayer)
        this.physics.add.overlap(car, stars, hitStar, null, this)

        this.cameras.main.setBounds(0, 0, 3200, 1920)
        this.cameras.main.startFollow(car)
        
        car.setCollideWorldBounds(true)

        cursors = this.input.keyboard.createCursorKeys()
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
        })

        function hitStar (copierA, star) {
            this.sound.play('printer')
            star.destroy()
            score += 10;
            carVelocity += 20
            if (scoringActive) {
                scoreText.setText(score);
            }
        }

        coolers.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                }
            })
        })
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
        } else if (cursors.right.isDown) {
            car.setVelocityX(carVelocity)
        } else if (cursors.up.isDown) {
            car.setVelocityY((carVelocity * -1))
        } else if (cursors.down.isDown) {
            car.setVelocityY(carVelocity)
        } else {
            car.setVelocityX(0)
            car.setVelocityY(0)
        }    
        if (car.body.velocity.x > 0) {
            car.anims.play('printerRight', true)
        } else if (car.body.velocity.x < 0) {
            car.anims.play('printerLeft', true)
        } else if (car.body.velocity.y > 0) {
            car.anims.play('printerDown', true)
        } else if (car.body.velocity.y < 0) {
            car.anims.play('printerUp', true)
        }
    }
})

export default Office