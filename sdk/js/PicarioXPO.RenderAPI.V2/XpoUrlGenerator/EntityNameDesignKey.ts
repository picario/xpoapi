class EntityNameDesignKey extends DesignKey {

    getValues(designs: Array<XpoUrlObject>) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(e => e.getIndex()).lastIndexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(this.convertToBase64UrlString(urlObject.getDesign().getEntityName()));
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty()) return "";

        return "p.tn=" + this.getUrlValue();
    }

    convertToBase64UrlString(value: string) {
        var base64 = new Base64();
        
        return encodeURIComponent(base64.encode(value));
    }
} 