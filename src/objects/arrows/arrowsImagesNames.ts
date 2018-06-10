export default class ArrowsImagesNames {
    public N: string
    public NE: string
    public NW: string
    public S: string
    public SE: string
    public SW: string

    constructor(prefix) {
        let directions: string[] = ["N", "NE", "NW", "S", "SE", "SW"]

        directions.forEach(d => {
            this[d] = prefix + d
        })
    }
}
