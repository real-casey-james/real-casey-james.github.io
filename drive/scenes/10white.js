let White = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function white () { Phaser.Scene.call(this, { key: 'white', active: false }) },

    create: function () {
        let camera = this.cameras.main;
        camera.setBackgroundColor('#ffffff')
    },
})

export default White