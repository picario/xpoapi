class HeightDesignKey extends DesignKey {

    getValues(designs: Array<XpoUrlObject>) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(e => e.getIndex()).lastIndexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getHeight());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty()) return "";

        return "p.th=" + this.getUrlValue();
    }
} 