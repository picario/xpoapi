class NameOverlayKey extends OverlayKey {

    getValues(overlays: Array<XpoUrlOverlay>) {
        var max = UrlGeneratorModule.getMaxOverlayNumber(overlays);

        for (var i = 0; i <= max; i++) {
            var index = overlays.map(e => e.getIndex()).lastIndexOf(i);

            var urlOverlay = overlays[index];
            if (urlOverlay != null)
                this.addToList(this.convertToBase64UrlString(urlOverlay.getOverlayName()));
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty()) return "";

        return "p.on=" + this.getUrlValue();
    }

    convertToBase64UrlString(value: string) {
        var base64 = new Base64();

        return encodeURIComponent(base64.encode(value));
    }
}