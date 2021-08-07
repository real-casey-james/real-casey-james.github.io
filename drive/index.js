import Start from './scenes/1start.js'
import City from './scenes/2city.js'
import Village from './scenes/3village.js'
import Office from './scenes/4office.js'
import Water from './scenes/5water.js'
import Sewer from './scenes/6sewer.js'
import Desert from './scenes/7desert.js'
import Sky from './scenes/8sky.js'
import End from './scenes/9end.js'
import White from './scenes/10white.js'

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 576,
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [White, End, Sky, Desert, Sewer, Water, Office, Village, City, Start]
};

let game = new Phaser.Game(config);