export default class PawnsMarkers extends Phaser.GameObjects.Container {
    private markers: Phaser.GameObjects.Sprite[]

    constructor(scene: Phaser.Scene) {
        super(scene);
        this.markers = [scene.add.sprite(20, 20, 'blueMark'), scene.add.sprite(50, 20, 'redMark')]
        this.markers.forEach(s => this.add(s))
    }
}
