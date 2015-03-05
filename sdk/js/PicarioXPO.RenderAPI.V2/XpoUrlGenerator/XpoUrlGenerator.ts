/// <reference path="../Scripts/Pix2.d.ts"/>

class XpoUrlGenerator implements UrlGeneratorModule.IXpoUrlGenerator, UrlGeneratorModule.IXpoCanvasGenerator {
    workspace: Pix2.IWorkSpace;

    getUrl(request: XpoUrlRequest) {
        if (request.urlType == UrlGeneratorModule.UrlTypes.Image)
            return this.getImageUrl(request);

        if (request.urlType == UrlGeneratorModule.UrlTypes.Coords)
            return this.getCoordsUrl(request);

        throw("Input type is not recognized");
    }

    getCanvas(request: XpoUrlRequest) {
        this.ensureWorkspace(request.getCanvasContainerId());
        this.workspace.loadScene(request.getPrimaryKey(), 1).whenData(() => {

            var allRequestObjects = request.getObjects();

            for (var i = 0; i < allRequestObjects.length; i++) {
                var requestObject = allRequestObjects[i];
                var workspaceObject = this.workspace.getObject(i);
                var requestDesign = requestObject.getDesign();
                if (requestDesign != null) {
                    workspaceObject.Contrast = requestDesign.getContrast();
                    workspaceObject.PlacingPointX = requestDesign.getPlacingPointX();
                    workspaceObject.PlacingPointY = requestDesign.getPlacingPointY();
                    workspaceObject.LoadTextureImage(this.getDesignImageUrl(requestDesign, request), requestDesign.getWidth(), requestDesign.getHeight());
                }
            }

            setInterval(() => {
                this.workspace.render(0);
            }, 1000);

            return this.workspace.getCanvas();
        });

        return null;
    }

    getImageUrl(request: XpoImageUrlRequest) {
        var generalKeys = new GeneralKeys();
        var designKeys = new DesignKeys();
        var colorKeys = new ColorKeys();
        var overlayKeys = new OverlayKeys();

        var baseUri = this.getXpoBaseUrl(request);

        var stringBuilder = baseUri;
        stringBuilder = stringBuilder.concat(request.getPrimaryKey());

        stringBuilder = generalKeys.appendRequest(stringBuilder, request); 
        stringBuilder = designKeys.appendDesigns(stringBuilder, request.getObjects().filter(value => value.getDesign() != null)); 
        stringBuilder = colorKeys.appendColors(stringBuilder, request.getObjects().filter(value => value.getColor() != null)); 
        stringBuilder = overlayKeys.appendOverlays(stringBuilder, request.getOverlays());

        return stringBuilder;
    }

    getCoordsUrl(request: XpoCoordinatesUrlRequest) {
        var generalKeys = new GeneralKeys();
        var baseUri = this.getXpoBaseUrl(request);

        var stringBuilder = baseUri;
        stringBuilder = stringBuilder.concat(request.getPrimaryKey());
        stringBuilder = generalKeys.appendRequest(stringBuilder, request);

        return stringBuilder;
    }

    getXpoBaseUrl(urlRequest: XpoUrlRequest) {
        if (urlRequest != null && urlRequest.getAbsoluteUrl())
            return urlRequest.getAbsoluteUrl().endsWith("/") ? urlRequest.getAbsoluteUrl() : urlRequest.getAbsoluteUrl() + "/";

        return "/";
    }

    getDesignImageUrl(design: XpoUrlDesign, urlRequest: XpoUrlRequest) {
        var newUrlRequest = new XpoUrlRequest();
        newUrlRequest.setAbsoluteUrl(urlRequest.getAbsoluteUrl());
        newUrlRequest.setPrimaryKey(design.getEntityName());
        newUrlRequest.setHeight(design.getHeight());
        newUrlRequest.setWidth(design.getWidth());

        return this.getImageUrl(newUrlRequest);
    }

    ensureWorkspace(canvasContainerId: string) {
        if (!this.workspace)
            this.workspace = new Pix2.GLWorkspace(canvasContainerId);
    }
}