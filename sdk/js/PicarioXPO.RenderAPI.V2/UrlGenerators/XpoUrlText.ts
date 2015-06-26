class XpoUrlText {
    private text: string;
    private color: string;
    private fontname: string;
    private fontsize: number;
    private alignment: UrlGeneratorModule.XpoUrlTextAlignment;
    private fontStyle: UrlGeneratorModule.TextFontStyle;
    private dropX: number;
    private dropY: number;
    private placingPointX: number;
    private placingPointY: number;
    private rotation: number;
    private multiplier: number;

    constructor(text: string = "") {
        this.text = text;
    }

    /*
     * The text that has to be rendered on the object.
     */
    getText(): string { return this.text; }
    setText(val: string) { this.text = val; }

    /*
     * The color of the text
     * default: black
     */
    getColor(): string { return this.color; }
    setColor(val: string) { this.color = val; }

    /*
     * The font name to use
     * default: Arial
     */
    getFontname(): string { return this.fontname; }
    setFontname(val: string) { this.fontname = val; }

    /*
     * The font size in pixels
     * default: 11
     */
    getFontsize(): number { return this.fontsize; }
    setFontsize(val: number) { this.fontsize = val; }

    /*
     * The alignment of the text within the object
     * default: Left
     */
    getAlignment(): UrlGeneratorModule.XpoUrlTextAlignment { return this.alignment; }
    setAlignment(val: UrlGeneratorModule.XpoUrlTextAlignment) { this.alignment = val; }

    /*
     * The decoration of the text.
     * To use more than one decoration use a comma (,) to separate.
     */
    getFontStyle(): UrlGeneratorModule.TextFontStyle { return this.fontStyle; }
    setFontStyle(val: UrlGeneratorModule.TextFontStyle) { this.fontStyle = val; }

    /*
     * Gets or sets the drop x of this object
     */
    getDropX(): number { return this.dropX; }
    setDropX(val: number) { this.dropX = val; }

    /*
     * Gets or sets the drop y of this object
     */
    getDropY(): number { return this.dropY; }
    setDropY(val: number) { this.dropY = val; }

    /*
     * Gets or sets the placing point x of this object
     */
    getPlacingPointX(): number { return this.placingPointX; }
    setPlacingPointX(val: number) { this.placingPointX = val; }

    /*
     * Gets or sets the placing point y of this object
     */
    getPlacingPointY(): number { return this.placingPointY; }
    setPlacingPointY(val: number) { this.placingPointY = val; }

    /*
     * Gets or sets the rotation for this object (only used in combination with transformation)
     */
    getRotation(): number { return this.rotation; }
    setRotation(val: number){ this.rotation = val; }

    /*
     * Gets or sets the multiplier of this object
     */
    getMultiplier(): number { return this.multiplier; }
    setMultiplier(val: number) { this.multiplier = val; }
 }