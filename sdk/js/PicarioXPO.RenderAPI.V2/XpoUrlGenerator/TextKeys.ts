class TextKeys {
    private textKeys = new Array<TextKey>();

    constructor() {
        this.textKeys.push(new TextTextKey(),
                           new TextColorTextKey(),
                           new TextAlignmentTextKey(),
                           new TextFontTextKey(),
                           new TextMultiplierTextKey(),
                           new TextPlacingPointXTextKey(),
                           new TextPlacingPointYTextKey(),
                           new TextSizeTextKey(),
                           new TextStyleTextKey());
    }


    appendTexts(stringBuilder: string, xpoUrlTexts: Array<XpoUrlObject>) {
        if (xpoUrlTexts == null || xpoUrlTexts.length <= 0)
            return stringBuilder;

        for (var i = 0; i < this.textKeys.length; i++) {
            var keyValue = this.textKeys[i].getValues(xpoUrlTexts);

            if (keyValue) {
                stringBuilder = stringBuilder.concat("&")
                                             .concat(keyValue);
            }
        }

        return stringBuilder;
    }
    
} 