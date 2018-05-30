/// <reference path="./phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene"
import { BootScene } from "./scenes/bootScene"

// main game configuration
const config: GameConfig = {
    title: "UrGame",
    width: 540,
    height: 960,
    type: Phaser.WEBGL,
    parent: "game",
    scene: [BootScene, MainScene],
    backgroundColor: "#457b9d",
    "render.pixelArt": true,
    "render.roundPixels": true,

};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

function initialize(game: any): void {
    function resize() {
        let width, height,
            w = window.innerWidth,
            h = window.innerHeight,
            scale = Math.min(w / 540, h / 960);

        game.canvas.setAttribute('style',
            ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
            ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' +
            ' transform-origin: top left;'
        );

        width = w / scale;
        height = h / scale;
        game.resize(width, height);
        game.scene.scenes.forEach(function (scene) {
            if (scene.cameras.main) scene.cameras.main.setViewport(0, 0, width, height);
        });
    }

    game.events.once('ready', resize);
}

// when the page is loaded, create our game instance
window.onload = () => {
    let game = new Game(config)
    initialize(game)
    window["game"] = game
}
