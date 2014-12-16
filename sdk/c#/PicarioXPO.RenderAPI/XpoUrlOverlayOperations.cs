namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Defines the different overlay operations
    /// </summary>
    public enum XpoUrlOverlayOperations
    {
        /// <summary>
        /// Default: Normal overlay operation is just simply drawing the overlays on top of the output image at the specified location
        /// </summary>
        Normal = 0,

        /// <summary>
        /// Currently unsupported
        /// </summary>
        ColoredMapping = 1
    }
}