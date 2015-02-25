class DesignKeys {
    private designKeys = new Array<DesignKey>();

    constructor() {
        this.designKeys.push(new EntityNameDesignKey(),
                             new ContrastDesignKey(),
                             new DropXDesignKey(),
                             new DropYDesignKey(),
                             new GlossDesignKey(),
                             new HeightDesignKey(),
                             new PlacingPointXDesignKey(),
                             new PlacingPointYDesignKey(),
                             new RepeatDesignKey(),
                             new RotationDesignKey(),
                             new WidthDesignKey(),
                             new FlipDesignKey(),
                             new AspectRatioDesignKey());
    }


    appendDesigns(stringBuilder: string, xpoUrlDesigns: Array<XpoUrlObject>) {
        if (xpoUrlDesigns == null || xpoUrlDesigns.length <= 0)
            return stringBuilder;

        for (var i = 0; i < this.designKeys.length; i++) {
            var keyValue = this.designKeys[i].getValues(xpoUrlDesigns);

            if (keyValue) {
                stringBuilder = stringBuilder.concat("&")
                                             .concat(keyValue);
            }
        }

        return stringBuilder;
    }
    
} 