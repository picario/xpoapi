using PicarioXPO.RenderAPI.FluentInterface;

namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Used by FluentXPOUrlGenerator for object configuration
    /// </summary>
    public sealed class FluentXpoUrlText : IFluentInterface
    {
         /// <summary>
        /// Returns the wrapped XpoUrlDesign
        /// </summary>
        public XpoUrlText XpoUrlText { get; private set; }

        /// <summary>
        /// Creates a new instance of the FluentXpoUrlDesign
        /// </summary>
        public FluentXpoUrlText(string text)
        {
            XpoUrlText = new XpoUrlText {Text = text};
        }

        /// <summary>
        /// Sets the font name of this object
        /// </summary>
        public FluentXpoUrlText SetFontName(string fontName)
        {
            XpoUrlText.FontName = fontName;

            return this;
        }

        /// <summary>
        /// Sets the font size of this object
        /// </summary>
        public FluentXpoUrlText SetFontSize(int fontSize)
        {
            XpoUrlText.FontSize = fontSize;

            return this;
        }

        /// <summary>
        /// Sets the color of this object
        /// </summary>
        public FluentXpoUrlText SetColor(string color)
        {
            XpoUrlText.Color = color;

            return this;
        }

        /// <summary>
        /// Sets the text alignment of this object
        /// </summary>
        public FluentXpoUrlText SetAlignment(XpoUrlTextAlignment alignment)
        {
            XpoUrlText.Alignment = alignment;

            return this;
        }

        /// <summary>
        /// Sets the text to be bold
        /// </summary>
        public FluentXpoUrlText Bold()
        {
            XpoUrlText.Decorations.Add(XpoUrlTextDecoration.Bold);

            return this;
        }

        /// <summary>
        /// Sets the text to be italic
        /// </summary>
        public FluentXpoUrlText Italic()
        {
            XpoUrlText.Decorations.Add(XpoUrlTextDecoration.Italic);

            return this;
        }

        /// <summary>
        /// Sets the text to be underline
        /// </summary>
        public FluentXpoUrlText Underline()
        {
            XpoUrlText.Decorations.Add(XpoUrlTextDecoration.Underline);

            return this;
        }

        /// <summary>
        /// Sets the drop x of this object
        /// </summary>
        public FluentXpoUrlText SetDropX(double dropX)
        {
            XpoUrlText.DropX = dropX;

            return this;
        }


        /// <summary>
        /// Sets the drop y of this object
        /// </summary>
        public FluentXpoUrlText SetDropY(double dropY)
        {
            XpoUrlText.DropY = dropY;

            return this;
        }

        /// <summary>
        /// Sets the placing point x of this object
        /// </summary>
        public FluentXpoUrlText SetPlacingPointX(double pointX)
        {
            XpoUrlText.PlacingPointX = pointX;

            return this;
        }

        /// <summary>
        /// Sets the placing point y of this object
        /// </summary>
        public FluentXpoUrlText SetPlacingPointY(double pointY)
        {
            XpoUrlText.PlacingPointY = pointY;

            return this;
        }

        /// <summary>
        /// Sets the transformation for this object
        /// </summary>
        public FluentXpoUrlText SetTransformation(XpoUrlObjectTransformations transformation)
        {
            XpoUrlText.Transformation = transformation;

            return this;
        }

        /// <summary>
        /// Sets the rotation for this object (only used in combination with transformation)
        /// </summary>
        public FluentXpoUrlText SetRotation(int rotation)
        {
            XpoUrlText.Rotation = rotation;

            return this;
        }
    }
}
