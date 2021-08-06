let score, timer, cursors, scoreText, carVelocity, carPosX, carPosY, duck

let Water = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 

function waterScene () { Phaser.Scene.call(this, { key: 'water', active: false })},

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
        delay: 29000,
        loop: false,
        callback: () => {
            this.cameras.main.fadeOut(100, 255, 255, 255)
        }
    })

    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.sound.play('engine')
        carVelocity = 250
        this.scene.start('sewer', { score: score, carPosX: duck.body.position.x, carPosY: duck.body.position.y, carVelocity: carVelocity })
    })

    this.physics.world.setBounds(0, 0, 3200, 1920);

    const map = this.make.tilemap({key: 'drive'});   
    const villageTiles = map.addTilesetImage('Serene_Village_48x48', 'Serene_Village_48x48')
    
    map.createLayer('Water Background', villageTiles)
    map.createLayer('Water Road', villageTiles)
    let CollisionLayer = map.createLayer('Water Footpath', villageTiles)
    let StarLayer = map.getObjectLayer('Sheep')['objects']

    let stars = this.physics.add.group()
      
    StarLayer.forEach(object => {
        let obj = stars.create(object.x, object.y, 'bread')
        obj.setSize(150, 150, true)
        obj.setScale(0.5)
    })

    duck = this.physics.add.sprite(carPosX, carPosY, 'duckSprite').setScale(2)
    duck.setSize(30, 30, true)

    this.anims.create({
        key: 'duckDown',
        frames: this.anims.generateFrameNumbers('duckSprite', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'duckLeft',
        frames: this.anims.generateFrameNumbers('duckSprite', { start: 15, end: 17 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'duckRight',
        frames: this.anims.generateFrameNumbers('duckSprite', { start: 27, end: 29 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'duckUp',
        frames: this.anims.generateFrameNumbers('duckSprite', { start: 39, end: 41 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'duckStop',
        frames: [{ key: 'duckSprite', frame: 4 }],
        frameRate: 20
    })

    let balls = map.getObjectLayer('Beach Ball')['objects']
    let bushes = map.getObjectLayer('Bush')['objects']
    let cats = map.getObjectLayer('Cat')['objects']
    let chicks = map.getObjectLayer('Chicken')['objects']
    let dangers = map.getObjectLayer('Sign')['objects']
    let foxes = map.getObjectLayer('Fox')['objects']
    let beetroots = map.getObjectLayer('Radishes')['objects']
    let carrots = map.getObjectLayer('Carrots')['objects']
    let cucumbers = map.getObjectLayer('Cucumber')['objects']
    let tomatoes = map.getObjectLayer('Tomatoes')['objects']
    let pigs = map.getObjectLayer('Pig')['objects']
    let rabbits = map.getObjectLayer('Rabbit')['objects']
    let barrels = map.getObjectLayer('Waste')['objects']
    let shovels = map.getObjectLayer('Shovel')['objects']
    let trees = map.getObjectLayer('Tree')['objects']
    let cans = map.getObjectLayer('WateringCan')['objects']

    let stuff = this.add.group()
    let beachballs = this.physics.add.group()
    
    balls.forEach(object => { beachballs.create(object.x, object.y, 'beachball') })
    bushes.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'bush')) })
    cats.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'cat')) })
    chicks.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'chick').setScale(0.5)) })
    dangers.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'danger')) })
    foxes.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'fox')) })
    beetroots.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'beetroot')) })
    carrots.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'carrots')) })
    cucumbers.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'cucumbers')) })
    tomatoes.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'tomatoes')) })
    pigs.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'pig').setScale(0.5)) })
    rabbits.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'rabbit')) })
    barrels.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'barrel')) })
    shovels.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'shovel')) })
    trees.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'waterTree')) })
    cans.forEach(object => { stuff.add(this.add.image(object.x, object.y, 'wateringCan')) })
    
    stuff.setOrigin(0, 1)
    beachballs.setOrigin(0, 1)

    stuff.children.entries.forEach(object => {
        this.tweens.add({
            targets: object,
            props: {
                y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
            }
        })
    })
    
    this.physics.add.overlap(duck, beachballs, hitBall, null, this)
    
    map.setCollisionBetween(0, 923, true, 'Footpath')
    this.physics.add.collider(duck, CollisionLayer)
    this.physics.add.collider(beachballs, CollisionLayer)
    this.physics.add.overlap(duck, stars, hitStar, null, this)

    this.cameras.main.setBounds(0, 0, 3200, 1920);
    this.cameras.main.startFollow(duck);
    
    duck.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    let breadParticles = this.add.particles('bread')

    breadParticles.createEmitter({
        lifespan: 10000,
        speed: -200,
        quantity: 32,
        scale: { start: 1, end: 2},
        alpha: { start: 0.5, end: 0 },
        on: false,
        angle: { start: 0, end: 360, steps: 32 },
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


    function hitStar (duck, star) {
        this.sound.play('quack')
        star.disableBody(true, true)
        score += 10;
        breadParticles.emitParticleAt((duck.body.position.x + 70), (duck.body.position.y + 70))
        if (scoringActive) {
            scoreText.setText(score);
        }
        if (stars.countActive(true) === 10) {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, child.y, true, true);
            });
        }
    }

    function hitBall (duck, ball) {
        if (ball.body.velocity.x === 0 && duck.body.velocity.x > 0) {
            ball.body.velocity.x = 10
        } else if (ball.body.velocity.x === 0 && duck.body.velocity.x < 0) {
            ball.body.velocity.x = -10
        }
        if (ball.body.velocity.y === 0 && duck.body.velocity.y > 0) {
            ball.body.velocity.y = 10
        } else if (ball.body.velocity.y === 0 && duck.body.velocity.y < 0) {
            ball.body.velocity.y = -10
        }
        if (ball.body.velocity.x > 0 && ball.body.velocity.x < 300) {
            ball.body.velocity.x += 50
        } else if (ball.body.velocity.x < 0 && ball.body.velocity.x > -300) {
            ball.body.velocity.x -= 50
        } 
        if (ball.body.velocity.y > 0 && ball.body.velocity.y < 300) {
            ball.body.velocity.y += 50
        } else if (ball.body.velocity.y < 0 && ball.body.velocity.y > -300) {
            ball.body.velocity.y -= 50
        }
            ball.setBounce(0.8)
            ball.setCollideWorldBounds(true)
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
        duck.setVelocityX((carVelocity * -1))
        duck.setVelocityY((carVelocity * -1))
    } else if (cursors.right.isDown && cursors.up.isDown) {
        duck.setVelocityX(carVelocity)
        duck.setVelocityY((carVelocity * -1))
    } else if (cursors.right.isDown && cursors.down.isDown) {
        duck.setVelocityX(carVelocity)
        duck.setVelocityY(carVelocity)
    } else if (cursors.left.isDown && cursors.down.isDown) {
        duck.setVelocityX((carVelocity * -1))
        duck.setVelocityY(carVelocity)
    } else if (cursors.left.isDown) {
        duck.setVelocityX((carVelocity * -1))
        duck.anims.play('duckLeft', true)
    } else if (cursors.right.isDown) {
        duck.setVelocityX(carVelocity)
        duck.anims.play('duckRight', true)
    } else if (cursors.up.isDown) {
        duck.setVelocityY((carVelocity * -1))
        duck.anims.play('duckUp', true)
    } else if (cursors.down.isDown) {
        duck.setVelocityY(carVelocity)
        duck.anims.play('duckDown', true)
    } else {
        duck.setVelocityX(0)
        duck.setVelocityY(0)
        duck.anims.play('duckStop', true)
    }     
}
})

export default Water