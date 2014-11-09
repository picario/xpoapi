namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Represents a XPO generator
    /// </summary>
    public interface IXpoUrlGenerator
    {
        /// <summary>
        /// Returns the URL generated using XPO parameters
        /// </summary>
        string GetUrl(XpoUrlRequest request);

        /// <summary>
        /// Returns the URL generated using XPO parameters
        /// </summary>
        string GetUrl(XpoImageUrlRequest request);

        /// <summary>
        /// Returns the URL generated using XPO parameters
        /// </summary>
        string GetUrl(XpoCoordinatesUrlRequest request);

        /// <summary>
        /// Returns the URL generated using these parameters into parts
        /// </summary>
        XpoUrlParts GetUrlParts(XpoUrlRequest request);

        /// <summary>
        /// Returns the URL generated using these parameters into parts
        /// </summary>
        XpoUrlParts GetUrlParts(XpoImageUrlRequest request);

        /// <summary>
        /// Returns the URL generated using these parameters into parts
        /// </summary>
        XpoUrlParts GetUrlParts(XpoCoordinatesUrlRequest request);
    }
}