class ColorKeys {
    colorString= "&p.c=";

    appendColors(stringBuilder: string, xpoUrlColors: Array<XpoUrlObject>) {
        if (xpoUrlColors == null || xpoUrlColors.length <= 0)
            return stringBuilder;

        var max = UrlGeneratorModule.getMaxObjectNumber(xpoUrlColors);
        var colorBuilder = this.colorString;
        for (var i = 0; i <= max; i++) {
            var index = xpoUrlColors.map(e => e.getIndex()).lastIndexOf(i);
            var colorObject = xpoUrlColors[index];

            if (colorObject == null)
                colorBuilder = colorBuilder.concat(",");
            else {
                colorBuilder = colorBuilder.concat(colorObject.getColor().getColor())
                                           .concat(",");
            }
        }

        return stringBuilder.concat(colorBuilder.slice(0, colorBuilder.length - 1));
    }
} 