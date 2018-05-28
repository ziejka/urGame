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
    "render.roundPixels": true
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    let game = new Game(config)
    window["game"] = game
}
