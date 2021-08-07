let score, timer, cursors, scoreText, carVelocity, carPosX, carPosY, car, sheeps, particles

let Village = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 

function village () { Phaser.Scene.call(this, { key: 'village', active: false })},

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
        delay: 28500,
        loop: false,
        callback: () => {
            this.cameras.main.fadeOut(100, 255, 255, 255)
        }
    })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.sound.play('engine')
        carVelocity = 250
        this.scene.start('office', { score: score, carPosX: car.body.position.x, carPosY: car.body.position.y, carVelocity: carVelocity })
    })

    this.physics.world.setBounds(0, 0, 3200, 1920);

    const map = this.make.tilemap({key: 'drive'}) 
    const villageTiles = map.addTilesetImage('Serene_Village_48x48', 'Serene_Village_48x48')
    
    map.createLayer('Village Background', villageTiles)
    map.createLayer('Village Road', villageTiles)
    let CollisionLayer = map.createLayer('Village Footpath', villageTiles)
    let SheepLayer = map.getObjectLayer('Sheep')['objects']

    let bloodParticles = this.add.particles('blood')

    car = this.physics.add.sprite(carPosX, carPosY, 'tractor').setScale(3)
    car.setSize(15, 15, true)

    let buildings = this.add.group()
    buildings.add(this.add.image(1473, 620, 'smallRedHouse').setScale(1))
    buildings.add(this.add.image(2008, 1031, 'smallRedHouse').setScale(1))
    buildings.add(this.add.image(2512, 1440, 'smallRedHouse').setScale(1))
    buildings.add(this.add.image(596, 180, 'smallBlueHouse').setScale(1))
    buildings.add(this.add.image(860, 1111, 'smallBlueHouse').setScale(1))
    buildings.add(this.add.image(1299, 651, 'smallBlueHouse').setScale(1))
    buildings.add(this.add.image(2040, 400, 'smallBlueHouse').setScale(1))
    buildings.add(this.add.image(2423, 548, 'smallBlueHouse').setScale(1))
    buildings.add(this.add.image(788, 485, 'smallGreenHouse').setScale(1))
    buildings.add(this.add.image(1660, 651, 'smallGreenHouse').setScale(1))
    buildings.add(this.add.image(2040, 727, 'smallGreenHouse').setScale(1))
    buildings.add(this.add.image(2800, 213, 'smallGreenHouse').setScale(1))
    buildings.add(this.add.image(1251, 216, 'blueHouse').setScale(1))
    buildings.add(this.add.image(1600, 1030, 'blueHouse').setScale(1))
    buildings.add(this.add.image(2916, 1623, 'blueHouse').setScale(1))
    buildings.add(this.add.image(865, 216, 'redHouse').setScale(1))
    buildings.add(this.add.image(1100, 1109, 'redHouse').setScale(1))
    buildings.add(this.add.image(2688, 1048, 'redHouse').setScale(1))
    buildings.add(this.add.image(1637, 215, 'greenHouse').setScale(1))
    buildings.add(this.add.image(548, 1111, 'greenHouse').setScale(1))
    buildings.add(this.add.image(1956, 1429, 'greenHouse').setScale(1))
    buildings.add(this.add.image(260, 220, 'trees1').setScale(1))
    buildings.add(this.add.image(580, 925, 'trees1').setScale(1))
    buildings.add(this.add.image(200, 1500, 'trees1').setScale(1))
    buildings.add(this.add.image(1025, 1500, 'trees1').setScale(1))
    buildings.add(this.add.image(1900, 1692, 'trees1').setScale(1))
    buildings.add(this.add.image(580, 1500, 'trees2').setScale(1))
    buildings.add(this.add.image(1091, 925, 'trees2').setScale(1))
    buildings.add(this.add.image(2370, 160, 'trees2').setScale(1))
    buildings.add(this.add.image(1924, 220, 'trees2').setScale(1))
    buildings.add(this.add.image(2433, 1236, 'trees3').setScale(1))
    buildings.add(this.add.image(20, 930, 'trees3').setScale(1)).setOrigin(0,0)
    buildings.add(this.add.image(1411, 1500, 'trees3').setScale(1)).setOrigin(0,0)

    buildings.children.entries.forEach(object => {
        this.tweens.add({
            targets: object,
            props: {
                y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
            }
        })
    })
    
    sheeps = this.physics.add.group()
    
    this.anims.create ({
        key: 'up',
        frames: this.anims.generateFrameNumbers('sheep', { start: 0, end: 3 }),
        frameRate: 17.65,
        repeat: -1
    })

    this.anims.create ({
        key: 'left',
        frames: this.anims.generateFrameNumbers('sheep', { start: 4, end: 7 }),
        frameRate: 17.65,
        repeat: -1
    })

    this.anims.create ({
        key: 'down',
        frames: this.anims.generateFrameNumbers('sheep', { start: 8, end: 11 }),
        frameRate: 17.65,
        repeat: -1
    })

    this.anims.create ({
        key: 'right',
        frames: this.anims.generateFrameNumbers('sheep', { start: 12, end: 15 }),
        frameRate: 17.65,
        repeat: -1
    })
    
    this.anims.create ({
        key: 'tractorUp',
        frames: this.anims.generateFrameNumbers('tractor', { start: 14, end: 20 }),
        frameRate: 17.65,
        repeat: -1
    })

    this.anims.create ({
        key: 'tractorLeft',
        frames: this.anims.generateFrameNumbers('tractor', { start: 7, end: 13 }),
        frameRate: 17.65,
        repeat: -1
    })

    this.anims.create ({
        key: 'tractorDown',
        frames: this.anims.generateFrameNumbers('tractor', { start: 0, end: 6 }),
        frameRate: 17.65,
        repeat: -1
    })

    this.anims.create ({
        key: 'tractorRight',
        frames: this.anims.generateFrameNumbers('tractor', { start: 7, end: 13 }),
        frameRate: 17.65,
        repeat: -1
    })

    this.anims.create ({
        key: 'tractorStop',
        frames: [{ key: 'tractor', frame: 0 }],
        frameRate: 20,
    })

    SheepLayer.forEach(object => {
        let obj = sheeps.create(object.x, object.y, 'sheep')
        obj.setOrigin(0, 1)
        obj.setSize(50, 50, true)
        obj.setVelocity(Phaser.Math.Between(-20, 20), Phaser.Math.Between(-20, 20))
        obj.setBounce(1)
    })

    map.setCollisionBetween(0, 923, true, 'Footpath')
    this.physics.add.collider(car, CollisionLayer)
    this.physics.add.collider(sheeps, CollisionLayer)
    this.physics.add.overlap(car, sheeps, hitSheep, null, this)

    this.cameras.main.setBounds(0, 0, 3200, 1920);
    this.cameras.main.startFollow(car);
    
    car.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

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

    particles = this.add.particles('smoke')
    particles.createEmitter({
        lifespan: 1000,
        speedY: -100,
        quantity: 1,
        scale: { start: 0.1, end: 1},
        alpha: { start: 0.5, end: 0 },
        on: false
    })

    bloodParticles.createEmitter({
        lifespan: 30000,
        speed: 0,
        quantity: 1,
        scale: 0.2,
        on: false
    })

    function hitSheep (car, sheep) {
        sheep.disableBody(true, true)
        bloodParticles.emitParticleAt((car.body.position.x + 50), (car.body.position.y + 50))
        this.sound.play('sheepSound', { volume: 0.6 })
        this.sound.play('crash', { volume: 0.5 })
        score += 10
        if (scoringActive) {
            scoreText.setText(score)
        }
        if (sheeps.countActive(true) === 3) {
            sheeps.children.iterate(function (child) {
                child.enableBody(true, child.x, child.y, true, true)
            })
        }
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
        particles.emitParticleAt((car.body.position.x + 70), (car.body.position.y + 70))
    } else if (cursors.right.isDown && cursors.up.isDown) {
        car.setVelocityX(carVelocity)
        car.setVelocityY((carVelocity * -1))
        particles.emitParticleAt((car.body.position.x + 0), (car.body.position.y + 70))
    } else if (cursors.right.isDown && cursors.down.isDown) {
        car.setVelocityX(carVelocity)
        car.setVelocityY(carVelocity)
        particles.emitParticleAt(car.body.position.x, (car.body.position.y + 0))
    } else if (cursors.left.isDown && cursors.down.isDown) {
        car.setVelocityX((carVelocity * -1))
        car.setVelocityY(carVelocity)
        particles.emitParticleAt((car.body.position.x + 70), (car.body.position.y + 0))
    } else if (cursors.left.isDown) {
        car.setVelocityX((carVelocity * -1))
        car.anims.play('tractorLeft', true)
        car.flipX = true
        particles.emitParticleAt((car.body.position.x - 18), (car.body.position.y - 20))
    } else if (cursors.right.isDown) {
        car.setVelocityX(carVelocity)
        car.anims.play('tractorRight', true)
        car.flipX = false
        particles.emitParticleAt((car.body.position.x + 53), (car.body.position.y - 18))
    } else if (cursors.up.isDown) {
        car.setVelocityY((carVelocity * -1))
        car.anims.play('tractorUp', true)
        car.flipX = false
        particles.emitParticleAt((car.body.position.x + 45), (car.body.position.y))
    } else if (cursors.down.isDown) {
        car.setVelocityY(carVelocity)
        car.anims.play('tractorDown', true)
        car.flipX = false
        particles.emitParticleAt((car.body.position.x + 8), (car.body.position.y + 18))
    } else {
        car.setVelocityX(0)
        car.setVelocityY(0)
    }  
    sheeps.children.entries.forEach(sheep => {
        if (sheep.body.velocity.x > 0) {
            sheep.anims.play('right', true)
        } else if (sheep.body.velocity.x < 0) {
            sheep.anims.play('left', true)
        } else if (sheep.body.velocity.y > 0) {
            sheep.anims.play('down', true)
        } else if (sheep.body.velocity.y < 0) {
            sheep.anims.play('up', true)
        }
    })
}
})

export default Village