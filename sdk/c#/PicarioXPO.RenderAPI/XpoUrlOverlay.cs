namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Represents an overlay to render on top of the output
    /// </summary>
    public sealed class XpoUrlOverlay
    {
        /// <summary>
        /// Gets or sets the index of this overlay
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// Gets or sets the filename for this overlay
        /// </summary>
        public string OverlayName { get; set; }

        /// <summary>
        /// Gets or sets the mode for this overlay
        /// </summary>
        public XpoUrlOverlayModes OverlayMode { get; set; }

        /// <summary>
        /// Gets or sets the time for this overlay
        /// </summary>
        public XpoUrlOverlayTimes OverlayTime { get; set; }

        /// <summary>
        /// Gets or sets the operation for this overlay
        /// </summary>
        public XpoUrlOverlayOperations OverlayOperation { get; set; }

        /// <summary>
        /// Gets or sets the location for this overlay
        /// </summary>
        public XpoUrlOverlayLocation OverlayLocation { get; set; }
    }
}