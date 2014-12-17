class OverlayKeys {
    private overlayKeys = new Array<OverlayKey>();

    constructor() {
        this.overlayKeys.push(new NameOverlayKey(),
            new ModeOverlayKey(),
            new LocationOverlayKey(),
            new OperationOverlayKey(),
            new TimeOverlayKey());
    }


    appendOverlays(stringBuilder: string, xpoUrlOverlays: Array<XpoUrlOverlay>) {
        if (xpoUrlOverlays == null || xpoUrlOverlays.length <= 0)
            return stringBuilder;

        for (var i = 0; i < this.overlayKeys.length; i++) {
            var keyValue = this.overlayKeys[i].getValues(xpoUrlOverlays);

            if (keyValue) {
                stringBuilder = stringBuilder.concat("&")
                    .concat(keyValue);
            }
        }

        return stringBuilder;
    }

} 