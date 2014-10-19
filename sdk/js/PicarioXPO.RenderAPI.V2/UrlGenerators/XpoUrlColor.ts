class XpoUrlColor {
    private color: string;

    constructor(color: string) {
        this.color = color;
    }

    /*
     * Represents a color from a Picario scene for the XPO URL generator
     */
    getColor(): string { return this.color; }
    setColor(val: string) { this.color = val; }
}