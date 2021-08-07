let score

let End = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function end () { Phaser.Scene.call(this, { key: 'end', active: false }) },

    init: function (data) {
        score = data.score
    },

    create: function () {
        let rubyParticles = this.add.particles('ruby')
        rubyParticles.createEmitter({
            lifespan: 8000,
            frequency: 200,
            speed: 200,
            gravityY: 100,
            scale: 0.4,
            x: 400,
            y: -70,
            rotate: { start: 0, end: 360}
        })
        let coinParticles = this.add.particles('coin')
        coinParticles.createEmitter({
            lifespan: 8000,
            frequency: 200,
            speed: 200,
            gravityY: 100,
            scale: 0.4,
            x: 400,
            y: -70,
            rotate: { start: 0, end: 360}
        })

        let finishItems = this.add.group()

        let add = this.add
        WebFont.load({
        google: {
            families: [ 'Fredoka One' ]
        },
        active: function () {
            add.text(160, 100, 'YOU FINISHED!', { fontFamily: 'Fredoka One', fontSize: '62px', fill: '#ff3333', stroke: '#ffffff', strokeThickness: 8, shadow: {offsetY: 6, offsetX: 3, color: 'white', fill: true} })
            add.text(300, 300, `Score: ${score}`, { fontFamily: 'Fredoka One', fontSize: '32px', fill: '#ff3333', stroke: '#ffffff', strokeThickness: 8, shadow: {offsetY: 4, offsetX: 2, color: 'white', fill: true} })
            }
        })

        this.add.image(220, 277, 'button').setScale(0.7).setOrigin(0)

        finishItems.add(this.add.image(100, 450, 'pig'))
        finishItems.add(this.add.image(700, 450, 'chick'))
        finishItems.children.entries.forEach(object => {
            this.tweens.add({
                targets: object,
                props: {
                    y: {value: `+=${(Phaser.Math.RND.sign() * Phaser.Math.Between(5, 25))}`, duration: 226, ease: 'Cubic', yoyo: true, repeat: -1}
                }
            })
        })
        let camera = this.cameras.main;
        camera.setBackgroundColor('#8CB7F2')
    },
})

export default End