class TextMultiplierTextKey extends TextKey {

    constructor() {
        super();
    }

    getValues(texts: Array<XpoUrlObject>) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(e => e.getIndex()).lastIndexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getMultiplier());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty()) return "";

        return "p.text.multiplier=" + this.getUrlValue();
    }
} 