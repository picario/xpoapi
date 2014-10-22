﻿class RepeatDesignKey extends DesignKey {

    getValues(designs: Array<XpoUrlObject>) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(e => e.getIndex()).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getRepeat(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty()) return "";

        return "p.tr=" + this.getUrlValue();
    }
} 