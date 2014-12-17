class XpoUrlOverlay {
    private index: number;
    private overlayName: string;
    private overlayMode: UrlGeneratorModule.XpoUrlOverlayModes;
    private overlayTime: UrlGeneratorModule.XpoUrlOverlayTimes;
    private overlayOperation: UrlGeneratorModule.XpoUrlOverlayOperations;
    private overlayLocation: UrlGeneratorModule.XpoUrlOverlayLocations;

    constructor(overlayName: string = "") {
        this.overlayName = overlayName;
    }

    /*
     * Gets or sets the index of this overlay
     */
    getIndex(): number { return this.index; }
    setIndex(val: number) { this.index = val; }

    /*
     * Gets or sets the overlay name
     */
    getOverlayName(): string { return this.overlayName; }
    setOverlayName(val: string) { this.overlayName = val; }

    /*
     * Gets or sets the overlay mode
     */
    getOverlayMode(): UrlGeneratorModule.XpoUrlOverlayModes { return this.overlayMode; }
    setOverlayMode(val: UrlGeneratorModule.XpoUrlOverlayModes) { this.overlayMode = val; }

    /*
     * Gets or sets the overlay time
     */
    getOverlayTime(): UrlGeneratorModule.XpoUrlOverlayTimes { return this.overlayTime; }
    setOverlayTime(val: UrlGeneratorModule.XpoUrlOverlayTimes) { this.overlayTime = val; }

    /*
     * Gets or sets the overlay operation
     */
    getOverlayOperation(): UrlGeneratorModule.XpoUrlOverlayOperations { return this.overlayOperation; }
    setOverlayOperation(val: UrlGeneratorModule.XpoUrlOverlayOperations) { this.overlayOperation = val; }

    /*
     * Gets or sets the overlay location
     */
    getOverlayLocation(): UrlGeneratorModule.XpoUrlOverlayLocations { return this.overlayLocation; }
    setOverlayLocation(val: UrlGeneratorModule.XpoUrlOverlayLocations) { this.overlayLocation = val; }
}