using System;
using PicarioXPO.RenderAPI.FluentInterface;

namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Represents the Fluent XPO URL generator
    /// </summary>
    public interface IFluentXpoUrlGenerator : IFluentInterface
    {
        /// <summary>
        /// Sets the scene name (filename) for this URL
        /// </summary>
        IFluentXpoUrlGenerator SetPrimaryKey(string primaryKey);

        /// <summary>
        /// Sets the output quality for this URL
        /// </summary>
        /// <param name="outputQuality">the output quality (in percentage from 0 to 100)</param>
        IFluentXpoUrlGenerator SetOutputQuality(double outputQuality);

        /// <summary>
        /// Sets the output type for this URL (Only used by non-Image request)
        /// </summary>
        IFluentXpoUrlGenerator SetOutputType(XpoUrlOutputTypes outputType);
        
        /// <summary>
        /// Adds an object to this url
        /// </summary>
        IFluentXpoUrlGenerator AddObject(Action<FluentXpoUrlObject> xpoObject);

        /// <summary>
        /// Adds a template to the output
        /// </summary>
        IFluentXpoUrlGenerator AddTemplateParameter(int index, string parameterValue);

        /// <summary>
        /// Adds an overlay to the output
        /// </summary>
        IFluentXpoUrlGenerator AddOverlay(Action<FluentXpoUrlOverlay> xpoOverlay);

        /// <summary>
        /// Sets the filetype for this URL
        /// </summary>
        /// <param name="fileType">the filetype to load</param>
        IFluentXpoUrlGenerator SetEntityType(XpoUrlFileTypes fileType);

        /// <summary>
        /// Sets the width of the output image for this URL
        /// </summary>
        IFluentXpoUrlGenerator SetWidth(int width);

        /// <summary>
        /// Sets the height of the output image for this URL
        /// </summary>
        IFluentXpoUrlGenerator SetHeight(int height);

        /// <summary>
        /// Sets the resize method for the output image this URL
        /// For designs only values: KeepAspect, Stretch & Repeat 
        /// For scene thumbnails only values: KeepAspect & Stretch
        /// For images only values: KeepAspect, Stretch, Full & KeepAspectMax
        /// </summary>
        /// <param name="resizeMethod">the kind of resize method to be used</param>
        IFluentXpoUrlGenerator SetResizeMethod(XpoUrlResizeMethods resizeMethod);

        /// <summary>
        /// Sets the ouput image type for this URL
        /// </summary>
        /// <param name="type">the type of the output image</param>
        IFluentXpoUrlGenerator SetImageType(XpoUrlImageTypes type);

        /// <summary>
        /// Enables or disables debugging for this URL
        /// </summary>
        /// <param name="debug">true if debugging is enabled, otherwise false. Default is false</param>
        IFluentXpoUrlGenerator SetDebug(bool debug);

        /// <summary>
        /// Sets the background color for this URL
        /// </summary>
        /// <param name="colorString">a color string to indicate what color the background of the scene should be</param>
        IFluentXpoUrlGenerator SetBackgroundColor(string colorString);

        /// <summary>
        /// Enables or disables caching
        /// </summary>
        /// <param name="cache">true if caching is enabled, otherwise false. Default is true</param>
        IFluentXpoUrlGenerator SetCaching(bool cache);

        /// <summary>
        /// Enables or disables design-caching
        /// </summary>
        /// <param name="cache">true if design caching is enabled, otherwise false. Default is true</param>
        IFluentXpoUrlGenerator SetDesignCaching(bool cache);

        /// <summary>
        /// Sets the highlighted object number for this URL
        /// </summary>
        /// <param name="objectNumber">the objectnumber to highlight</param>
        IFluentXpoUrlGenerator SetHighlightObject(int objectNumber);

        /// <summary>
        /// Option to save the rendered image. When set True
        /// the saved image will be streamed to the browser as a file instead of an Image
        /// </summary>
        /// <returns></returns>
        IFluentXpoUrlGenerator IsEntity();

        /// <summary>
        /// Specifies the color to use a transparency key. 
        /// This color will be made transparent when using the PNG output type.
        /// </summary>
        IFluentXpoUrlGenerator SetTransparencyColor(string colorString);

        /// <summary>
        /// Specifies the object number when requesting a scene object thumbnail (FileType 4).
        /// This parameter is used only when the ft is set to 4
        /// </summary>
        IFluentXpoUrlGenerator SetSceneThumbnailObjectNumber(int objectNumber);

        /// <summary>
        /// Specifies all colors for all objects in one parameter.
        /// </summary>
        IFluentXpoUrlGenerator SetAllColor(string colorString);

        /// <summary>
        /// When set to True the image will not be sent to the browser.
        /// </summary>
        IFluentXpoUrlGenerator SetPrefillCaching(bool cache);

        /// <summary>
        /// Used to group specific scenes together. Use your own session id or another unique value (per user).
        /// If no value is specified the XPO engine will use its own session ID.
        /// </summary>
        IFluentXpoUrlGenerator SetSessionId(string id);

        /// <summary>
        /// Specifies the name of the template to use.
        /// </summary>
        IFluentXpoUrlGenerator SetTemplateName(string name);
        
        /// <summary>
        /// Specifies the absolute url to use
        /// </summary>
        IFluentXpoUrlGenerator SetAbsoluteUrl(string absoluUrl);

        /// <summary>
        /// Specifies the watermark image to use
        /// </summary>
        IFluentXpoUrlGenerator SetWatermarkImage(string watermarkImageName);

        /// <summary>
        /// Adds a custom parameter to the URL
        /// </summary>
        IFluentXpoUrlGenerator AddCustom(string key, object value);

        /// <summary>
        /// Specifies the frame to be rendered when using a MultiFrame scene (only for V2)
        /// </summary>
        IFluentXpoUrlGenerator SetFrame(int frame);

        /// <summary>
        /// Sets the rendermode for this scene request
        /// </summary>
        IFluentXpoUrlGenerator SetSceneRenderMode(XpoUrlRenderModes renderMode);

        /// <summary>
        /// Enables or disablesd fast rendering
        /// 
        /// Default is false, fast rendering uses small versions of design images
        /// </summary>
        IFluentXpoUrlGenerator SetFastRender(bool fastRender);

        /// <summary>
        /// Returns the URL generated using these parameters
        /// </summary>
        string GetUrl();

        /// <summary>
        /// Returns the URL generated using these parameters into parts
        /// </summary>
        XpoUrlParts GetUrlParts();
    }
}
