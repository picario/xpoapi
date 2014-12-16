namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Specifies the different resizing modes for applying overlays
    /// </summary>
    public enum XpoUrlOverlayModes
    {
        /// <summary>
        /// Default: Stretches the size of the overlay to the size of output bitmap
        /// </summary>
        MatchSizeOfOutput = 0,

        /// <summary>
        /// Keeps the original size of the overlay
        /// </summary>
        KeepOriginalSize = 1
    }
}