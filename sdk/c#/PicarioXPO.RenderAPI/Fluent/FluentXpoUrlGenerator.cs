using System;

namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Represents a Fluent XPO URL generator
    /// </summary>
    public sealed class FluentXpoUrlGenerator : IFluentXpoUrlGenerator
    {
        private readonly IXpoUrlGenerator generator;
        private readonly XpoUrlRequest request;

        public FluentXpoUrlGenerator(IXpoUrlGenerator generator, XpoUrlRequest request)
        {
            if (generator == null)
                throw new ArgumentNullException("generator");

            if (request == null)
                throw new ArgumentNullException("request");

            this.generator = generator;
            this.request = request;
        }

        public FluentXpoUrlGenerator(IXpoUrlGenerator generator)
            : this(generator, new XpoUrlRequest())
        {
        }

        /// <summary>
        /// Ensures the type of a request
        /// </summary>
        private static TUrlType EnsureUrlType<TUrlType>(XpoUrlRequest urlRequest) 
            where TUrlType : XpoUrlRequest
        {
            if(urlRequest == null)
                throw new ArgumentNullException("urlRequest", "Cannot use this class without an instance of the correct URL request.");

            if (urlRequest is TUrlType)
                return urlRequest as TUrlType;

            throw new InvalidCastException(
                string.Format("Cannot cast {0} to {1}. Are you using the correct URL type?", 
                              urlRequest.GetType().Name, 
                              typeof(TUrlType).Name));
        }

        /// <summary>
        /// Sets the scene name (filename) for this URL
        /// </summary>
        public IFluentXpoUrlGenerator SetPrimaryKey(string primaryKey)
        {
            request.PrimaryKey = primaryKey;

            return this;
        }

        /// <summary>
        /// Sets the output quality for this URL
        /// </summary>
        /// <param name="outputQuality">the output quality (in percentage from 0 to 100)</param>
        public IFluentXpoUrlGenerator SetOutputQuality(double outputQuality)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).OutputQuality = outputQuality;

            return this;
        }

        public IFluentXpoUrlGenerator SetOutputType(XpoUrlOutputTypes outputType)
        {
            EnsureUrlType<XpoCoordinatesUrlRequest>(request).OutputType = outputType;

            return this;
        }

        /// <summary>
        /// Adds an object to this url
        /// </summary>
        public IFluentXpoUrlGenerator AddObject(Action<FluentXpoUrlObject> xpoObject)
        {
            var fluentXpoObject = new FluentXpoUrlObject();
            fluentXpoObject.SetIndex(EnsureUrlType<XpoImageUrlRequest>(request).Objects.Count);
            xpoObject.Invoke(fluentXpoObject);

            EnsureUrlType<XpoImageUrlRequest>(request).Objects.Add(fluentXpoObject.XpoObject);

            return this;
        }

        /// <summary>
        /// Adds a template to the output
        /// </summary>
        public IFluentXpoUrlGenerator AddTemplateParameter(int index, string parameterValue)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).TemplateParameters.Add(new XpoUrlTemplate { Index = index, Value = parameterValue });

            return this;
        }

        /// <summary>
        /// Adds an overlay to the output
        /// </summary>
        public IFluentXpoUrlGenerator AddOverlay(string overlay)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).Overlays.Add(overlay);

            return this;
        }

        /// <summary>
        /// Sets the filetype for this URL
        /// </summary>
        /// <param name="fileType">the filetype to load</param>
        public IFluentXpoUrlGenerator SetEntityType(XpoUrlFileTypes fileType)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).FileType = fileType;

            return this;
        }

        /// <summary>
        /// Sets the width of the output image for this URL
        /// </summary>
        public IFluentXpoUrlGenerator SetWidth(int width)
        {
            request.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the height of the output image for this URL
        /// </summary>
        public IFluentXpoUrlGenerator SetHeight(int height)
        {
            request.Height = height;

            return this;
        }

        /// <summary>
        /// Sets the resize method for the output image this URL
        /// </summary>
        /// <param name="resizeMethod">the kind of resize method to be used</param>
        public IFluentXpoUrlGenerator SetResizeMethod(XpoUrlResizeMethods resizeMethod)
        {
            request.ResizeMethod = resizeMethod;

            return this;
        }

        /// <summary>
        /// Sets the ouput image type for this URL
        /// </summary>
        /// <param name="type">the type of the output image</param>
        public IFluentXpoUrlGenerator SetImageType(XpoUrlImageTypes type)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).ImageType = type;

            return this;
        }

        /// <summary>
        /// Enables or disables debugging for this URL
        /// </summary>
        /// <param name="debug">true if debugging is enabled, otherwise false. Default is false</param>
        public IFluentXpoUrlGenerator SetDebug(bool debug)
        {
            request.Debug = debug;

            return this;
        }

        /// <summary>
        /// Sets the background color for this URL
        /// </summary>
        /// <param name="colorString">a color string to indicate what color the background of the scene should be</param>
        public IFluentXpoUrlGenerator SetBackgroundColor(string colorString)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).BackgroundColor = colorString;

            return this;
        }

        /// <summary>
        /// Enables or disables caching
        /// </summary>
        /// <param name="cache">true if caching is enabled, otherwise false. Default is true</param>
        public IFluentXpoUrlGenerator SetCaching(bool cache)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).Caching = cache;

            return this;
        }

        /// <summary>
        /// Enables or disables design-caching
        /// </summary>
        /// <param name="cache">true if design caching is enabled, otherwise false. Default is true</param>
        public IFluentXpoUrlGenerator SetDesignCaching(bool cache)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).DesignCaching = cache;

            return this;
        }

        /// <summary>
        /// Sets the highlighted object number for this URL
        /// </summary>
        /// <param name="objectNumber">the objectnumber to highlight</param>
        public IFluentXpoUrlGenerator SetHighlightObject(int objectNumber)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).HighlightObject = objectNumber;

            return this;
        }

        /// <summary>
        /// Option to save the rendered image. When set True
        /// the saved image will be streamed to the browser as a file instead of an Image
        /// </summary>
        /// <returns></returns>
        public IFluentXpoUrlGenerator IsEntity()
        {
            EnsureUrlType<XpoImageUrlRequest>(request).IsEntity = true;

            return this;
        }

        /// <summary>
        /// Specifies the color to use a transparency key. 
        /// This color will be made transparent when using the PNG output type.
        /// </summary>
        public IFluentXpoUrlGenerator SetTransparencyColor(string colorString)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).TransparencyColor = colorString;

            return this;
        }

        /// <summary>
        /// Specifies the object number when requesting a scene object thumbnail (FileType 4).
        /// This parameter is used only when the ft is set to 4
        /// </summary>
        public IFluentXpoUrlGenerator SetSceneThumbnailObjectNumber(int objectNumber)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).SceneThumbnailObjectNumber = objectNumber;

            return this;
        }

        /// <summary>
        /// Specifies all colors for all objects in one parameter.
        /// </summary>
        public IFluentXpoUrlGenerator SetAllColor(string colorString)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).AllColor = colorString;

            return this;
        }

        /// <summary>
        /// When set to True the image will not be sent to the browser.
        /// </summary>
        public IFluentXpoUrlGenerator SetPrefillCaching(bool cache)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).PrefillCaching = cache;

            return this;
        }

        /// <summary>
        /// Used to group specific scenes together. Use your own session id or another unique value (per user).
        /// If no value is specified the XPO engine will use its own session ID.
        /// </summary>
        public IFluentXpoUrlGenerator SetSessionId(string id)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).SessionId = id;

            return this;
        }

        /// <summary>
        /// Specifies the name of the template to use.
        /// </summary>
        public IFluentXpoUrlGenerator SetTemplateName(string name)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).TemplateName = name;

            return this;
        }
        
        public IFluentXpoUrlGenerator SetAbsoluteUrl(string absoluteUrl)
        {
            EnsureUrlType<XpoUrlRequest>(request).AbsoluteUrl = absoluteUrl;

            return this;
        }

        public IFluentXpoUrlGenerator SetWatermarkImage(string watermarkImageName)
        {
            EnsureUrlType<XpoImageUrlRequest>(request).WatermarkImage = watermarkImageName;

            return this;
        }

        public IFluentXpoUrlGenerator AddCustom(string key, object value)
        {
            request.CustomParameters.Add(key, value);

            return this;
        }

        public IFluentXpoUrlGenerator SetFrame(int frame)
        {
            request.Frame = frame;

            return this;
        }
        
        public string GetUrl()
        {
            return generator.GetUrl(request);
        }

        public XpoUrlParts GetUrlParts()
        {
            return generator.GetUrlParts(request);
        }
    }
}