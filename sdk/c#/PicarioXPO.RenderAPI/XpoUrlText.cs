using System.Collections.Generic;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Represents an text from a Picario scene for the PicarIS URL generator
    /// </summary>
    public sealed class XpoUrlText
    {
        /// <summary>
        /// The text that has to be rendered on the object.
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// The color of the text
        /// default: black
        /// </summary>
        public string Color { get; set; }

        /// <summary>
        /// The font name to use
        /// default: Arial
        /// </summary>
        public string FontName { get; set; }

        /// <summary>
        /// The font size in pixels
        /// default: 11
        /// </summary>
        public int FontSize { get; set; }

        /// <summary>
        /// The alignment of the text within the object
        /// default: Left
        /// </summary>
        public XpoUrlTextAlignment Alignment { get; set; }

        /// <summary>
        /// The decoration of the text.
        /// To use more than one decoration use a comma (,) to separate.
        /// <see cref="XpoUrlTextDecoration"/>
        /// </summary>
        public List<string> Decorations { get; set; }

        /// <summary>
        /// Gets or sets the drop x of this object
        /// </summary>
        public double DropX { get; set; }

        /// <summary>
        /// Gets or sets the drop y of this object
        /// </summary>
        public double DropY { get; set; }

        /// <summary>
        /// Gets or sets the placing point x of this object
        /// </summary>
        public double PlacingPointX { get; set; }

        /// <summary>
        /// Gets or sets the placing point y of this object
        /// </summary>
        public double PlacingPointY { get; set; }

        /// <summary>
        /// Gets or sets the transformation for this object
        /// </summary>
        public XpoUrlObjectTransformations Transformation { get; set; }

        /// <summary>
        /// Gets or sets the rotation for this object (only used in combination with transformation)
        /// </summary>
        public int Rotation { get; set; }

        public XpoUrlText()
        {
            Decorations = new List<string>();
        }
    }
}
