export class Utils {
    static getResolution(): Resolution {
        let canvas = document.querySelector("canvas"),
            width = window.innerWidth * window.devicePixelRatio,
            height = window.innerHeight * window.devicePixelRatio,
            wratio = width / height,
            ratio = canvas.width / canvas.height;
        if (wratio < ratio) {
            return new Resolution(width, width / height, 1)
        } else {
            return new Resolution(height * ratio, height, 1)
        }
    }
}

export class Resolution {
    constructor(public width: number, public height: number, public scaleRatio: number) { }
}
