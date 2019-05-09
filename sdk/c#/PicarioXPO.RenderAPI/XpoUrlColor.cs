namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Represents a color from a Picario scene for the XPO URL generator
    /// </summary>
    public sealed class XpoUrlColor
    {
        /// <summary>
        /// Gets or sets the color for this object
        /// </summary>
        public string Color { get; set; }

        /// <summary>
        /// Gets or sets the gloss of this object
        /// </summary>
        public double Gloss { get; set; }
    }
}
