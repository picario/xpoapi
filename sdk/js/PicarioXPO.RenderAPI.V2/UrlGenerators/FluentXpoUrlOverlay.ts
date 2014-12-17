class FluentXpoUrlOverlay {
    private xpoUrlOverlay: XpoUrlOverlay;

    /*
     * Creates a new instance of the FluentXpoOverlay
     */
    constructor(overlayName: string = "") {
        this.xpoUrlOverlay = new XpoUrlOverlay(overlayName);
    }
    
    /*
     * Returns the wrapped XpoOverlay
     */
    getXpoOverlay(): XpoUrlOverlay { return this.xpoUrlOverlay; }

    /*
     * Sets the index for this object
     */
    setIndex(index: number) {
        this.xpoUrlOverlay.setIndex(index);

        return this;
    }

    /*
     * Sets the location for this overlay
     */
    setLocation(location: UrlGeneratorModule.XpoUrlOverlayLocations) {
        this.xpoUrlOverlay.setOverlayLocation(location);

        return this.xpoUrlOverlay;
    }

    /*
     * Sets the mode for this overlay
     */
    setMode(mode: UrlGeneratorModule.XpoUrlOverlayModes) {
        this.xpoUrlOverlay.setOverlayMode(mode);

        return this.xpoUrlOverlay;
    }

    /*
     * Sets the name for this overlay
     */
    setName(name: string) {
        this.xpoUrlOverlay.setOverlayName(name);

        return this.xpoUrlOverlay;
    }

    /*
     * Sets the operation for this overlay
     */
    setOperation(operation: UrlGeneratorModule.XpoUrlOverlayOperations) {
        this.xpoUrlOverlay.setOverlayOperation(operation);

        return this.xpoUrlOverlay;
    }

    /*
     * Sets the time for this overlay
     */
    setTime(time: UrlGeneratorModule.XpoUrlOverlayTimes) {
        this.xpoUrlOverlay.setOverlayTime(time);

        return this.xpoUrlOverlay;
    }

}