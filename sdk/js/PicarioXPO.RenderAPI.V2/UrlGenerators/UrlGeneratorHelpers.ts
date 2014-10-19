module UrlGeneratorModule {
     
     /*
      * Defines the different URL types for XPO
      */
     export enum UrlTypes {
         Url = 0,
         Image = 1,
         Coords = 2
     }

     /*
      * Defines the different output types for XPO (all versions)
      */
     export enum XpoUrlOutputTypes {
         Xml = 1,
         Json = 2,
         Javascript = 3
     }

     /*
      *  The diffent object types for the URL generator
      */
     export enum XpoUrlObjectTypes {
         /*
          *  Object should be used as a color object
          */
         Color = 1,

         /*
          *  Objects should be used as design object
          */
         Design = 2
     }

     export enum XpoUrlTextAlignment {
         Left = 1,
         Middle = 2,
         Right = 3
     }

     /*
      * Defines the different file types for XPO version 1
      */
     export enum XpoUrlFileTypes {
         Scene = 1,
         Design = 2,
         Color = 3,
         SceneThumb = 4,
         Image = 5
     }

    /*
     * Defines the different resize methods for XPO
     */
    export enum XpoUrlResizeMethods {
         /// <summary>
         /// Resizes the output image using its aspect ratio
         /// </summary>
         KeepAspect = 1,

         /// <summary>
         /// Stretches the output image to the specified width and height
         /// </summary>
         Stretch = 2,

         /// <summary>
         /// Crops the output image to the specified width and height
         /// </summary>
         Crop = 3,

         /// <summary>
         /// Repeats the output image
         /// </summary>
         Repeat = 4,

         /// <summary>
         /// Resizes the output image to the maximum of the aspect ratio
         /// </summary>
         KeepAspectMax = 5,

         /// <summary>
         /// Never upscales the image however the canvas is expended to fill the desired area
         /// </summary>
         Canvas = 6
     }

     /*
      * Defines the different image types for XPO (all versions)
      */
     export enum XpoUrlImageTypes {
         Jpg = 1,
         Png = 2,
         Bmp = 3
     }

     /* <summary>
      * Specifies the different URL request types
      */
     export enum FluentXpoUrlType {
         /// <summary>
         /// Url type for an image request.
         /// </summary>
         Image = 0,

         /// <summary>
         /// Url type for a coordinates request.
         /// </summary>
         Coordinates = 1
     }

    /* <summary>
     * Defines the different resize methods for XPO version 1
     */
    export enum XpoUrlObjectTransformations {
         /// <summary>
         /// Default
         /// </summary>
         None = 1,

         /// <summary>
         /// Text Only
         /// </summary>
         Arc = 2,

         /// <summary>
         /// Images and Text
         /// </summary>
         Rotate = 3,

         /// <summary>
         /// Images and Text
         /// </summary>
         FlipX = 4,

         /// <summary>
         /// Images and Text
         /// </summary>
         FlipY = 5
     }

    export function getMaxObjectNumber(xpoUrlObjects: Array<XpoUrlObject>) {
        var maxIndex = 0;
        
        for (var i = 0; i < xpoUrlObjects.length; i++) {
            if (xpoUrlObjects[i].getIndex() > maxIndex)
                maxIndex = xpoUrlObjects[i].getIndex();
        }

        return maxIndex;
    }

 }