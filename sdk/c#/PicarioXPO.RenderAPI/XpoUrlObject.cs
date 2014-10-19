namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Represents an object from a Picario scene for the XPO URL generator
    /// </summary>
    public sealed class XpoUrlObject
    {
        /// <summary>
        /// Gets or sets the index of this overlay
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// Gets or sets the type for this object
        /// </summary>
        public XpoUrlObjectTypes ObjectType { get; set; }

        /// <summary>
        /// Gets or sets the text for this object
        /// </summary>
        public XpoUrlText Text { get; set; }

        /// <summary>
        /// Gets or sets the color for this object
        /// </summary>
        public XpoUrlColor Color { get; set; }

        /// <summary>
        /// Gets or sets the design for this object
        /// </summary>
        public XpoUrlDesign Design { get; set; }
    }
}