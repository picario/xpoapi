using System;
using System.Collections.Generic;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Represents all the XPO parameters for an image request
    /// </summary>
    public class XpoUrlRequest
    {
        #region "Properties"

        /// <summary>
        /// Gets or sets the scene name (filename) for this URL
        /// </summary>
        public string PrimaryKey { get; set; }

        /// <summary>
        /// Gets or sets the output type
        /// </summary>
        public XpoUrlOutputTypes OutputType { get; set; }

        /// <summary>
        /// Gets or sets the output quality for this URL
        /// </summary>
        public double OutputQuality { get; set; }

        /// <summary>
        /// Gets or sets the object list for this URL
        /// </summary>
        public List<XpoUrlObject> Objects { get; private set; }

        /// <summary>
        /// Gets or sets the template parameter list for this URL
        /// </summary>
        public List<XpoUrlTemplate> TemplateParameters { get; private set; }

        /// <summary>
        /// Specifies the optional overlay images to be rendered upon the scene or design.
        /// You can specify multiple images (has to be PNG).
        /// </summary>
        public List<XpoUrlOverlay> Overlays { get; private set; }

        /// <summary>
        /// Gets or sets the filetype for this URL
        /// </summary>
        public XpoUrlFileTypes FileType { get; set; }

        /// <summary>
        /// Gets or sets the scene render mode
        /// </summary>
        public XpoUrlRenderModes SceneRenderMode { get; set; }

        /// <summary>
        /// Gets or sets the width of the output image for this URL
        /// </summary>
        public int Width { get; set; }

        /// <summary>
        /// Gets or sets the height of the output image for this URL
        /// </summary>
        public int Height { get; set; }

        /// <summary>
        /// Gets or sets the resize method for the output image this URL
        /// </summary>
        public XpoUrlResizeMethods ResizeMethod { get; set; }

        /// <summary>
        /// Gets or sets the ouput image type for this URL
        /// </summary>
        public XpoUrlImageTypes ImageType { get; set; }



        /// <summary>
        /// Enables or disables debugging for this URL
        ///
        /// true if debugging is enabled, otherwise false. Default is false
        /// </summary>
        public bool Debug { get; set; }

        /// <summary>
        /// Gets or sets the background color for this URL
        /// </summary>
        public string BackgroundColor { get; set; }

        /// <summary>
        /// Specifies the color to use a transparency key. 
        /// This color will be made transparent when using the PNG output type.
        /// </summary>
        public string TransparencyColor { get; set; }

        /// <summary>
        /// Specifies all colors for all objects in one parameter.
        /// </summary>
        public string AllColor { get; set; }

        /// <summary>
        /// Used to group specific scenes together. Use your own session id or another unique value (per user).
        /// If no value is specified the XPO engine will use its own session ID.
        /// </summary>
        [Obsolete("SessionID is no longer used by XPO")]
        public string SessionId { get; set; }

        /// <summary>
        /// Specifies the name of the template to use.
        /// </summary>
        public string TemplateName { get; set; }

        /// <summary>
        /// Enables or disables caching
        ///
        /// true if caching is enabled, otherwise false. Default is true
        /// </summary>
        public bool Caching { get; set; }

        /// <summary>
        /// Enables or disables design-caching
        ///
        /// true if design caching is enabled, otherwise false. Default is true
        /// </summary>
        public bool DesignCaching { get; set; }

        /// <summary>
        /// When set to True  the image will not be sent to the browser.
        /// </summary>
        public bool PrefillCaching { get; set; }

        /// <summary>
        /// Option to save the rendered image. When set True
        /// the saved image will be streamed to the browser as a file instead of an Image
        /// </summary>
        public bool IsEntity { get; set; }

        /// <summary>
        /// Gets or sets the highlighted object number for this URL
        /// </summary>
        public int? HighlightObject { get; set; }

        /// <summary>
        /// Specifies the object number when requesting a scene object thumbnail (FileType 4).
        /// This parameter is used only when the ft is set to 4
        /// </summary>
        public int? SceneThumbnailObjectNumber { get; set; }

        /// <summary>
        /// Specifies the absolute url to use
        /// </summary>
        public string AbsoluteUrl { get; set; }

        /// <summary>
        /// Specifies the filename of the image that should be used as a watermark
        /// </summary>
        public string WatermarkImage { get; set; }

        /// <summary>
        /// Specifies the frame to be rendered when using a MultiFrame scene (only for V2)
        /// </summary>
        public int? Frame { get; set; }

        /// <summary>
        /// Custom parameters and values to use in the URL
        /// </summary>
        public Dictionary<string, object> CustomParameters { get; private set; } 

        #endregion "Properties"

        #region "Constructor"

        /// <summary>
        /// Constructs a new XpoRequest class
        /// </summary>
        public XpoUrlRequest()
        {
            // Create instance lists
            Objects = new List<XpoUrlObject>();
            TemplateParameters = new List<XpoUrlTemplate>();
            Overlays = new List<XpoUrlOverlay>();
            CustomParameters = new Dictionary<string, object>();

            Caching = true;
            DesignCaching = true;
        }

        #endregion "Constructor"
    }
}