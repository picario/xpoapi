function UrlDemo(scene, design, floorDesign, contrastDesign) {
    this.scene = scene;
    this.design = design;
    this.floorDesign = floorDesign;
    this.contrastDesign = contrastDesign;

    this.database = new Database();
    this.fluentXpoUrlFactory = new FluentXpoUrlFactory();
    this.xpoUrlGenerator = new XpoUrlGenerator();
    this.baseUrl = "http://demo.picarioxpo.com/";
}

UrlDemo.prototype.GetBaseSceneUrl = function (width, height) {
    // This function creates a basic image url for a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is needed for the url generator to render the image correctly. 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.

    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
							 .setAbsoluteUrl(this.baseUrl)
                             .getUrl();
}

UrlDemo.prototype.GetDefaultDesignUrl = function (width, height) {
    // This function creates a basic image url for a design.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the design. This can be found in the PicarioXPO backend.
	// We choose png as image type, but we can also choose jpg or bmp.
	// The entity type is needed for the url generator to render the image correctly. 
	// If we want to render a design file(.pft) we need to use the design url image type.
	// If we want a normal image of the design we can use the image entity type.
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.

    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.design.referenceId)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Image)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Png)
                             .setWidth(width)
                             .setAbsoluteUrl(this.baseUrl)
                             .getUrl();
}

UrlDemo.prototype.GetColorSceneUrl = function (width, height) {
    // This function creates an image url for a color rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The primary key should always use the storage name of a scene when you render colors/design on it.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// We use the name of color to set the color but we can also use the hex notation or a rgb notation.
	// I.e. red is the same as ff0000 or 255_0_0
	// When adding a color you also need to specify the index of the object, in this case we use the first object.

    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.color("red");
                                 obj.setIndex(0);
                             })
                             .getUrl();
}

UrlDemo.prototype.GetDefaultMappedSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.design.referenceId)
                                    .setWidth(self.design.displayWidth)
                                    .setHeight(self.design.displayHeight);
                                 obj.setIndex(0);
                             })
                             .getUrl();
}

UrlDemo.prototype.GetDesignContrastMappedSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.contrastDesign.referenceId)
                                    .setWidth(self.contrastDesign.designOptions.width)
                                    .setHeight(self.contrastDesign.designOptions.height)
                                    .setRepeat(self.contrastDesign.designOptions.repeat)
                                    .setPlacingPointX(self.contrastDesign.designOptions.placingPointX)
                                    .setPlacingPointY(self.contrastDesign.designOptions.placingPointY);
                                 obj.setIndex(0);
                             })
                             .getUrl();
}

UrlDemo.prototype.GetDesignPlacingPointXSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// By specifying the placing point x we can position the design along the x axis.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.design.referenceId)
                                    .setWidth(self.design.displayWidth)
                                    .setHeight(self.design.displayHeight)
                                    .setPlacingPointX(self.design.designOptions.placingPointX);
                                 obj.setIndex(0);
                             })
                             .getUrl();
}

UrlDemo.prototype.GetDesignPlacingPointYSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// By specifying the placing point y we can position the design along the y axis.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.design.referenceId)
                                    .setWidth(self.design.displayWidth)
                                    .setHeight(self.design.displayHeight)
                                    .setPlacingPointY(self.design.designOptions.placingPointY);
                                 obj.setIndex(0);
                             })
                            .getUrl();
}

UrlDemo.prototype.GetDesignRepeatSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// By specifying the repeat we can fill the scene object with the design.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.floorDesign.referenceId)
                                    .setWidth(self.floorDesign.designOptions.width)
                                    .setHeight(self.floorDesign.designOptions.height)
                                    .setRepeat(self.floorDesign.designOptions.repeat);
                                 obj.setIndex(0);
                             })
                            .getUrl();
}

UrlDemo.prototype.GetDesignDropXSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// By specifying the repeat we can fill the scene object with the design.
	// By specifying the drop x we can influence the repeat sequence on the x axis.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.floorDesign.referenceId)
                                    .setWidth(self.floorDesign.designOptions.width)
                                    .setHeight(self.floorDesign.designOptions.height)
                                    .setRepeat(self.floorDesign.designOptions.repeat)
                                    .setDropX(self.floorDesign.designOptions.dropX);
                                 obj.setIndex(0);
                             })
                            .getUrl();
}

UrlDemo.prototype.GetDesignDropYSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// By specifying the repeat we can fill the scene object with the design.
	// By specifying the drop y we can influence the repeat sequence on the y axis.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.floorDesign.referenceId)
                                    .setWidth(self.floorDesign.designOptions.width)
                                    .setHeight(self.floorDesign.designOptions.height)
                                    .setRepeat(self.floorDesign.designOptions.repeat)
                                    .setDropY(self.floorDesign.designOptions.dropY);
                                 obj.setIndex(0);
                             })
                            .getUrl();
}

UrlDemo.prototype.GetDesignFlipSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The primary key should always use the storage name of a scene when you render colors/design on it.
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// By specifying the flip parameter we can flip the design on the x axis.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.design.referenceId)
                                    .setWidth(self.design.displayWidth)
                                    .setHeight(self.design.displayHeight)
                                    .setFlip(self.design.designOptions.flip)
                                    .setPlacingPointX(self.design.designOptions.placingPointX)
                                    .setPlacingPointY(self.design.designOptions.placingPointY);
                                 obj.setIndex(0);
                             })
                            .getUrl();
}

UrlDemo.prototype.GetDesignMirrorSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// By specifying the flip parameter we can flip the design on the x axis.
	// You can also rotate the design by 90, 180 or 270 degrees.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.design.referenceId)
                                    .setWidth(self.design.displayWidth)
                                    .setHeight(self.design.displayHeight)
                                    .setFlip(self.design.designOptions.flip)
                                    .setRotation(self.design.designOptions.rotation)
                                    .setPlacingPointX(self.design.designOptions.placingPointX)
                                    .setPlacingPointY(self.design.designOptions.placingPointY);
                                 obj.setIndex(0);
                             })
                            .getUrl();
}

UrlDemo.prototype.GetDesignContrastSceneUrl = function (width, height) {
    // This function creates an image url for a design rendered on a scene.
	// The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
	// The primary key is used by our render engine to find the correct file to render the image.
	// We use the reference id of the scene. This can be found in the PicarioXPO backend.
	// We choose jpg as image type, but we can also choose png or bmp.
	// The entity type is always Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
	// We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
	// Not all files can be used to render so we use the correct render file for the design.
	// We also set the width and height that should be used to render the design.
	// We can alter the contrast of the rendered design by setting the contrast property when adding the design to an object.
	// When adding a design you also need to specify the index of the object, in this case we use the first object.

    var self = this;
    var fluentUrlGenerator = this.GetFluentXpoImageUrlGenerator();
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setImageType(UrlGeneratorModule.XpoUrlImageTypes.Jpg)
                             .setEntityType(UrlGeneratorModule.XpoUrlFileTypes.Scene)
                             .setWidth(this.GetSmallestWidth(this.scene.displayWidth, width))
                             .setAbsoluteUrl(this.baseUrl)
                             .addObject(function (obj) {
                                 obj.design(self.contrastDesign.referenceId)
                                    .setWidth(self.contrastDesign.designOptions.width)
                                    .setHeight(self.contrastDesign.designOptions.height)
                                    .setContrast(self.contrastDesign.designOptions.contrast)
                                    .setRepeat(self.contrastDesign.designOptions.repeat)
                                    .setPlacingPointX(self.contrastDesign.designOptions.placingPointX)
                                    .setPlacingPointY(self.contrastDesign.designOptions.placingPointY);
                                 obj.setIndex(0);
                             })
                            .getUrl();
}

UrlDemo.prototype.GetSceneCoordsUrl = function() {
    var fluentUrlGenerator = this.fluentXpoUrlFactory.createFluentUrlGenerator(this.xpoUrlGenerator, UrlGeneratorModule.FluentXpoUrlType.Coordinates);
    return fluentUrlGenerator.setPrimaryKey(this.scene.referenceId)
                             .setOutputType(UrlGeneratorModule.XpoUrlOutputTypes.Json)
                             .setAbsoluteUrl(this.baseUrl)
                             .getUrl();
}

UrlDemo.prototype.GetSmallestWidth = function (displayWidth, proposedWidth) {
    return Math.min(displayWidth, proposedWidth);
}

UrlDemo.prototype.GetFluentXpoImageUrlGenerator = function () {
    // Create a new fluent url generator. The fluent url generator needs a normal url generator and an url type.
    // You can choose between an Image url and a Coordinates url.

    return this.fluentXpoUrlFactory.createFluentUrlGenerator(this.xpoUrlGenerator, UrlGeneratorModule.FluentXpoUrlType.Image);
}