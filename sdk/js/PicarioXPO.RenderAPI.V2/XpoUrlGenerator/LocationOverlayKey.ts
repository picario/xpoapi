﻿class LocationOverlayKey extends OverlayKey {

    getValues(overlays: Array<XpoUrlOverlay>) {
        var max = UrlGeneratorModule.getMaxOverlayNumber(overlays);

        for (var i = 0; i <= max; i++) {
            var index = overlays.map(e => e.getIndex()).lastIndexOf(i);

            var urlOverlay = overlays[index];
            if (urlOverlay != null)
                this.addToList(urlOverlay.getOverlayLocation());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty()) return "";

        return "p.ol=" + this.getUrlValue();
    }
}