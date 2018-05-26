/// <reference path="./phaser.d.ts"/>

import "phaser";
import { MainScene } from "./scenes/mainScene"
import { BootScene } from "./scenes/bootScene"
import { Utils, Resolution } from "./helpers/utils";

// main game configuration
const config: GameConfig = {
    title: "UrGame",
    width: 540,
    height: 960,
    type: Phaser.WEBGL,
    parent: "game",
    scene: [BootScene, MainScene],
    backgroundColor: "#457b9d",
    resolution: window.devicePixelRatio || 1,
    "render.pixelArt": true
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.onload = () => {
    let game = new Game(config),
        resolution: Resolution = Utils.getResolution()

    // game.resize(resolution.width, resolution.height)
    window["game"] = game
    // Utils.resize()
    // window.addEventListener("resize", Utils.resize, false)
};
