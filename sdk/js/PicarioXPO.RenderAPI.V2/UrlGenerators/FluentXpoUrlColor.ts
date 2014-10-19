class FluentXpoUrlColor {
    private xpoUrlColor: XpoUrlColor;

    /*
     * Creates a new instance of the FluentXpoUrlColor
     */
    constructor(color: string) {
        this.xpoUrlColor = new XpoUrlColor(color);
    }

    /*
     * Returns the wrapped XpoUrlColor
     */
    getXpoUrlColor(): XpoUrlColor { return this.xpoUrlColor; }
}