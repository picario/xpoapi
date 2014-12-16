namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Specifies the different resizing times for applying overlays
    /// </summary>
    public enum XpoUrlOverlayTimes
    {
        /// <summary>
        /// Default: Applies the overlay before resizing the image
        /// </summary>
        BeforeResize = 0,

        /// <summary>
        /// Applies the overlay after resizing the image
        /// </summary>
        AfterResize = 1
    }
}