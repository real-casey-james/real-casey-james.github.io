let timer, car, cursors, scoreText
let score = 0
let carVelocity = 300

let City = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 

function cityScene () { Phaser.Scene.call(this, { key: 'city', active: false })},

create: function () {

    timer = this.time.addEvent({
        delay: 28300,
        loop: false,
        callback: () => {
            this.cameras.main.fadeOut(100, 255, 255, 255)
        }
    })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.sound.play('engine')
        this.scene.start('sceneA', { score: score, carPosX: car.body.position.x, carPosY: car.body.position.y, carVelocity: carVelocity })
    })

    this.physics.world.setBounds(0, 0, 3200, 1920);

    const map = this.make.tilemap({key: 'drive'});   
    const tileset = map.addTilesetImage('roadEW', 'roadEW')
    const tileset2 = map.addTilesetImage('roadNE', 'roadNE')
    const cityTiles = map.addTilesetImage('tiles', 'tiles')
    const allTiles = [tileset, tileset2]
    
    map.createLayer('Buildings', cityTiles)
    map.createLayer('Road', allTiles)
    let CollisionLayer = map.createLayer('Footpath', allTiles)
    let StarLayer = map.getObjectLayer('Sheep')['objects']

    let stars = this.physics.add.group()
      
    StarLayer.forEach(object => {
        let obj = stars.create(object.x, object.y, 'star')
        obj.setOrigin(-1, 2)
        obj.setSize(50, 50, true)
    })

    car = this.physics.add.image(300, 100, 'car').setScale(0.04)
    car.setSize(1200, 1200, true)
    car.angle = 180
    
    map.setCollisionBetween(0, 923, true, 'Footpath')
    this.physics.add.collider(car, CollisionLayer)
    this.physics.add.overlap(car, stars, hitStar, null, this)

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
});

    function hitStar (car, star) {
        this.sound.play('ding')
        star.destroy()
        score += 10;
        carVelocity += 10
        scoreText.setText(score);
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
        car.angle = 45
    } else if (cursors.right.isDown && cursors.up.isDown) {
        car.setVelocityX(carVelocity)
        car.setVelocityY((carVelocity * -1))
        car.angle = 135
    } else if (cursors.right.isDown && cursors.down.isDown) {
        car.setVelocityX(carVelocity)
        car.setVelocityY(carVelocity)
        car.angle = 225
    } else if (cursors.left.isDown && cursors.down.isDown) {
        car.setVelocityX((carVelocity * -1))
        car.setVelocityY(carVelocity)
        car.angle = 315
    } else if (cursors.left.isDown) {
        car.setVelocityX((carVelocity * -1))
        car.angle = 0
    } else if (cursors.right.isDown) {
        car.setVelocityX(carVelocity)
        car.angle = 180
    } else if (cursors.up.isDown) {
        car.setVelocityY((carVelocity * -1))
        car.angle = 90
    } else if (cursors.down.isDown) {
        car.setVelocityY(carVelocity)
        car.angle = 270
    } else {
        car.setVelocityX(0)
        car.setVelocityY(0)
    }    
} 
})

export default City