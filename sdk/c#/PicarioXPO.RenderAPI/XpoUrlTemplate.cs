namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Denines a PicarIS template
    /// </summary>
    public sealed class XpoUrlTemplate
    {
        /// <summary>
        /// Gets or sets the index of this template
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// The template parameter value
        /// </summary>
        public string Value { get; set; }
    }
}